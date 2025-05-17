
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { foodDatabase } from '@/data/foodData';
import { useMeal } from '@/context/MealContext';

const FeaturedFood = () => {
  const [featuredFood, setFeaturedFood] = useState<any>(null);
  const { addFoodToMeal } = useMeal();
  
  useEffect(() => {
    // Randomly select a food item for the featured food each day
    const getRandomFood = () => {
      const randomIndex = Math.floor(Math.random() * foodDatabase.length);
      return foodDatabase[randomIndex];
    };
    
    setFeaturedFood(getRandomFood());
  }, []);
  
  if (!featuredFood) return null;
  
  const handleAddToMeal = () => {
    addFoodToMeal(featuredFood, 'lunch', 1); // Default to lunch
  };
  
  return (
    <div className="w-full glass-card p-5 rounded-xl relative overflow-hidden">
      <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-1 rotate-12 shadow-lg text-sm font-medium z-10">
        Today's Pick
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Featured Food</h3>
        <p className="text-sm text-muted-foreground">Try this delicious option today</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-200 to-amber-400 rounded-lg flex items-center justify-center text-3xl">
          {getFoodEmoji(featuredFood.category)}
        </div>
        
        <div className="flex-1">
          <h4 className="text-lg font-medium">{featuredFood.name}</h4>
          <p className="text-sm text-muted-foreground">
            {featuredFood.calories} cal per {featuredFood.servingSize}
          </p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="default" onClick={handleAddToMeal}>
              Add to Meal
            </Button>
            <Button size="sm" variant="outline">
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji based on food category
const getFoodEmoji = (category: string) => {
  switch (category) {
    case 'vegetables':
      return '🥗';
    case 'lentils':
      return '🍛';
    case 'meat':
      return '🍗';
    case 'carbs':
      return '🍞';
    case 'protein':
      return '🥚';
    case 'beverages':
      return '🍵';
    case 'sweets':
      return '🍬';
    default:
      return '🍽️';
  }
};

export default FeaturedFood;
