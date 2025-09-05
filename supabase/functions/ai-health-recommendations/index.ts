import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("authorization")!;
    const { data } = await supabaseClient.auth.getUser(authHeader.replace("Bearer ", ""));
    
    if (!data.user) {
      throw new Error("User not authenticated");
    }

    const { height, weight, age, goal, gender } = await req.json();

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Generate AI recommendations
    let recommendations = {
      bmi: Math.round(bmi * 10) / 10,
      category: getBMICategory(bmi),
      calorieTarget: calculateCalorieTarget(weight, height, age, gender, goal),
      workoutPlan: generateWorkoutPlan(bmi, goal),
      recipes: generateRecipeRecommendations(goal, bmi),
      healthTips: generateHealthTips(bmi, goal),
      riskFactors: analyzeRiskFactors(bmi, age),
      progressGoals: setProgressGoals(goal, bmi)
    };

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function calculateCalorieTarget(weight: number, height: number, age: number, gender: string, goal: string): number {
  // Harris-Benedict Equation
  let bmr = gender === 'male' 
    ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  
  // Activity factor (assuming moderate activity)
  let tdee = bmr * 1.55;
  
  // Adjust based on goal
  switch (goal) {
    case 'lose': return Math.round(tdee - 500);
    case 'gain': return Math.round(tdee + 500);
    default: return Math.round(tdee);
  }
}

function generateWorkoutPlan(bmi: number, goal: string) {
  const baseWorkouts = {
    cardio: ["Brisk Walking", "Cycling", "Swimming", "Dancing"],
    strength: ["Push-ups", "Squats", "Lunges", "Planks"],
    flexibility: ["Yoga", "Stretching", "Pilates"]
  };

  if (bmi > 30) {
    return {
      focus: "Low-impact cardio and strength building",
      weekly: "4-5 days cardio, 2-3 days strength",
      exercises: [...baseWorkouts.cardio.slice(0, 2), ...baseWorkouts.strength.slice(0, 2)]
    };
  } else if (bmi < 18.5) {
    return {
      focus: "Strength training and muscle building",
      weekly: "3-4 days strength, 2-3 days cardio",
      exercises: [...baseWorkouts.strength, ...baseWorkouts.cardio.slice(0, 1)]
    };
  } else {
    return {
      focus: "Balanced fitness routine",
      weekly: "3-4 days mixed training",
      exercises: [...baseWorkouts.cardio.slice(0, 2), ...baseWorkouts.strength.slice(0, 3)]
    };
  }
}

function generateRecipeRecommendations(goal: string, bmi: number) {
  const recipes = {
    lose: [
      { name: "Quinoa Biryani", calories: 320, protein: 12, fiber: 8 },
      { name: "Grilled Tandoori Chicken", calories: 280, protein: 35, fiber: 2 },
      { name: "Mixed Dal with Vegetables", calories: 240, protein: 15, fiber: 12 }
    ],
    gain: [
      { name: "Mutton Curry with Rice", calories: 580, protein: 28, fiber: 4 },
      { name: "Paneer Makhani", calories: 450, protein: 20, fiber: 3 },
      { name: "Aloo Paratha with Curd", calories: 420, protein: 12, fiber: 6 }
    ],
    maintain: [
      { name: "Vegetable Pulao", calories: 350, protein: 8, fiber: 6 },
      { name: "Fish Curry", calories: 320, protein: 25, fiber: 4 },
      { name: "Chana Masala", calories: 280, protein: 12, fiber: 10 }
    ]
  };
  
  return recipes[goal as keyof typeof recipes] || recipes.maintain;
}

function generateHealthTips(bmi: number, goal: string): string[] {
  const commonTips = [
    "Stay hydrated with 8-10 glasses of water daily",
    "Include probiotics like yogurt in your diet",
    "Practice portion control using smaller plates"
  ];

  if (bmi > 30) {
    return [
      ...commonTips,
      "Focus on gradual weight loss of 1-2 lbs per week",
      "Replace refined grains with whole grains",
      "Include more fiber-rich vegetables in meals"
    ];
  } else if (bmi < 18.5) {
    return [
      ...commonTips,
      "Eat frequent small meals throughout the day",
      "Include healthy fats like nuts and avocados",
      "Focus on protein-rich foods for muscle building"
    ];
  } else {
    return [
      ...commonTips,
      "Maintain your current eating pattern",
      "Include variety in your meals",
      "Continue regular physical activity"
    ];
  }
}

function analyzeRiskFactors(bmi: number, age: number): string[] {
  const risks = [];
  
  if (bmi > 30) {
    risks.push("Increased risk of diabetes", "Higher cardiovascular risk", "Joint stress concerns");
  }
  if (bmi < 18.5) {
    risks.push("Nutritional deficiency risk", "Weakened immune system", "Bone health concerns");
  }
  if (age > 40) {
    risks.push("Age-related metabolism changes", "Increased focus on bone health needed");
  }
  
  return risks.length > 0 ? risks : ["No significant risk factors identified"];
}

function setProgressGoals(goal: string, bmi: number) {
  const timeframe = "12 weeks";
  
  switch (goal) {
    case 'lose':
      return {
        weightTarget: bmi > 30 ? "8-12 lbs" : "6-8 lbs",
        bmiTarget: Math.max(bmi - 2, 22),
        timeframe,
        milestones: ["Week 2: 2-3 lbs", "Week 6: 4-6 lbs", "Week 12: 8-12 lbs"]
      };
    case 'gain':
      return {
        weightTarget: "8-12 lbs",
        bmiTarget: Math.min(bmi + 2, 24),
        timeframe,
        milestones: ["Week 2: 2-3 lbs", "Week 6: 4-6 lbs", "Week 12: 8-12 lbs"]
      };
    default:
      return {
        weightTarget: "Maintain current weight",
        bmiTarget: bmi,
        timeframe,
        milestones: ["Focus on fitness improvements", "Build healthy habits", "Maintain consistency"]
      };
  }
}