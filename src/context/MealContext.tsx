
import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, MealType } from '@/data/foodData';

// Define types for our context
export interface MealItem {
  food: FoodItem;
  quantity: number;
}

interface MealPlan {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
}

interface MealContextType {
  meals: MealPlan;
  addToMeal: (mealType: MealType, foodItem: FoodItem, quantity: number) => void;
  removeFromMeal: (mealType: MealType, foodId: string) => void;
  updateQuantity: (mealType: MealType, foodId: string, quantity: number) => void;
  clearMeal: (mealType: MealType) => void;
  clearAllMeals: () => void;
  totalCalories: number;
}

// Create the context
const MealContext = createContext<MealContextType | undefined>(undefined);

// Initial empty meal plan
const initialMealPlan: MealPlan = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snacks: [],
};

// Provider component
export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load stored meals from localStorage
  const loadStoredMeals = (): MealPlan => {
    if (typeof window === 'undefined') {
      return initialMealPlan;
    }
    
    const storedMeals = localStorage.getItem('desiDietMeals');
    return storedMeals ? JSON.parse(storedMeals) : initialMealPlan;
  };
  
  const [meals, setMeals] = useState<MealPlan>(loadStoredMeals);
  const [totalCalories, setTotalCalories] = useState(0);
  
  // Calculate total calories from all meals
  const calculateTotalCalories = React.useCallback(() => {
    const allMeals = [...meals.breakfast, ...meals.lunch, ...meals.dinner, ...meals.snacks];
    const total = allMeals.reduce((sum, item) => {
      return sum + (item.food.calories * item.quantity);
    }, 0);
    
    setTotalCalories(total);
  }, [meals]);
  
  // Calculate total calories whenever meals change
  useEffect(() => {
    calculateTotalCalories();
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('desiDietMeals', JSON.stringify(meals));
    }
  }, [meals, calculateTotalCalories]);
  
  // Add a food item to a meal
  const addToMeal = (mealType: MealType, foodItem: FoodItem, quantity: number) => {
    setMeals(prevMeals => {
      const updatedMeal = [...prevMeals[mealType]];
      
      // Check if the food already exists
      const existingItemIndex = updatedMeal.findIndex(item => item.food.id === foodItem.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        updatedMeal[existingItemIndex] = {
          ...updatedMeal[existingItemIndex],
          quantity: updatedMeal[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        updatedMeal.push({ food: foodItem, quantity });
      }
      
      return {
        ...prevMeals,
        [mealType]: updatedMeal
      };
    });
  };
  
  // Remove a food item from a meal
  const removeFromMeal = (mealType: MealType, foodId: string) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter(item => item.food.id !== foodId)
    }));
  };
  
  // Update the quantity of a food item
  const updateQuantity = (mealType: MealType, foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromMeal(mealType, foodId);
      return;
    }
    
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].map(item => 
        item.food.id === foodId ? { ...item, quantity } : item
      )
    }));
  };
  
  // Clear a specific meal
  const clearMeal = (mealType: MealType) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [mealType]: []
    }));
  };
  
  // Clear all meals
  const clearAllMeals = () => {
    setMeals(initialMealPlan);
  };
  
  const value = {
    meals,
    addToMeal,
    removeFromMeal,
    updateQuantity,
    clearMeal,
    clearAllMeals,
    totalCalories
  };
  
  return (
    <MealContext.Provider value={value}>
      {children}
    </MealContext.Provider>
  );
};

// Hook to use the meal context
export const useMeal = () => {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error('useMeal must be used within a MealProvider');
  }
  return context;
};
