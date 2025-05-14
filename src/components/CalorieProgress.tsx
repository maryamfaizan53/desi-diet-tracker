
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useMeal } from '@/context/MealContext';
import { useUser } from '@/context/UserContext';

const CalorieProgress = () => {
  const { totalCalories } = useMeal();
  const { userProfile } = useUser();
  
  const target = userProfile?.calorieTarget || 2000;
  const percentage = Math.min(100, Math.round((totalCalories / target) * 100));
  
  // Determine status message and color
  let statusMessage = "You're on track!";
  let progressColorClass = "bg-blue-500";
  
  if (percentage < 70) {
    statusMessage = "You can eat more today";
    progressColorClass = "bg-blue-500";
  } else if (percentage >= 70 && percentage < 90) {
    statusMessage = "You're on track!";
    progressColorClass = "bg-green-500";
  } else if (percentage >= 90 && percentage < 100) {
    statusMessage = "Almost at your daily goal";
    progressColorClass = "bg-amber-500";
  } else if (percentage >= 100) {
    statusMessage = "You've reached your daily goal";
    progressColorClass = "bg-red-500";
  }
  
  return (
    <div className="w-full glass-card p-5 rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Daily Calorie Summary</h3>
        <p className="text-sm text-muted-foreground">{statusMessage}</p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>{totalCalories} cal</span>
          <span>{target} cal</span>
        </div>
        <Progress 
          value={percentage} 
          className="h-2" 
          indicatorClassName={progressColorClass}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="glass-card p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">Consumed</p>
          <p className="font-medium">{totalCalories} cal</p>
        </div>
        
        <div className="glass-card p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">Goal</p>
          <p className="font-medium">{target} cal</p>
        </div>
        
        <div className="glass-card p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p className="font-medium">{Math.max(0, target - totalCalories)} cal</p>
        </div>
      </div>
    </div>
  );
};

export default CalorieProgress;
