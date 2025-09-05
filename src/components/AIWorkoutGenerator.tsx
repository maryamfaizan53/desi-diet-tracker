import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Zap, Target, Clock, Trophy, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface WorkoutPlan {
  title: string;
  duration: string;
  difficulty: string;
  goal: string;
  exercises: Array<{
    name: string;
    duration?: string;
    reps?: string;
    sets?: number;
    rest?: string;
    difficulty: string;
  }>;
  tips: string[];
  progression: {
    week1: string;
    week2: string;
    week3: string;
    week4: string;
  };
}

const AIWorkoutGenerator = () => {
  const { user } = useAuth();
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [goal, setGoal] = useState('lose');
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [duration, setDuration] = useState(30);
  const [focus, setFocus] = useState('mixed');

  const generateWorkout = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('ai-workout-generator', {
        body: {
          goal,
          fitnessLevel,
          duration,
          equipment: ['bodyweight'], // For now, focusing on bodyweight exercises
          focus
        },
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`
        }
      });

      if (error) throw error;
      setWorkoutPlan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate workout');
      console.error('Error generating workout:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!user) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 text-center">
          <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">AI Workout Generator</h3>
          <p className="text-muted-foreground">
            Sign in to generate personalized AI workout plans
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Workout Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            AI Workout Generator
          </CardTitle>
          <CardDescription>
            Generate personalized workout plans powered by AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Goal</label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Weight Loss</SelectItem>
                  <SelectItem value="gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintain">Maintain Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fitness Level</label>
              <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration (minutes)</label>
              <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Focus</label>
              <Select value={focus} onValueChange={setFocus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="mixed">Mixed Training</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateWorkout} 
            disabled={loading}
            className="w-full gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {loading ? 'Generating...' : 'Generate AI Workout'}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="glass-card border-destructive/50">
          <CardContent className="p-4 text-center text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      {/* Generated Workout Plan */}
      {workoutPlan && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{workoutPlan.title}</span>
                <Badge className={getDifficultyColor(workoutPlan.difficulty)}>
                  {workoutPlan.difficulty}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {workoutPlan.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {workoutPlan.goal}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold">Exercises</h4>
                <div className="grid gap-3">
                  {workoutPlan.exercises.map((exercise, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-secondary/20">
                      <div>
                        <p className="font-medium">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {exercise.duration && `Duration: ${exercise.duration}`}
                          {exercise.reps && `Reps: ${exercise.reps}`}
                          {exercise.sets && ` | Sets: ${exercise.sets}`}
                          {exercise.rest && ` | Rest: ${exercise.rest}`}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(exercise.difficulty)}
                      >
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workout Tips */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                AI Training Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {workoutPlan.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm">{tip}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Progression Plan */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>4-Week Progression Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(workoutPlan.progression).map(([week, plan]) => (
                  <div key={week} className="p-3 rounded-lg bg-secondary/20">
                    <p className="font-medium capitalize">{week.replace('week', 'Week ')}</p>
                    <p className="text-sm text-muted-foreground">{plan}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIWorkoutGenerator;