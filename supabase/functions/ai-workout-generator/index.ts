// functions/ai-workout-generator/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

/**
 * Environment:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * - FRONTEND_ORIGIN (optional)
 */

const FRONTEND_ORIGIN = Deno.env.get("FRONTEND_ORIGIN") ?? "*";
const corsHeadersBase = {
  "Access-Control-Allow-Origin": FRONTEND_ORIGIN,
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};
const corsHeaders =
  FRONTEND_ORIGIN !== "*" ? { ...corsHeadersBase, "Access-Control-Allow-Credentials": "true" } : corsHeadersBase;

const log = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[AI-WORKOUT] ${step}${detailsStr}`);
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Create Supabase client using service role to allow auth.getUser
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } });

  try {
    const authHeader = req.headers.get("authorization") ?? req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !userData?.user) {
      log("auth.getUser failed", { error: userError?.message });
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { goal = "maintain", fitnessLevel = "intermediate", duration = 30, equipment = [], focus = "mixed" } = body;

    log("Generating workout plan", { userId: userData.user.id, goal, fitnessLevel, duration, focus });

    const workoutPlan = generateWorkoutPlan(goal, fitnessLevel, Number(duration), equipment, focus);

    return new Response(JSON.stringify(workoutPlan), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    log("ERROR", { message: msg });
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

/* ---------- helper functions (same logic as your original) ---------- */

function generateWorkoutPlan(goal: string, fitnessLevel: string, duration: number, equipment: string[], focus: string) {
  const exercises = {
    cardio: [
      { name: "High Knees", duration: "30s", rest: "15s", difficulty: "beginner" },
      { name: "Jumping Jacks", duration: "45s", rest: "15s", difficulty: "beginner" },
      { name: "Burpees", duration: "20s", rest: "40s", difficulty: "advanced" },
      { name: "Mountain Climbers", duration: "30s", rest: "30s", difficulty: "intermediate" },
    ],
    strength: [
      { name: "Push-ups", reps: "8-12", sets: 3, difficulty: "beginner" },
      { name: "Squats", reps: "12-15", sets: 3, difficulty: "beginner" },
      { name: "Planks", duration: "30-60s", sets: 3, difficulty: "beginner" },
      { name: "Lunges", reps: "10 each leg", sets: 3, difficulty: "intermediate" },
    ],
    flexibility: [
      { name: "Child's Pose", duration: "30s", difficulty: "beginner" },
      { name: "Downward Dog", duration: "30s", difficulty: "beginner" },
      { name: "Warrior II", duration: "30s each side", difficulty: "intermediate" },
      { name: "Pigeon Pose", duration: "45s each side", difficulty: "intermediate" },
    ],
  };

  const filteredExercises = filterExercisesByLevel(exercises, fitnessLevel);
  const selectedExercises = selectExercisesForWorkout(filteredExercises, focus, duration);

  return {
    title: `AI-Generated ${focus} Workout`,
    duration: `${duration} minutes`,
    difficulty: fitnessLevel,
    goal: goal,
    exercises: selectedExercises,
    tips: generateWorkoutTips(goal, fitnessLevel),
    progression: generateProgressionPlan(fitnessLevel, goal),
  };
}

function filterExercisesByLevel(exercises: any, level: string) {
  const filtered: any = {};

  Object.keys(exercises).forEach((category) => {
    filtered[category] = exercises[category].filter((exercise: any) => {
      if (level === "beginner") return exercise.difficulty === "beginner";
      if (level === "intermediate") return ["beginner", "intermediate"].includes(exercise.difficulty);
      return true; // advanced includes all
    });
  });

  return filtered;
}

function selectExercisesForWorkout(exercises: any, focus: string, duration: number) {
  let selectedExercises: any[] = [];

  if (focus === "cardio") {
    selectedExercises = exercises.cardio.slice(0, Math.max(1, Math.floor(duration / 5)));
  } else if (focus === "strength") {
    selectedExercises = exercises.strength.slice(0, Math.max(1, Math.floor(duration / 8)));
  } else if (focus === "flexibility") {
    selectedExercises = exercises.flexibility.slice(0, Math.max(1, Math.floor(duration / 3)));
  } else {
    // mixed workout
    selectedExercises = [
      ...exercises.cardio.slice(0, 2),
      ...exercises.strength.slice(0, 3),
      ...exercises.flexibility.slice(0, 2),
    ];
  }

  return selectedExercises;
}

function generateWorkoutTips(goal: string, level: string): string[] {
  const baseTips = ["Warm up for 5 minutes before starting", "Stay hydrated throughout the workout", "Listen to your body and rest when needed"];

  const goalTips: Record<string, string[]> = {
    lose: ["Focus on maintaining heart rate in fat-burning zone", "Combine cardio with strength training"],
    gain: ["Progressive overload is key", "Focus on compound movements", "Ensure adequate rest between sets"],
    maintain: ["Consistency is more important than intensity", "Mix different types of exercises"],
  };

  const levelTips: Record<string, string[]> = {
    beginner: ["Start slowly and focus on form", "Don't skip rest days"],
    intermediate: ["Challenge yourself with variations", "Track your progress"],
    advanced: ["Push your limits safely", "Focus on advanced techniques"],
  };

  return [...baseTips, ...(goalTips[goal] || []), ...(levelTips[level] || [])];
}

function generateProgressionPlan(level: string, goal: string) {
  const progressions: Record<string, Record<string, string>> = {
    beginner: {
      week1: "Focus on learning proper form",
      week2: "Increase duration by 5 minutes",
      week3: "Add one more set to each exercise",
      week4: "Increase intensity slightly",
    },
    intermediate: {
      week1: "Increase weight or resistance",
      week2: "Add complex movements",
      week3: "Decrease rest time between sets",
      week4: "Try advanced variations",
    },
    advanced: {
      week1: "Increase training frequency",
      week2: "Add explosive movements",
      week3: "Incorporate supersets",
      week4: "Focus on weak points",
    },
  };

  return progressions[level] ?? progressions["beginner"];
}



// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
// };

// serve(async (req: Request) => {
//   if (req.method === "OPTIONS") {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const supabaseClient = createClient(
//       Deno.env.get("SUPABASE_URL") ?? "https://wkjvsqozzbbucpzbcvqy.supabase.co",
//       Deno.env.get("SUPABASE_ANON_KEY") ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndranZzcW96emJidWNwemJjdnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NTI2MzEsImV4cCI6MjA3NDIyODYzMX0.7w_Yq3LlfqjFUGVyTVw4muNHCXeIVg78NgxOqARNvUA"
//     );

//     const authHeader = req.headers.get("authorization")!;
//     const { data } = await supabaseClient.auth.getUser(authHeader.replace("Bearer ", ""));
    
//     if (!data.user) {
//       throw new Error("User not authenticated");
//     }

//     const { goal, fitnessLevel, duration, equipment, focus } = await req.json();

//     const workoutPlan = generateWorkoutPlan(goal, fitnessLevel, duration, equipment, focus);

//     return new Response(JSON.stringify(workoutPlan), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred" }), {
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//       status: 500,
//     });
//   }
// });

// function generateWorkoutPlan(goal: string, fitnessLevel: string, duration: number, equipment: string[], focus: string) {
//   const exercises = {
//     cardio: [
//       { name: "High Knees", duration: "30s", rest: "15s", difficulty: "beginner" },
//       { name: "Jumping Jacks", duration: "45s", rest: "15s", difficulty: "beginner" },
//       { name: "Burpees", duration: "20s", rest: "40s", difficulty: "advanced" },
//       { name: "Mountain Climbers", duration: "30s", rest: "30s", difficulty: "intermediate" }
//     ],
//     strength: [
//       { name: "Push-ups", reps: "8-12", sets: 3, difficulty: "beginner" },
//       { name: "Squats", reps: "12-15", sets: 3, difficulty: "beginner" },
//       { name: "Planks", duration: "30-60s", sets: 3, difficulty: "beginner" },
//       { name: "Lunges", reps: "10 each leg", sets: 3, difficulty: "intermediate" }
//     ],
//     flexibility: [
//       { name: "Child's Pose", duration: "30s", difficulty: "beginner" },
//       { name: "Downward Dog", duration: "30s", difficulty: "beginner" },
//       { name: "Warrior II", duration: "30s each side", difficulty: "intermediate" },
//       { name: "Pigeon Pose", duration: "45s each side", difficulty: "intermediate" }
//     ]
//   };

//   const filteredExercises = filterExercisesByLevel(exercises, fitnessLevel);
//   const selectedExercises = selectExercisesForWorkout(filteredExercises, focus, duration);

//   return {
//     title: `AI-Generated ${focus} Workout`,
//     duration: `${duration} minutes`,
//     difficulty: fitnessLevel,
//     goal: goal,
//     exercises: selectedExercises,
//     tips: generateWorkoutTips(goal, fitnessLevel),
//     progression: generateProgressionPlan(fitnessLevel, goal)
//   };
// }

// function filterExercisesByLevel(exercises: any, level: string) {
//   const filtered: any = {};
  
//   Object.keys(exercises).forEach(category => {
//     filtered[category] = exercises[category].filter((exercise: any) => {
//       if (level === 'beginner') return exercise.difficulty === 'beginner';
//       if (level === 'intermediate') return ['beginner', 'intermediate'].includes(exercise.difficulty);
//       return true; // advanced includes all
//     });
//   });
  
//   return filtered;
// }

// function selectExercisesForWorkout(exercises: any, focus: string, duration: number) {
//   let selectedExercises: any[] = [];
  
//   if (focus === 'cardio') {
//     selectedExercises = exercises.cardio.slice(0, Math.floor(duration / 5));
//   } else if (focus === 'strength') {
//     selectedExercises = exercises.strength.slice(0, Math.floor(duration / 8));
//   } else if (focus === 'flexibility') {
//     selectedExercises = exercises.flexibility.slice(0, Math.floor(duration / 3));
//   } else {
//     // mixed workout
//     selectedExercises = [
//       ...exercises.cardio.slice(0, 2),
//       ...exercises.strength.slice(0, 3),
//       ...exercises.flexibility.slice(0, 2)
//     ];
//   }
  
//   return selectedExercises;
// }

// function generateWorkoutTips(goal: string, level: string): string[] {
//   const baseTips = [
//     "Warm up for 5 minutes before starting",
//     "Stay hydrated throughout the workout",
//     "Listen to your body and rest when needed"
//   ];

//   const goalTips = {
//     lose: ["Focus on maintaining heart rate in fat-burning zone", "Combine cardio with strength training"],
//     gain: ["Progressive overload is key", "Focus on compound movements", "Ensure adequate rest between sets"],
//     maintain: ["Consistency is more important than intensity", "Mix different types of exercises"]
//   };

//   const levelTips = {
//     beginner: ["Start slowly and focus on form", "Don't skip rest days"],
//     intermediate: ["Challenge yourself with variations", "Track your progress"],
//     advanced: ["Push your limits safely", "Focus on advanced techniques"]
//   };

//   return [
//     ...baseTips,
//     ...(goalTips[goal as keyof typeof goalTips] || []),
//     ...(levelTips[level as keyof typeof levelTips] || [])
//   ];
// }

// function generateProgressionPlan(level: string, goal: string) {
//   const progressions = {
//     beginner: {
//       week1: "Focus on learning proper form",
//       week2: "Increase duration by 5 minutes",
//       week3: "Add one more set to each exercise",
//       week4: "Increase intensity slightly"
//     },
//     intermediate: {
//       week1: "Increase weight or resistance",
//       week2: "Add complex movements",
//       week3: "Decrease rest time between sets",
//       week4: "Try advanced variations"
//     },
//     advanced: {
//       week1: "Increase training frequency",
//       week2: "Add explosive movements",
//       week3: "Incorporate supersets",
//       week4: "Focus on weak points"
//     }
//   };

//   return progressions[level as keyof typeof progressions] || progressions.beginner;
// }