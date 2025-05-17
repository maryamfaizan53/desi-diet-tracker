
import React from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

// Sample recipes data - in a real app, this would come from the backend
const recipes = [
  {
    id: 'recipe-1',
    name: 'Low-Calorie Chicken Curry',
    calories: 350,
    time: '30 min',
    difficulty: 'Medium',
    goal: 'lose',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641'
  },
  {
    id: 'recipe-2',
    name: 'Protein-Packed Chana Masala',
    calories: 450,
    time: '45 min',
    difficulty: 'Easy',
    goal: 'maintain',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36'
  },
  {
    id: 'recipe-3',
    name: 'High-Calorie Butter Chicken',
    calories: 650,
    time: '50 min',
    difficulty: 'Hard',
    goal: 'gain',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398'
  }
];

const RecipeSuggestions = () => {
  const { userProfile } = useUser();
  const userGoal = userProfile?.goal || 'maintain';
  
  // Filter recipes based on user's goal
  const filteredRecipes = recipes.filter(recipe => recipe.goal === userGoal);
  
  return (
    <div className="w-full glass-card p-5 rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Recipe Suggestions</h3>
        <p className="text-sm text-muted-foreground">
          Based on your {userGoal} weight goal
        </p>
      </div>
      
      <div className="space-y-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div 
                className="w-16 h-16 rounded-lg bg-cover bg-center" 
                style={{ backgroundImage: `url(${recipe.image})` }}
              />
              
              <div className="flex-1">
                <h4 className="font-medium">{recipe.name}</h4>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{recipe.calories} cal</span>
                  <span>•</span>
                  <span>{recipe.time}</span>
                  <span>•</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
              
              <Button size="sm" variant="outline">View</Button>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No recipes found for your goal. Please update your profile.
          </p>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="link">View All Recipes</Button>
      </div>
    </div>
  );
};

export default RecipeSuggestions;
