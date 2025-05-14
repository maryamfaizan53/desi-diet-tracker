
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MealSection from '@/components/MealSection';
import CalorieProgress from '@/components/CalorieProgress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMeal } from '@/context/MealContext';
import { useUser } from '@/context/UserContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const MealPlanner = () => {
  const { clearAllMeals } = useMeal();
  const { userProfile, isProfileComplete } = useUser();
  
  const handleClearAll = () => {
    clearAllMeals();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Left column: Meal sections */}
            <div className="w-full md:w-2/3 space-y-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Meal Planner</h1>
                  <p className="text-muted-foreground">Plan and track your meals for the day</p>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Clear All</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will clear all your planned meals for today. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearAll}>Clear All</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <div className="space-y-6">
                <MealSection 
                  title="Breakfast" 
                  description="Morning meal to kickstart your day" 
                  mealType="breakfast" 
                />
                
                <MealSection 
                  title="Lunch" 
                  description="Midday meal for sustained energy" 
                  mealType="lunch" 
                />
                
                <MealSection 
                  title="Dinner" 
                  description="Evening meal to complete your day" 
                  mealType="dinner" 
                />
                
                <MealSection 
                  title="Snacks" 
                  description="Small bites between meals" 
                  mealType="snacks" 
                />
                
                <div className="flex justify-center mt-8">
                  <Button asChild>
                    <Link to="/food-library">Add More Foods</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right column: Summary and profile */}
            <div className="w-full md:w-1/3 space-y-6">
              <CalorieProgress />
              
              {!isProfileComplete ? (
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set up your profile to get personalized calorie targets and recommendations.
                  </p>
                  <Button asChild>
                    <Link to="/profile">Set Up Profile</Link>
                  </Button>
                </div>
              ) : (
                <div className="glass-card p-5 rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span>{userProfile?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age</span>
                      <span>{userProfile?.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span>{userProfile?.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal</span>
                      <span className="capitalize">{userProfile?.goal}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button asChild variant="outline" size="sm">
                      <Link to="/profile">Edit Profile</Link>
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="glass-card p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Nutrition Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Replace white rice with brown rice for more fiber</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Add more vegetables to your curries for extra nutrients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Use yogurt instead of cream in recipes to reduce calories</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MealPlanner;
