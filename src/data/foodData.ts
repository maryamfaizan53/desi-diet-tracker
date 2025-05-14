
// Type definitions
export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  calories: number;
  servingSize: string;
  image?: string;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export type FoodCategory = 
  | 'vegetables'
  | 'lentils'
  | 'meat'
  | 'carbs'
  | 'protein'
  | 'beverages'
  | 'sweets';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface CategoryInfo {
  name: string;
  icon: string;
  description: string;
}

// Category information
export const foodCategories: Record<FoodCategory, CategoryInfo> = {
  vegetables: {
    name: 'Vegetables (Sabzi)',
    icon: '🥗',
    description: 'Nutritious vegetable dishes and curries'
  },
  lentils: {
    name: 'Lentils (Daal)',
    icon: '🍛',
    description: 'Protein-rich lentil dishes'
  },
  meat: {
    name: 'Meats',
    icon: '🍗',
    description: 'Chicken, beef, and other meat dishes'
  },
  carbs: {
    name: 'Carbs',
    icon: '🍞',
    description: 'Roti, naan, rice, and other staples'
  },
  protein: {
    name: 'Protein',
    icon: '🥚',
    description: 'Eggs, paneer, and other protein sources'
  },
  beverages: {
    name: 'Beverages',
    icon: '🍵',
    description: 'Chai, lassi, and other drinks'
  },
  sweets: {
    name: 'Sweets',
    icon: '🍬',
    description: 'Traditional desserts and sweet dishes'
  }
};

// Sample food database
export const foodDatabase: FoodItem[] = [
  // Vegetables (Sabzi)
  {
    id: 'veg-1',
    name: 'Aloo Gobi',
    category: 'vegetables',
    calories: 150,
    servingSize: '1 cup',
    protein: 4,
    carbs: 25,
    fat: 5
  },
  {
    id: 'veg-2',
    name: 'Palak Paneer',
    category: 'vegetables',
    calories: 220,
    servingSize: '1 cup',
    protein: 12,
    carbs: 10,
    fat: 15
  },
  {
    id: 'veg-3',
    name: 'Bhindi Masala',
    category: 'vegetables',
    calories: 120,
    servingSize: '1 cup',
    protein: 4,
    carbs: 15,
    fat: 6
  },
  
  // Lentils (Daal)
  {
    id: 'lentil-1',
    name: 'Yellow Daal',
    category: 'lentils',
    calories: 150,
    servingSize: '1 cup',
    protein: 9,
    carbs: 20,
    fat: 2
  },
  {
    id: 'lentil-2',
    name: 'Chana Daal',
    category: 'lentils',
    calories: 180,
    servingSize: '1 cup',
    protein: 10,
    carbs: 25,
    fat: 3
  },
  {
    id: 'lentil-3',
    name: 'Rajma',
    category: 'lentils',
    calories: 210,
    servingSize: '1 cup',
    protein: 15,
    carbs: 35,
    fat: 1
  },
  
  // Meats
  {
    id: 'meat-1',
    name: 'Chicken Curry',
    category: 'meat',
    calories: 280,
    servingSize: '1 cup',
    protein: 26,
    carbs: 8,
    fat: 16
  },
  {
    id: 'meat-2',
    name: 'Beef Nihari',
    category: 'meat',
    calories: 320,
    servingSize: '1 cup',
    protein: 28,
    carbs: 7,
    fat: 22
  },
  {
    id: 'meat-3',
    name: 'Chicken Tikka',
    category: 'meat',
    calories: 200,
    servingSize: '4 pieces',
    protein: 30,
    carbs: 2,
    fat: 8
  },
  
  // Carbs
  {
    id: 'carb-1',
    name: 'Roti',
    category: 'carbs',
    calories: 120,
    servingSize: '1 piece',
    protein: 4,
    carbs: 20,
    fat: 2
  },
  {
    id: 'carb-2',
    name: 'Naan',
    category: 'carbs',
    calories: 260,
    servingSize: '1 piece',
    protein: 9,
    carbs: 50,
    fat: 4
  },
  {
    id: 'carb-3',
    name: 'Basmati Rice',
    category: 'carbs',
    calories: 200,
    servingSize: '1 cup cooked',
    protein: 5,
    carbs: 45,
    fat: 0
  },
  {
    id: 'carb-4',
    name: 'Paratha',
    category: 'carbs',
    calories: 330,
    servingSize: '1 piece',
    protein: 6,
    carbs: 30,
    fat: 18
  },
  
  // Protein
  {
    id: 'protein-1',
    name: 'Paneer',
    category: 'protein',
    calories: 340,
    servingSize: '100g',
    protein: 18,
    carbs: 3,
    fat: 28
  },
  {
    id: 'protein-2',
    name: 'Boiled Egg',
    category: 'protein',
    calories: 78,
    servingSize: '1 egg',
    protein: 6,
    carbs: 1,
    fat: 5
  },
  {
    id: 'protein-3',
    name: 'Tandoori Chicken',
    category: 'protein',
    calories: 165,
    servingSize: '100g',
    protein: 25,
    carbs: 2,
    fat: 7
  },
  
  // Beverages
  {
    id: 'bev-1',
    name: 'Chai with Milk',
    category: 'beverages',
    calories: 120,
    servingSize: '1 cup',
    protein: 3,
    carbs: 10,
    fat: 7
  },
  {
    id: 'bev-2',
    name: 'Lassi',
    category: 'beverages',
    calories: 150,
    servingSize: '1 glass',
    protein: 5,
    carbs: 15,
    fat: 8
  },
  {
    id: 'bev-3',
    name: 'Mango Shake',
    category: 'beverages',
    calories: 230,
    servingSize: '1 glass',
    protein: 4,
    carbs: 40,
    fat: 5
  },
  
  // Sweets
  {
    id: 'sweet-1',
    name: 'Gulab Jamun',
    category: 'sweets',
    calories: 150,
    servingSize: '1 piece',
    protein: 2,
    carbs: 20,
    fat: 7
  },
  {
    id: 'sweet-2',
    name: 'Jalebi',
    category: 'sweets',
    calories: 120,
    servingSize: '1 piece',
    protein: 1,
    carbs: 22,
    fat: 5
  },
  {
    id: 'sweet-3',
    name: 'Kheer',
    category: 'sweets',
    calories: 200,
    servingSize: '1/2 cup',
    protein: 4,
    carbs: 28,
    fat: 10
  }
];

export const getMealTargets = (goal: string, weight: number): number => {
  switch (goal) {
    case 'lose':
      return Math.round((weight * 24) - 500); // Calorie deficit
    case 'gain':
      return Math.round((weight * 24) + 500); // Calorie surplus
    default:
      return Math.round(weight * 24); // Maintenance
  }
};

// Get food items by category
export const getFoodsByCategory = (category: FoodCategory): FoodItem[] => {
  return foodDatabase.filter(food => food.category === category);
};

// Search food items
export const searchFoods = (query: string): FoodItem[] => {
  const lowerCaseQuery = query.toLowerCase();
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(lowerCaseQuery)
  );
};
