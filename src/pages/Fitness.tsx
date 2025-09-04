import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BMICalculator from '@/components/BMICalculator';
import WorkoutSection from '@/components/WorkoutSection';
import FitnessTracker from '@/components/FitnessTracker';
import HealthyRecipes from '@/components/HealthyRecipes';
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
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your AI <span className="text-gradient">Fitness Coach</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Personalized fitness guidance powered by AI. Get custom workout plans, 
              nutrition advice, and real-time health insights tailored to your goals.
            </p>
            
            {/* AI Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
              <div className="glass-card p-4 rounded-xl">
                <Brain className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Smart BMI assessment with personalized recommendations
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Custom Plans</h3>
                <p className="text-sm text-muted-foreground">
                  Workouts and recipes adapted to your fitness level
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-xl">
                <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time monitoring with achievement system
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-sm">
                <strong>🔥 AI Features Coming Soon:</strong> For full AI-powered recipe suggestions, 
                personalized meal planning, and advanced fitness analytics, connect your project to Supabase 
                to unlock our complete AI integration.
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                <Link to="/settings" className="flex items-center gap-2">
                  Enable AI Features
                </Link>
              </Button>
            </div>
          </div>

          {/* Main Fitness Tabs */}
          <Tabs defaultValue="bmi" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="bmi" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                BMI & Health
              </TabsTrigger>
              <TabsTrigger value="workouts" className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                Workouts
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="recipes" className="flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                Recipes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bmi" className="space-y-6">
              <BMICalculator />
            </TabsContent>

            <TabsContent value="workouts" className="space-y-6">
              <WorkoutSection />
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <FitnessTracker />
            </TabsContent>

            <TabsContent value="recipes" className="space-y-6">
              <HealthyRecipes />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fitness;