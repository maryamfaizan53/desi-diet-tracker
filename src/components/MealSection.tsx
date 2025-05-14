
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MealItem, useMeal } from '@/context/MealContext';
import { MealType } from '@/data/foodData';

interface MealSectionProps {
  title: string;
  description: string;
  mealType: MealType;
}

const MealSection: React.FC<MealSectionProps> = ({ title, description, mealType }) => {
  const { meals, removeFromMeal, updateQuantity, clearMeal } = useMeal();
  const mealItems = meals[mealType];
  
  const totalCalories = mealItems.reduce(
    (total, item) => total + item.food.calories * item.quantity, 
    0
  );
  
  const handleRemove = (foodId: string) => {
    removeFromMeal(mealType, foodId);
  };
  
  const handleQuantityChange = (foodId: string, change: number) => {
    const item = mealItems.find(item => item.food.id === foodId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(mealType, foodId, newQuantity);
    }
  };

  return (
    <Card className="glass-card w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            disabled={mealItems.length === 0}
            onClick={() => clearMeal(mealType)}
            className={mealItems.length === 0 ? 'opacity-50' : ''}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {mealItems.length > 0 ? (
          <div className="space-y-2">
            {mealItems.map((item) => (
              <MealItemRow 
                key={item.food.id} 
                item={item} 
                onRemove={() => handleRemove(item.food.id)}
                onQuantityChange={(change) => handleQuantityChange(item.food.id, change)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No items added yet
          </div>
        )}
      </CardContent>
      
      {mealItems.length > 0 && (
        <>
          <Separator className="mx-4" />
          <CardFooter className="justify-between pt-4">
            <span className="text-muted-foreground">Total Calories</span>
            <span className="font-medium">{totalCalories} cal</span>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

interface MealItemRowProps {
  item: MealItem;
  onRemove: () => void;
  onQuantityChange: (change: number) => void;
}

const MealItemRow: React.FC<MealItemRowProps> = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex-1">
        <p className="font-medium text-sm">{item.food.name}</p>
        <p className="text-xs text-muted-foreground">{item.food.servingSize}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onQuantityChange(-1)}
          >
            <span className="text-xs">-</span>
          </Button>
          
          <span className="w-5 text-center text-sm">{item.quantity}</span>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => onQuantityChange(1)}
          >
            <span className="text-xs">+</span>
          </Button>
        </div>
        
        <div className="w-20 text-right text-sm">
          {item.food.calories * item.quantity} cal
        </div>
        
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onRemove}>
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default MealSection;
