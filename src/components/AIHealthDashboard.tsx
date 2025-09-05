import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Activity, Target, TrendingUp, Heart, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface AIRecommendations {
  bmi: number;
  category: string;
  calorieTarget: number;
  workoutPlan: {
    focus: string;
    weekly: string;
    exercises: string[];
  };
  recipes: Array<{
    name: string;
    calories: number;
    protein: number;
    fiber: number;
  }>;
  healthTips: string[];
  riskFactors: string[];
  progressGoals: {
    weightTarget: string;
    bmiTarget: number;
    timeframe: string;
    milestones: string[];
  };
}

const AIHealthDashboard = () => {
  const { user } = useAuth();
  const { userProfile } = useUser();
  const [recommendations, setRecommendations] = useState<AIRecommendations | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAIRecommendations = async () => {
    if (!user || !userProfile) return;

    setLoading(true);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('ai-health-recommendations', {
        body: {
          height: userProfile.height,
          weight: userProfile.weight,
          age: userProfile.age,
          goal: userProfile.goal,
          gender: userProfile.gender
        },
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`
        }
      });

      if (error) throw error;
      setRecommendations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get AI recommendations');
      console.error('Error getting AI recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userProfile && user) {
      getAIRecommendations();
    }
  }, [userProfile, user]);

  if (!user) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">AI Health Analysis</h3>
          <p className="text-muted-foreground mb-4">
            Sign in to get personalized AI-powered health recommendations
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!userProfile) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
          <p className="text-muted-foreground mb-4">
            Add your health information to get AI-powered recommendations
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <Brain className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold mb-2">AI Analyzing Your Health Data</h3>
          <p className="text-muted-foreground">
            Generating personalized recommendations...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="glass-card border-destructive/50">
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
          <h3 className="text-lg font-semibold mb-2">Analysis Error</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={getAIRecommendations} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <Button onClick={getAIRecommendations} className="gap-2">
            <Brain className="w-4 h-4" />
            Get AI Health Analysis
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-500';
      case 'Normal weight': return 'bg-green-500';
      case 'Overweight': return 'bg-yellow-500';
      case 'Obese': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* BMI Analysis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            AI Health Analysis
          </CardTitle>
          <CardDescription>
            Personalized insights based on your health data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{recommendations.bmi}</p>
              <p className="text-muted-foreground">BMI Score</p>
            </div>
            <Badge className={getBMIColor(recommendations.category)}>
              {recommendations.category}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Daily Calorie Target</p>
              <p className="text-lg font-semibold text-primary">
                {recommendations.calorieTarget} kcal
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Goal Timeframe</p>
              <p className="text-lg font-semibold text-primary">
                {recommendations.progressGoals.timeframe}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Workout Plan */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            AI Workout Plan
          </CardTitle>
          <CardDescription>
            {recommendations.workoutPlan.focus}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="font-medium">{recommendations.workoutPlan.weekly}</p>
            <div className="grid grid-cols-2 gap-2">
              {recommendations.workoutPlan.exercises.map((exercise, index) => (
                <Badge key={index} variant="secondary" className="justify-center">
                  {exercise}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recipe Recommendations */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            AI Recipe Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {recommendations.recipes.map((recipe, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-secondary/20">
                <div>
                  <p className="font-medium">{recipe.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Protein: {recipe.protein}g | Fiber: {recipe.fiber}g
                  </p>
                </div>
                <Badge variant="outline">{recipe.calories} cal</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Tips */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            AI Health Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.healthTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm">{tip}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      {recommendations.riskFactors.length > 0 && 
       !recommendations.riskFactors.includes("No significant risk factors identified") && (
        <Card className="glass-card border-yellow-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="w-5 h-5" />
              Health Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                  <p className="text-sm">{risk}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button onClick={getAIRecommendations} variant="outline" className="gap-2">
          <Brain className="w-4 h-4" />
          Refresh AI Analysis
        </Button>
      </div>
    </div>
  );
};

export default AIHealthDashboard;