
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
    fat: 5,
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'veg-2',
    name: 'Palak Paneer',
    category: 'vegetables',
    calories: 220,
    servingSize: '1 cup',
    protein: 12,
    carbs: 10,
    fat: 15,
    image: 'https://images.unsplash.com/photo-1644697899303-ad0cda9b7b54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'veg-3',
    name: 'Bhindi Masala',
    category: 'vegetables',
    calories: 120,
    servingSize: '1 cup',
    protein: 4,
    carbs: 15,
    fat: 6,
    image: 'https://images.unsplash.com/photo-1585032226651-759b2e71b3c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
    fat: 2,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'lentil-2',
    name: 'Chana Daal',
    category: 'lentils',
    calories: 180,
    servingSize: '1 cup',
    protein: 10,
    carbs: 25,
    fat: 3,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'lentil-3',
    name: 'Rajma',
    category: 'lentils',
    calories: 210,
    servingSize: '1 cup',
    protein: 15,
    carbs: 35,
    fat: 1,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
    fat: 16,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'meat-2',
    name: 'Beef Nihari',
    category: 'meat',
    calories: 320,
    servingSize: '1 cup',
    protein: 28,
    carbs: 7,
    fat: 22,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'meat-3',
    name: 'Chicken Tikka',
    category: 'meat',
    calories: 200,
    servingSize: '4 pieces',
    protein: 30,
    carbs: 2,
    fat: 8,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
    fat: 2,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'carb-2',
    name: 'Naan',
    category: 'carbs',
    calories: 260,
    servingSize: '1 piece',
    protein: 9,
    carbs: 50,
    fat: 4,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'carb-3',
    name: 'Basmati Rice',
    category: 'carbs',
    calories: 200,
    servingSize: '1 cup cooked',
    protein: 5,
    carbs: 45,
    fat: 0,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'carb-4',
    name: 'Paratha',
    category: 'carbs',
    calories: 330,
    servingSize: '1 piece',
    protein: 6,
    carbs: 30,
    fat: 18,
    image: 'https://images.unsplash.com/photo-1574653853027-5e5de1b3b97f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
    fat: 28,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'protein-2',
    name: 'Boiled Egg',
    category: 'protein',
    calories: 78,
    servingSize: '1 egg',
    protein: 6,
    carbs: 1,
    fat: 5,
    image: 'https://images.unsplash.com/photo-1582169296194-7513f415c6d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'protein-3',
    name: 'Tandoori Chicken',
    category: 'protein',
    calories: 165,
    servingSize: '100g',
    protein: 25,
    carbs: 2,
    fat: 7,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
    fat: 7,
    image: 'https://images.unsplash.com/photo-1597318378536-c46c5a3d3a5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'bev-2',
    name: 'Lassi',
    category: 'beverages',
    calories: 150,
    servingSize: '1 glass',
    protein: 5,
    carbs: 15,
    fat: 8,
    image: 'https://images.unsplash.com/photo-1562509120-582d67ccd96a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'bev-3',
    name: 'Mango Shake',
    category: 'beverages',
    calories: 230,
    servingSize: '1 glass',
    protein: 4,
    carbs: 40,
    fat: 5,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
    fat: 7,
    image: 'https://images.unsplash.com/photo-1643133480671-deb9b85a2eec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'sweet-2',
    name: 'Jalebi',
    category: 'sweets',
    calories: 120,
    servingSize: '1 piece',
    protein: 1,
    carbs: 22,
    fat: 5,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'sweet-3',
    name: 'Kheer',
    category: 'sweets',
    calories: 200,
    servingSize: '1/2 cup',
    protein: 4,
    carbs: 28,
    fat: 10,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
