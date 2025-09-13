import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Heart, Target } from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  recommendations: string[];
}

const BMICalculator = () => {
  const { userProfile } = useUser();
  const [height, setHeight] = useState(userProfile?.height || 170);
  const [weight, setWeight] = useState(userProfile?.weight || 70);
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = React.useCallback(() => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category = '';
    let color = '';
    let recommendations: string[] = [];

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'bg-blue-500';
      recommendations = [
        'Focus on calorie-dense, nutritious foods',
        'Include healthy fats like nuts and avocados',
        'Add protein-rich foods like paneer and eggs',
        'Consider strength training exercises'
      ];
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = 'bg-green-500';
      recommendations = [
        'Maintain current eating habits',
        'Continue regular physical activity',
        'Focus on balanced nutrition',
        'Stay hydrated and get adequate sleep'
      ];
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'bg-yellow-500';
      recommendations = [
        'Create a moderate calorie deficit',
        'Increase cardio and strength training',
        'Focus on portion control',
        'Choose whole grains like brown rice'
      ];
    } else {
      category = 'Obese';
      color = 'bg-red-500';
      recommendations = [
        'Consult healthcare professional',
        'Start with light exercise like walking',
        'Focus on gradual weight loss',
        'Consider meal planning and tracking'
      ];
    }

    setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color, recommendations });
  }, [height, weight]);

  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    }
  }, [height, weight, calculateBMI]);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          BMI Calculator & Health Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Enter height in cm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="Enter weight in kg"
            />
          </div>
        </div>

        <Button onClick={calculateBMI} className="w-full">
          Calculate BMI
        </Button>

        {result && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{result.bmi}</div>
              <Badge className={`${result.color} text-white`}>
                {result.category}
              </Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Health Recommendations:
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BMICalculator;