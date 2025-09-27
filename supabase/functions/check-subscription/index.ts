// functions/check-subscription/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

/**
 * Environment:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * - STRIPE_SECRET_KEY
 * - FRONTEND_ORIGIN (optional, defaults to "*")
 */

const FRONTEND_ORIGIN = Deno.env.get("FRONTEND_ORIGIN") ?? "*";
const corsHeadersBase = {
  "Access-Control-Allow-Origin": FRONTEND_ORIGIN,
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};
// include credentials only if a specific origin is set (not "*")
const corsHeaders =
  FRONTEND_ORIGIN !== "*"
    ? { ...corsHeadersBase, "Access-Control-Allow-Credentials": "true" }
    : corsHeadersBase;

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    // Preflight response must be 2xx and include CORS headers
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Create Supabase client with service role key (server-side only)
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  });

  try {
    logStep("Function started");

    const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logStep("Missing Authorization header");
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError) {
      logStep("supabase auth.getUser error", { message: userError.message });
      return new Response(JSON.stringify({ error: "Authentication error" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user = userData.user;
    if (!user?.email) {
      logStep("User or email missing", { user });
      return new Response(JSON.stringify({ error: "User not authenticated or email not available" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    logStep("User authenticated", { userId: user.id, email: user.email });

    // Stripe client
    const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
    if (!stripeSecret) {
      logStep("Missing STRIPE_SECRET_KEY");
      return new Response(JSON.stringify({ error: "Server misconfiguration: missing Stripe key" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const stripe = new Stripe(stripeSecret, { apiVersion: "2023-10-16" });

    // Try to find Stripe customer by email
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (!customers || customers.data.length === 0) {
      logStep("No Stripe customer found — marking unsubscribed", { email: user.email });

      // Upsert subscribers record (no stripe customer)
      const { error: upsertErr } = await supabaseClient
        .from("subscribers")
        .upsert(
          {
            email: user.email,
            user_id: user.id,
            stripe_customer_id: null,
            subscribed: false,
            subscription_tier: null,
            subscription_end: null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "email" }
        );

      if (upsertErr) {
        logStep("DB upsert error", { message: upsertErr.message });
      }

      return new Response(JSON.stringify({ subscribed: false }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // List active subscriptions for customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });

    const hasActiveSub = subscriptions.data.length > 0;
    let subscriptionTier: string | null = null;
    let subscriptionEnd: string | null = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date((subscription.current_period_end ?? 0) * 1000).toISOString();

      // Determine tier by price amount (fallback logic; adapt to your pricing)
      const priceId = subscription.items.data[0]?.price?.id;
      let amount = 0;
      if (priceId) {
        try {
          const price = await stripe.prices.retrieve(priceId);
          amount = price.unit_amount ?? 0;
        } catch (err) {
          logStep("Failed to retrieve price", { priceId, err: String(err) });
        }
      }

      if (amount <= 999) subscriptionTier = "Basic";
      else if (amount <= 1999) subscriptionTier = "Premium";
      else subscriptionTier = "Professional";

      logStep("Active subscription found", { subscriptionId: subscription.id, subscriptionTier, subscriptionEnd });
    } else {
      logStep("No active subscription found for customer", { customerId });
    }

    // Upsert subscriber row with final info
    const { error: upsertError } = await supabaseClient.from("subscribers").upsert(
      {
        email: user.email,
        user_id: user.id,
        stripe_customer_id: customerId,
        subscribed: hasActiveSub,
        subscription_tier: subscriptionTier,
        subscription_end: subscriptionEnd,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    if (upsertError) {
      logStep("Failed to upsert subscriber", { message: upsertError.message });
      // continue to return subscription status even if DB write failed
    } else {
      logStep("Updated database with subscription info", { subscribed: hasActiveSub, subscriptionTier });
    }

    return new Response(
      JSON.stringify({
        subscribed: hasActiveSub,
        subscription_tier: subscriptionTier,
        subscription_end: subscriptionEnd,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logStep("ERROR", { message: msg });
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});




// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
// import Stripe from "https://esm.sh/stripe@14.21.0";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const logStep = (step: string, details?: any) => {
//   const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
//   console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
// };

// serve(async (req) => {
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   const supabaseClient = createClient(
//     Deno.env.get("SUPABASE_URL") ?? "",
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
//     { auth: { persistSession: false } }
//   );

//   try {
//     logStep("Function started");

//     const authHeader = req.headers.get("Authorization");
//     if (!authHeader) throw new Error("No authorization header provided");

//     const token = authHeader.replace("Bearer ", "");
//     const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
//     if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
//     const user = userData.user;
//     if (!user?.email) throw new Error("User not authenticated or email not available");
    
//     logStep("User authenticated", { userId: user.id, email: user.email });

//     const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
//       apiVersion: "2023-10-16" 
//     });

//     const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
//     if (customers.data.length === 0) {
//       logStep("No customer found, updating unsubscribed state");
//       await supabaseClient.from("subscribers").upsert({
//         email: user.email,
//         user_id: user.id,
//         stripe_customer_id: null,
//         subscribed: false,
//         subscription_tier: null,
//         subscription_end: null,
//         updated_at: new Date().toISOString(),
//       }, { onConflict: 'email' });
      
//       return new Response(JSON.stringify({ subscribed: false }), {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//         status: 200,
//       });
//     }

//     const customerId = customers.data[0].id;
//     logStep("Found Stripe customer", { customerId });

//     const subscriptions = await stripe.subscriptions.list({
//       customer: customerId,
//       status: "active",
//       limit: 1,
//     });

//     const hasActiveSub = subscriptions.data.length > 0;
//     let subscriptionTier = null;
//     let subscriptionEnd = null;

//     if (hasActiveSub) {
//       const subscription = subscriptions.data[0];
//       subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
//       logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });
      
//       // Determine subscription tier from price
//       const priceId = subscription.items.data[0].price.id;
//       const price = await stripe.prices.retrieve(priceId);
//       const amount = price.unit_amount || 0;
      
//       if (amount <= 999) {
//         subscriptionTier = "Basic";
//       } else if (amount <= 1999) {
//         subscriptionTier = "Premium";
//       } else {
//         subscriptionTier = "Professional";
//       }
//       logStep("Determined subscription tier", { priceId, amount, subscriptionTier });
//     } else {
//       logStep("No active subscription found");
//     }

//     // Update subscriber record
//     await supabaseClient.from("subscribers").upsert({
//       email: user.email,
//       user_id: user.id,
//       stripe_customer_id: customerId,
//       subscribed: hasActiveSub,
//       subscription_tier: subscriptionTier,
//       subscription_end: subscriptionEnd,
//       updated_at: new Date().toISOString(),
//     }, { onConflict: 'email' });

//     logStep("Updated database with subscription info", { subscribed: hasActiveSub, subscriptionTier });

//     return new Response(JSON.stringify({
//       subscribed: hasActiveSub,
//       subscription_tier: subscriptionTier,
//       subscription_end: subscriptionEnd
//     }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : String(error);
//     logStep("ERROR", { message: errorMessage });
//     return new Response(JSON.stringify({ error: errorMessage }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//       status: 500,
//     });
//   }
// });