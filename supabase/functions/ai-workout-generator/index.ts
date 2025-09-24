import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
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

    const { goal, fitnessLevel, duration, equipment, focus } = await req.json();

    const workoutPlan = generateWorkoutPlan(goal, fitnessLevel, duration, equipment, focus);

    return new Response(JSON.stringify(workoutPlan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "An unknown error occurred" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function generateWorkoutPlan(goal: string, fitnessLevel: string, duration: number, equipment: string[], focus: string) {
  const exercises = {
    cardio: [
      { name: "High Knees", duration: "30s", rest: "15s", difficulty: "beginner" },
      { name: "Jumping Jacks", duration: "45s", rest: "15s", difficulty: "beginner" },
      { name: "Burpees", duration: "20s", rest: "40s", difficulty: "advanced" },
      { name: "Mountain Climbers", duration: "30s", rest: "30s", difficulty: "intermediate" }
    ],
    strength: [
      { name: "Push-ups", reps: "8-12", sets: 3, difficulty: "beginner" },
      { name: "Squats", reps: "12-15", sets: 3, difficulty: "beginner" },
      { name: "Planks", duration: "30-60s", sets: 3, difficulty: "beginner" },
      { name: "Lunges", reps: "10 each leg", sets: 3, difficulty: "intermediate" }
    ],
    flexibility: [
      { name: "Child's Pose", duration: "30s", difficulty: "beginner" },
      { name: "Downward Dog", duration: "30s", difficulty: "beginner" },
      { name: "Warrior II", duration: "30s each side", difficulty: "intermediate" },
      { name: "Pigeon Pose", duration: "45s each side", difficulty: "intermediate" }
    ]
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
    progression: generateProgressionPlan(fitnessLevel, goal)
  };
}

function filterExercisesByLevel(exercises: any, level: string) {
  const filtered: any = {};
  
  Object.keys(exercises).forEach(category => {
    filtered[category] = exercises[category].filter((exercise: any) => {
      if (level === 'beginner') return exercise.difficulty === 'beginner';
      if (level === 'intermediate') return ['beginner', 'intermediate'].includes(exercise.difficulty);
      return true; // advanced includes all
    });
  });
  
  return filtered;
}

function selectExercisesForWorkout(exercises: any, focus: string, duration: number) {
  let selectedExercises: any[] = [];
  
  if (focus === 'cardio') {
    selectedExercises = exercises.cardio.slice(0, Math.floor(duration / 5));
  } else if (focus === 'strength') {
    selectedExercises = exercises.strength.slice(0, Math.floor(duration / 8));
  } else if (focus === 'flexibility') {
    selectedExercises = exercises.flexibility.slice(0, Math.floor(duration / 3));
  } else {
    // mixed workout
    selectedExercises = [
      ...exercises.cardio.slice(0, 2),
      ...exercises.strength.slice(0, 3),
      ...exercises.flexibility.slice(0, 2)
    ];
  }
  
  return selectedExercises;
}

function generateWorkoutTips(goal: string, level: string): string[] {
  const baseTips = [
    "Warm up for 5 minutes before starting",
    "Stay hydrated throughout the workout",
    "Listen to your body and rest when needed"
  ];

  const goalTips = {
    lose: ["Focus on maintaining heart rate in fat-burning zone", "Combine cardio with strength training"],
    gain: ["Progressive overload is key", "Focus on compound movements", "Ensure adequate rest between sets"],
    maintain: ["Consistency is more important than intensity", "Mix different types of exercises"]
  };

  const levelTips = {
    beginner: ["Start slowly and focus on form", "Don't skip rest days"],
    intermediate: ["Challenge yourself with variations", "Track your progress"],
    advanced: ["Push your limits safely", "Focus on advanced techniques"]
  };

  return [
    ...baseTips,
    ...(goalTips[goal as keyof typeof goalTips] || []),
    ...(levelTips[level as keyof typeof levelTips] || [])
  ];
}

function generateProgressionPlan(level: string, goal: string) {
  const progressions = {
    beginner: {
      week1: "Focus on learning proper form",
      week2: "Increase duration by 5 minutes",
      week3: "Add one more set to each exercise",
      week4: "Increase intensity slightly"
    },
    intermediate: {
      week1: "Increase weight or resistance",
      week2: "Add complex movements",
      week3: "Decrease rest time between sets",
      week4: "Try advanced variations"
    },
    advanced: {
      week1: "Increase training frequency",
      week2: "Add explosive movements",
      week3: "Incorporate supersets",
      week4: "Focus on weak points"
    }
  };

  return progressions[level as keyof typeof progressions] || progressions.beginner;
}