import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Clock, Target, Play, CheckCircle } from 'lucide-react';

interface Exercise {
  name: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  calories: number;
  description: string;
  image: string;
}

interface Workout {
  title: string;
  description: string;
  exercises: Exercise[];
  totalTime: string;
  image: string;
}

const WorkoutSection = () => {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const workouts: Record<string, Workout> = {
    cardio: {
      title: 'Cardio Blast',
      description: 'High-intensity cardio workout to burn calories and improve cardiovascular health',
      totalTime: '30 mins',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=60',
      exercises: [
        {
          name: 'Jumping Jacks',
          duration: '3 minutes',
          difficulty: 'beginner',
          calories: 50,
          description: 'Full-body cardio exercise that increases heart rate',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=60'
        },
        {
          name: 'High Knees',
          duration: '2 minutes',
          difficulty: 'beginner',
          calories: 40,
          description: 'Running in place with knees lifted high',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=60'
        },
        {
          name: 'Burpees',
          duration: '5 minutes',
          difficulty: 'advanced',
          calories: 80,
          description: 'Full-body explosive movement combining squat, push-up, and jump',
          image: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&auto=format&fit=crop&q=60'
        }
      ]
    },
    strength: {
      title: 'Strength Training',
      description: 'Build muscle and increase strength with resistance exercises',
      totalTime: '45 mins',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=60',
      exercises: [
        {
          name: 'Push-ups',
          duration: '3 sets of 10-15',
          difficulty: 'intermediate',
          calories: 30,
          description: 'Upper body strength exercise targeting chest, shoulders, and triceps',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=60'
        },
        {
          name: 'Squats',
          duration: '3 sets of 15-20',
          difficulty: 'beginner',
          calories: 40,
          description: 'Lower body exercise targeting quads, glutes, and core',
          image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=400&auto=format&fit=crop&q=60'
        },
        {
          name: 'Plank',
          duration: '3 sets of 30-60s',
          difficulty: 'intermediate',
          calories: 20,
          description: 'Core strengthening isometric exercise',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=60'
        }
      ]
    },
    yoga: {
      title: 'Yoga & Flexibility',
      description: 'Improve flexibility, balance, and mental well-being',
      totalTime: '40 mins',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=60',
      exercises: [
        {
          name: 'Sun Salutation',
          duration: '10 minutes',
          difficulty: 'beginner',
          calories: 30,
          description: 'A sequence of yoga poses to warm up the body',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=60'
        },
        {
          name: 'Warrior Poses',
          duration: '15 minutes',
          difficulty: 'intermediate',
          calories: 40,
          description: 'Standing poses that build strength and stability',
          image: 'https://images.unsplash.com/photo-1506629905607-bb5ab8b56d0c?w=400&auto=format&fit=crop&q=60'
        },
        {
          name: 'Relaxation Poses',
          duration: '15 minutes',
          difficulty: 'beginner',
          calories: 20,
          description: 'Gentle stretches and meditation poses',
          image: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=400&auto=format&fit=crop&q=60'
        }
      ]
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

  const toggleExerciseComplete = (exerciseName: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseName)) {
      newCompleted.delete(exerciseName);
    } else {
      newCompleted.add(exerciseName);
    }
    setCompletedExercises(newCompleted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Workout <span className="text-gradient">Training Hub</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Personalized workout plans designed to help you achieve your fitness goals
        </p>
      </div>

      <Tabs defaultValue="cardio" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cardio" className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            Cardio
          </TabsTrigger>
          <TabsTrigger value="strength" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Strength
          </TabsTrigger>
          <TabsTrigger value="yoga" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Yoga
          </TabsTrigger>
        </TabsList>

        {Object.entries(workouts).map(([key, workout]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* Workout Header */}
            <Card className="glass-card overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={workout.image} 
                  alt={workout.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">{workout.title}</h3>
                    <p className="mb-4">{workout.description}</p>
                    <Badge variant="secondary">{workout.totalTime}</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Exercises */}
            <div className="grid gap-4">
              {workout.exercises.map((exercise, index) => (
                <Card key={exercise.name} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={exercise.image} 
                        alt={exercise.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg">{exercise.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExerciseComplete(exercise.name)}
                            className={completedExercises.has(exercise.name) ? 'text-green-500' : ''}
                          >
                            <CheckCircle className="w-5 h-5" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exercise.duration}
                          </div>
                          
                          <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>
                            {exercise.difficulty}
                          </Badge>
                          
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {exercise.calories} cal
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-shrink-0"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WorkoutSection;