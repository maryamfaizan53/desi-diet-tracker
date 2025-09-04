import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Flame, 
  Target, 
  TrendingUp, 
  Calendar,
  Award
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface FitnessStats {
  caloriesBurned: number;
  workoutsCompleted: number;
  activeMinutes: number;
  weeklyGoal: number;
  streak: number;
}

const FitnessTracker = () => {
  const { userProfile } = useUser();
  const [stats] = useState<FitnessStats>({
    caloriesBurned: 1250,
    workoutsCompleted: 4,
    activeMinutes: 180,
    weeklyGoal: 300, // minutes
    streak: 3
  });

  const weeklyProgress = (stats.activeMinutes / stats.weeklyGoal) * 100;
  const calorieGoal = userProfile?.calorieTarget || 2000;
  const calorieProgress = (stats.caloriesBurned / (calorieGoal * 0.3)) * 100; // 30% of daily calories as exercise goal

  const achievements = [
    { 
      title: '3-Day Streak', 
      description: 'Worked out 3 days in a row',
      icon: '🔥',
      unlocked: stats.streak >= 3
    },
    { 
      title: 'Calorie Burner', 
      description: 'Burned 1000+ calories this week',
      icon: '⚡',
      unlocked: stats.caloriesBurned >= 1000
    },
    { 
      title: 'Consistent Warrior', 
      description: 'Completed 4+ workouts this week',
      icon: '💪',
      unlocked: stats.workoutsCompleted >= 4
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Fitness <span className="text-gradient">Tracker</span>
        </h2>
        <p className="text-muted-foreground">
          Monitor your progress and stay motivated on your fitness journey
        </p>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <p className="text-2xl font-bold">{stats.caloriesBurned}</p>
              </div>
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
            <Progress value={calorieProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(calorieProgress)}% of weekly goal
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Workouts</p>
                <p className="text-2xl font-bold">{stats.workoutsCompleted}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+2 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Minutes</p>
                <p className="text-2xl font-bold">{stats.activeMinutes}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={weeklyProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.weeklyGoal - stats.activeMinutes} min to weekly goal
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold">{stats.streak} days</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="text-xs">
                Keep it up! 🔥
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  achievement.unlocked 
                    ? 'bg-primary/10 border-primary/30 animate-pulse-glow' 
                    : 'bg-muted/10 border-muted/30 opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.unlocked && (
                    <Badge className="mt-2 bg-green-500 text-white">
                      Unlocked!
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity Chart Placeholder */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-xs text-muted-foreground mb-2">{day}</p>
                <div 
                  className={`h-12 rounded-md ${
                    index < 4 ? 'bg-primary/50' : 'bg-muted/20'
                  }`}
                ></div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Daily activity visualization - workouts completed this week
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FitnessTracker;