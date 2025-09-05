import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BMICalculator from '@/components/BMICalculator';
import WorkoutSection from '@/components/WorkoutSection';
import FitnessTracker from '@/components/FitnessTracker';
import HealthyRecipes from '@/components/HealthyRecipes';
import AIHealthDashboard from '@/components/AIHealthDashboard';
import AIWorkoutGenerator from '@/components/AIWorkoutGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Dumbbell, 
  Activity, 
  ChefHat,
  Sparkles,
  Brain
} from 'lucide-react';

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
            <AIHealthDashboard />
            <AIWorkoutGenerator />
            <BMICalculator />
            <WorkoutSection />
            <FitnessTracker />
            <HealthyRecipes />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fitness;