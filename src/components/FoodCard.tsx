
import { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FoodItem, MealType } from '@/data/foodData';
import { useMeal } from '@/context/MealContext';
import { useToast } from '@/hooks/use-toast';

interface FoodCardProps {
  food: FoodItem;
  mealType?: MealType;
}

const FoodCard = ({ food, mealType }: FoodCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToMeal } = useMeal();
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToMeal = () => {
    if (!mealType) return;
    
    addToMeal(mealType, food, quantity);
    setIsAdded(true);
    
    // Show confirmation toast
    toast({
      title: `Added to ${mealType}`,
      description: `${quantity} serving(s) of ${food.name} added`,
    });
    
    // Reset after a short delay
    setTimeout(() => {
      setIsAdded(false);
      setQuantity(1);
    }, 1500);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <Card className="glass-card overflow-hidden h-full flex flex-col">
      {food.image && (
        <div className="h-32 w-full overflow-hidden">
          <img 
            src={food.image} 
            alt={food.name} 
            className="h-full w-full object-cover transition-transform hover:scale-110 duration-700"
          />
        </div>
      )}
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium">{food.name}</h3>
            <p className="text-xs text-muted-foreground">{food.servingSize}</p>
          </div>
          <span className="text-primary font-semibold">{food.calories} cal</span>
        </div>

        <div className="mt-2 space-y-1 flex-grow">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Protein</span>
            <span>{food.protein || 0}g</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Carbs</span>
            <span>{food.carbs || 0}g</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Fat</span>
            <span>{food.fat || 0}g</span>
          </div>
        </div>

        {mealType && (
          <div className="mt-4">
            {!isAdded ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={decrementQuantity}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="w-4 text-center">{quantity}</span>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium">
                      {food.calories * quantity} cal
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant="default" 
                  className="w-full"
                  size="sm"
                  onClick={handleAddToMeal}
                >
                  Add to {mealType}
                </Button>
              </>
            ) : (
              <Button 
                variant="secondary" 
                className="w-full bg-green-500/20 hover:bg-green-500/30"
                size="sm"
                disabled
              >
                <Check className="h-4 w-4 mr-2" /> Added
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default FoodCard;
