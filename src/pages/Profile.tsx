import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIInsights from '@/components/AIInsights';
import { useUser } from '@/context/UserContext';
import { User, Target, Activity, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { userProfile, updateUserProfile } = useUser();
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    age: userProfile?.age || 30,
    weight: userProfile?.weight || 70,
    height: userProfile?.height || 170,
    gender: userProfile?.gender || 'male',
    goal: userProfile?.goal || 'maintain'
  });

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name,
        age: userProfile.age,
        weight: userProfile.weight,
        height: userProfile.height,
        gender: userProfile.gender,
        goal: userProfile.goal
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const calculatedBmi = formData.weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi);
      
      if (calculatedBmi < 18.5) {
        setBmiCategory('Underweight');
      } else if (calculatedBmi < 25) {
        setBmiCategory('Normal');
      } else if (calculatedBmi < 30) {
        setBmiCategory('Overweight');
      } else {
        setBmiCategory('Obese');
      }
    }
  }, [formData.height, formData.weight]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile = {
      ...formData,
      calorieTarget: formData.goal === 'lose' ? 1500 : formData.goal === 'gain' ? 2200 : 1800
    };
    
    updateUserProfile(profile);
    
    toast({
      title: "Profile Updated",
      description: "Your AI health profile has been updated successfully!",
    });
  };

  const getBmiColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-500';
      case 'Normal': return 'bg-green-500';
      case 'Overweight': return 'bg-yellow-500';
      case 'Obese': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 py-8 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">AI Health Profile</h1>
            <p className="text-muted-foreground">
              Manage your health data to unlock personalized AI recommendations and insights.
            </p>
          </div>
          
          <AIInsights />
          
          <div className="grid gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  AI Health Profile Setup
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Complete your profile to unlock personalized AI recommendations
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="1"
                        max="120"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        min="30"
                        max="200"
                        step="0.1"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        min="100"
                        max="250"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange('gender', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Goal</Label>
                      <Select
                        value={formData.goal}
                        onValueChange={(value) => handleSelectChange('goal', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose">Lose Weight</SelectItem>
                          <SelectItem value="maintain">Maintain Weight</SelectItem>
                          <SelectItem value="gain">Gain Weight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full gap-2">
                    <Target className="w-4 h-4" />
                    Update AI Profile
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* BMI Display */}
            {bmi && (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Live BMI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold">{bmi.toFixed(1)}</div>
                      <p className="text-muted-foreground">BMI Score</p>
                    </div>
                    <Badge className={`${getBmiColor(bmiCategory)} text-white`}>
                      {bmiCategory}
                    </Badge>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">AI Recommendations:</h4>
                    <div className="text-sm text-muted-foreground">
                      {bmiCategory === 'Underweight' && (
                        <p>Focus on nutrient-dense, high-calorie foods and strength training.</p>
                      )}
                      {bmiCategory === 'Normal' && (
                        <p>Maintain your current healthy lifestyle with balanced nutrition.</p>
                      )}
                      {bmiCategory === 'Overweight' && (
                        <p>Consider a moderate calorie deficit with increased physical activity.</p>
                      )}
                      {bmiCategory === 'Obese' && (
                        <p>Consult healthcare professionals and start with gradual lifestyle changes.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">
                    {formData.goal === 'lose' ? '1500' : formData.goal === 'gain' ? '2200' : '1800'}
                  </div>
                  <p className="text-sm text-muted-foreground">Daily Calories</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">
                    {formData.goal === 'lose' ? '5-6' : formData.goal === 'gain' ? '3-4' : '4-5'}
                  </div>
                  <p className="text-sm text-muted-foreground">Workouts/Week</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">
                    {formData.goal === 'lose' ? '-0.5' : formData.goal === 'gain' ? '+0.5' : '0'}
                  </div>
                  <p className="text-sm text-muted-foreground">kg/week target</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;