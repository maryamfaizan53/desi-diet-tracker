
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUser, UserProfile } from '@/context/UserContext';
import { toast } from '@/hooks/use-toast';
import { Calculator, Heart, Target, TrendingUp, AlertCircle } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { userProfile, updateUserProfile } = useUser();
  
  // Initialize form state
  const [formState, setFormState] = useState<UserProfile>({
    name: '',
    age: 30,
    weight: 70,
    height: 170,
    gender: 'male',
    goal: 'maintain',
    calorieTarget: 1800,
  });

  // BMI calculation state
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  
  // Load existing profile if available
  useEffect(() => {
    if (userProfile) {
      setFormState(userProfile);
    }
  }, [userProfile]);

  // Calculate BMI and recommendations when height or weight changes
  useEffect(() => {
    if (formState.height && formState.weight) {
      const heightInMeters = formState.height / 100;
      const calculatedBmi = formState.weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi);
      
      // Determine BMI category and recommendations
      let category = '';
      let recs: string[] = [];
      
      if (calculatedBmi < 18.5) {
        category = 'Underweight';
        recs = [
          'Focus on nutrient-dense, high-calorie foods',
          'Include healthy fats like nuts, seeds, and avocados',
          'Add protein-rich foods like paneer, eggs, and legumes',
          'Consider strength training to build muscle mass',
          'Eat frequent, smaller meals throughout the day'
        ];
      } else if (calculatedBmi < 25) {
        category = 'Normal Weight';
        recs = [
          'Maintain your current healthy eating patterns',
          'Continue regular physical activity',
          'Focus on balanced nutrition with all food groups',
          'Stay hydrated and get adequate sleep',
          'Monitor portion sizes to maintain weight'
        ];
      } else if (calculatedBmi < 30) {
        category = 'Overweight';
        recs = [
          'Create a moderate calorie deficit (300-500 calories)',
          'Increase physical activity with cardio and strength training',
          'Focus on portion control and mindful eating',
          'Choose whole grains over refined carbohydrates',
          'Include more vegetables and lean proteins in your diet'
        ];
      } else {
        category = 'Obese';
        recs = [
          'Consult with a healthcare professional',
          'Start with light exercise like walking or swimming',
          'Focus on gradual, sustainable weight loss',
          'Consider meal planning and calorie tracking',
          'Prioritize whole foods and avoid processed foods'
        ];
      }
      
      setBmiCategory(category);
      setRecommendations(recs);
    }
  }, [formState.height, formState.weight]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Convert numerical fields
    if (name === 'age' || name === 'weight' || name === 'height') {
      setFormState(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formState.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    // Update profile in context
    updateUserProfile(formState);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully. Check out your fitness recommendations!",
    });
    
    // Navigate to fitness hub to see personalized recommendations
    navigate('/fitness');
  };

  const getBmiColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-500';
      case 'Normal Weight': return 'bg-green-500';
      case 'Overweight': return 'bg-yellow-500';
      case 'Obese': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Form */}
            <div className="lg:col-span-2">
              <div className="glass-effect p-8 rounded-xl">
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Complete Your Profile
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic information */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Basic Information</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min="1"
                          max="120"
                          value={formState.age}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup
                          defaultValue={formState.gender}
                          value={formState.gender}
                          onValueChange={(value) => handleSelectChange('gender', value as 'male' | 'female' | 'other')}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  
                  {/* Physical measurements */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Physical Measurements</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          min="30"
                          max="200"
                          step="0.1"
                          value={formState.weight}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          min="100"
                          max="250"
                          value={formState.height}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Goal settings */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium">Fitness Goals</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="goal">Primary Goal</Label>
                      <Select
                        value={formState.goal}
                        onValueChange={(value) => handleSelectChange('goal', value as 'lose' | 'maintain' | 'gain')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose">Lose Weight</SelectItem>
                          <SelectItem value="maintain">Maintain Weight</SelectItem>
                          <SelectItem value="gain">Gain Weight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={() => navigate('/')}>
                      Cancel
                    </Button>
                    <Button type="submit" className="gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Save & Get Recommendations
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* BMI Calculator & Recommendations */}
            <div className="space-y-6">
              {/* BMI Card */}
              {bmi && (
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Your BMI Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">{bmi.toFixed(1)}</div>
                      <Badge className={`${getBmiColor(bmiCategory)} text-white`}>
                        {bmiCategory}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        Health Insights:
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Target className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Fitness Preview */}
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-blue-500" />
                    <span>Complete your profile to unlock:</span>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Personalized workout plans
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      AI-curated healthy recipes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Progress tracking dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Daily calorie recommendations
                    </li>
                  </ul>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4" 
                    onClick={() => navigate('/fitness')}
                  >
                    Preview Fitness Hub
                  </Button>
                </CardContent>
              </Card>

              {/* Weight Goal Specific Tips */}
              {formState.goal && (
                <Card className="glass-effect">
                  <CardHeader>
                    <CardTitle>Goal-Specific Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {formState.goal === 'lose' && (
                      <div className="space-y-2 text-sm">
                        <p className="font-medium text-blue-600">Weight Loss Focus:</p>
                        <ul className="space-y-1">
                          <li>• Create a 300-500 calorie deficit</li>
                          <li>• Focus on protein-rich foods</li>
                          <li>• Include cardio and strength training</li>
                        </ul>
                      </div>
                    )}
                    
                    {formState.goal === 'gain' && (
                      <div className="space-y-2 text-sm">
                        <p className="font-medium text-green-600">Weight Gain Focus:</p>
                        <ul className="space-y-1">
                          <li>• Add 300-500 extra calories daily</li>
                          <li>• Include healthy fats and complex carbs</li>
                          <li>• Focus on strength training</li>
                        </ul>
                      </div>
                    )}
                    
                    {formState.goal === 'maintain' && (
                      <div className="space-y-2 text-sm">
                        <p className="font-medium text-purple-600">Weight Maintenance:</p>
                        <ul className="space-y-1">
                          <li>• Balance calorie intake with activity</li>
                          <li>• Focus on consistent, healthy habits</li>
                          <li>• Include variety in exercise routine</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
