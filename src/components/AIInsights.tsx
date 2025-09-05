import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Brain, Target, Activity } from 'lucide-react';

const AIInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Brain className="w-4 h-4 text-primary" />
            AI Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">87</span>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Excellent
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on your health metrics
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Target className="w-4 h-4 text-primary" />
            Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">73%</span>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              On Track
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Monthly progress
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-primary" />
            Workout Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">12</span>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              Days
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Keep it up!
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            AI Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">3.2</span>
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
              lbs/week
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Predicted progress
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;