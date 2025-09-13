
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const AIHealthDashboard = React.lazy(() => import('@/components/AIHealthDashboard'));
const AIWorkoutGenerator = React.lazy(() => import('@/components/AIWorkoutGenerator'));
const BMICalculator = React.lazy(() => import('@/components/BMICalculator'));
const WorkoutSection = React.lazy(() => import('@/components/WorkoutSection'));
const FitnessTracker = React.lazy(() => import('@/components/FitnessTracker'));
const HealthyRecipes = React.lazy(() => import('@/components/HealthyRecipes'));
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Dumbbell, 
  Activity, 
  ChefHat
} from 'lucide-react';

/**
 * Fitness page component that displays AI-powered health dashboard, workout generator,
 * BMI calculator, workout section, fitness tracker, and healthy recipes.
 * This component does not accept any props.
 */

const Fitness = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              AI-Powered <span className="text-gradient">Fitness Intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of fitness with AI-driven health analysis, personalized workout generation, 
              and intelligent nutrition recommendations tailored specifically for you.
            </p>
          </div>
          
          <div className="grid gap-8">
            <React.Suspense fallback={<div className="skeleton h-32 bg-white/20 rounded">Loading AI Health Dashboard...</div>}>
              <AIHealthDashboard />
            </React.Suspense>
            <React.Suspense fallback={<div className="skeleton h-32 bg-white/20 rounded">Loading AI Workout Generator...</div>}>
              <AIWorkoutGenerator />
            </React.Suspense>
            <React.Suspense fallback={<div className="skeleton h-32 bg-white/20 rounded">Loading BMI Calculator...</div>}>
              <BMICalculator />
            </React.Suspense>
            <React.Suspense fallback={<div className="skeleton h-32 bg-white/20 rounded">Loading Workout Section...</div>}>
              <WorkoutSection />
            </React.Suspense>
            <React.Suspense fallback={<div className="skeleton h-32 bg-white/20 rounded">Loading Fitness Tracker...</div>}>
              <FitnessTracker />
            </React.Suspense>
            <React.Suspense fallback={<div className="skeleton h-32 bg-white/20 rounded">Loading Healthy Recipes...</div>}>
              <HealthyRecipes />
            </React.Suspense>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};





export default Fitness;


// Preserve existing UI: same Tailwind, layout (e.g., grid with cards, gradient bg)
// import { useState } from 'react';
// import { streamAgentResponse } from '../utils/streamAgent';
// import toast from 'react-hot-toast';

// export default function FitnessTracker() {
//   const [loading, setLoading] = useState(false);
//   const [plan, setPlan] = useState<any>(null);
//   const [stats, setStats] = useState({ activeMinutes: 180, caloriesBurned: 1250, workoutsCompleted: 4 });

//   const generatePlan = async () => {
//     setLoading(true);
//     try {
//       const result = await streamAgentResponse('analyze week', stats, { agents: ['workout_generator', 'nutrition_planner'] });
//       setPlan(result);
//       toast.success('Plan generated!');
//     } catch (e) {
//       toast.error('Error generating plan');
//     }
//     setLoading(false);
//   };

//   // Existing UI preserved
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-4"> {/* Unchanged */}
//       <h1 className="text-3xl font-bold text-white">Fitness Tracker</h1>
//       {loading && <div className="skeleton h-64 bg-white/20 rounded"> {/* New skeleton */}</div>}
//       {plan && (
//         <div className="bg-white p-4 rounded shadow">
//           <h2>{plan.title}</h2>
//           <ul>{plan.exercises?.map((ex: any) => <li key={ex.name}>{ex.name} - {ex.sets} sets</li>)}</ul>
//           <button onClick={() => {/* Save to Supabase */}} className="bg-blue-500 text-white px-4 py-2 rounded">Save Plan</button>
//           <button onClick={() => {/* Timer logic */}}>Start Timer</button>
//           <button onClick={() => {/* Calendar add */}}>Add to Calendar</button>
//           <button onClick={generatePlan}>Regenerate</button>
//         </div>
//       )}
//       {/* Existing log form, charts unchanged */}
//       <button onClick={generatePlan} disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
//         Generate AI Plan
//       </button>
//     </div>
//   );
// }