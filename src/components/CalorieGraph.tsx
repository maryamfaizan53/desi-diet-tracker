
import React from 'react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useMeal } from '@/context/MealContext';
import { useUser } from '@/context/UserContext';

// Sample data - in a real app, this would come from the backend
const sampleWeekData = [
  { day: 'Mon', calories: 1850 },
  { day: 'Tue', calories: 2100 },
  { day: 'Wed', calories: 1920 },
  { day: 'Thu', calories: 2200 },
  { day: 'Fri', calories: 1750 },
  { day: 'Sat', calories: 2300 },
  { day: 'Sun', calories: 2050 },
];

const CalorieGraph = () => {
  const { userProfile } = useUser();
  const targetCalories = userProfile?.calorieTarget || 2000;

  // Add target line to data
  const dataWithTarget = sampleWeekData.map(day => ({
    ...day,
    target: targetCalories
  }));

  return (
    <div className="w-full glass-card p-5 rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Weekly Calorie Tracking</h3>
        <p className="text-sm text-muted-foreground">Your calorie intake for the past week</p>
      </div>

      <div className="h-64 w-full">
        <ChartContainer 
          config={{
            calories: { color: "#8B5CF6" },
            target: { color: "#F97316" }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataWithTarget}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }} 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="calories" 
                stroke="#8B5CF6" 
                fill="url(#colorCalories)" 
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#F97316"
                strokeDasharray="5 5"
                strokeWidth={2}
                fill="none"
              />
              <defs>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default CalorieGraph;
