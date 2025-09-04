import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  Search,
  BookOpen,
  ChefHat
} from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  description: string;
  calories: number;
  servings: number;
  prepTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'weight-loss' | 'weight-gain' | 'balanced';
  image: string;
  ingredients: string[];
  instructions: string[];
  nutritionTips: string[];
}

const HealthyRecipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Quinoa Dal Bowl',
      description: 'Protein-rich lentil curry served with quinoa for sustained energy',
      calories: 420,
      servings: 2,
      prepTime: '25 mins',
      difficulty: 'easy',
      category: 'weight-loss',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=60',
      ingredients: [
        '1 cup quinoa',
        '1/2 cup yellow lentils (moong dal)',
        '1 onion, chopped',
        '2 tomatoes, chopped',
        'Turmeric, cumin, coriander',
        'Fresh cilantro'
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Prepare dal with spices and vegetables',
        'Serve dal over quinoa',
        'Garnish with fresh cilantro'
      ],
      nutritionTips: [
        'Quinoa provides complete protein',
        'Lentils are rich in fiber and folate',
        'Low in saturated fat'
      ]
    },
    {
      id: '2',
      name: 'Grilled Chicken Tikka Salad',
      description: 'Lean protein with colorful vegetables and yogurt dressing',
      calories: 350,
      servings: 1,
      prepTime: '30 mins',
      difficulty: 'medium',
      category: 'weight-loss',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=60',
      ingredients: [
        '200g chicken breast',
        'Mixed greens',
        'Cucumber, tomatoes, onions',
        'Greek yogurt',
        'Tikka masala spices',
        'Mint and cilantro'
      ],
      instructions: [
        'Marinate chicken in yogurt and spices',
        'Grill chicken until cooked through',
        'Prepare fresh salad',
        'Slice chicken and serve over salad'
      ],
      nutritionTips: [
        'High in lean protein',
        'Rich in vitamins from vegetables',
        'Greek yogurt adds probiotics'
      ]
    },
    {
      id: '3',
      name: 'Avocado Paratha Roll',
      description: 'Nutrient-dense wrap with healthy fats for weight gain',
      calories: 650,
      servings: 1,
      prepTime: '20 mins',
      difficulty: 'easy',
      category: 'weight-gain',
      image: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?w=600&auto=format&fit=crop&q=60',
      ingredients: [
        '1 whole wheat paratha',
        '1 ripe avocado',
        '2 eggs, scrambled',
        'Paneer cubes',
        'Mint chutney',
        'Sliced onions and tomatoes'
      ],
      instructions: [
        'Cook paratha until golden',
        'Mash avocado with spices',
        'Scramble eggs with paneer',
        'Assemble roll with all ingredients'
      ],
      nutritionTips: [
        'Avocado provides healthy monounsaturated fats',
        'Eggs and paneer add protein',
        'Complex carbs from whole wheat'
      ]
    },
    {
      id: '4',
      name: 'Balanced Buddha Bowl',
      description: 'Complete meal with vegetables, grains, and lean protein',
      calories: 480,
      servings: 1,
      prepTime: '35 mins',
      difficulty: 'medium',
      category: 'balanced',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=60',
      ingredients: [
        '1/2 cup brown rice',
        'Roasted vegetables (broccoli, carrots, bell peppers)',
        '100g grilled tofu or chicken',
        'Chickpeas',
        'Tahini dressing',
        'Pumpkin seeds'
      ],
      instructions: [
        'Cook brown rice',
        'Roast vegetables with spices',
        'Grill protein of choice',
        'Arrange in bowl and drizzle with dressing'
      ],
      nutritionTips: [
        'Balanced macronutrients',
        'High in fiber and antioxidants',
        'Provides sustained energy'
      ]
    }
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weight-loss': return 'bg-blue-500';
      case 'weight-gain': return 'bg-purple-500';
      case 'balanced': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Healthy <span className="text-gradient">Recipes</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-curated recipes tailored to your fitness goals and dietary preferences
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search recipes or goals (weight-loss, weight-gain)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="weight-loss">Weight Loss</TabsTrigger>
          <TabsTrigger value="weight-gain">Weight Gain</TabsTrigger>
          <TabsTrigger value="balanced">Balanced</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <RecipeGrid recipes={filteredRecipes} onSelectRecipe={setSelectedRecipe} />
        </TabsContent>

        <TabsContent value="weight-loss" className="space-y-4">
          <RecipeGrid 
            recipes={filteredRecipes.filter(r => r.category === 'weight-loss')} 
            onSelectRecipe={setSelectedRecipe} 
          />
        </TabsContent>

        <TabsContent value="weight-gain" className="space-y-4">
          <RecipeGrid 
            recipes={filteredRecipes.filter(r => r.category === 'weight-gain')} 
            onSelectRecipe={setSelectedRecipe} 
          />
        </TabsContent>

        <TabsContent value="balanced" className="space-y-4">
          <RecipeGrid 
            recipes={filteredRecipes.filter(r => r.category === 'balanced')} 
            onSelectRecipe={setSelectedRecipe} 
          />
        </TabsContent>
      </Tabs>

      {/* Selected Recipe Modal/Card */}
      {selectedRecipe && (
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                {selectedRecipe.name}
              </CardTitle>
              <Button variant="ghost" onClick={() => setSelectedRecipe(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              src={selectedRecipe.image} 
              alt={selectedRecipe.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            
            <div className="flex flex-wrap gap-2">
              <Badge className={`${getCategoryColor(selectedRecipe.category)} text-white`}>
                {selectedRecipe.category.replace('-', ' ')}
              </Badge>
              <Badge className={`${getDifficultyColor(selectedRecipe.difficulty)} text-white`}>
                {selectedRecipe.difficulty}
              </Badge>
            </div>

            <p className="text-muted-foreground">{selectedRecipe.description}</p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm">{selectedRecipe.calories} cal</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{selectedRecipe.prepTime}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-sm">{selectedRecipe.servings} servings</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Ingredients:</h4>
                <ul className="space-y-1">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm">• {ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <ol className="space-y-1">
                  {selectedRecipe.instructions.map((step, index) => (
                    <li key={index} className="text-sm">{index + 1}. {step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Nutrition Tips:
                </h4>
                <ul className="space-y-1">
                  {selectedRecipe.nutritionTips.map((tip, index) => (
                    <li key={index} className="text-sm text-green-600">• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface RecipeGridProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeGrid = ({ recipes, onSelectRecipe }: RecipeGridProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'weight-loss': return 'bg-blue-500';
      case 'weight-gain': return 'bg-purple-500';
      case 'balanced': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="glass-card hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden">
          <div onClick={() => onSelectRecipe(recipe)}>
            <div className="relative h-48">
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge className={`${getCategoryColor(recipe.category)} text-white text-xs`}>
                  {recipe.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {recipe.description}
              </p>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    {recipe.calories}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {recipe.prepTime}
                  </div>
                </div>
                
                <Badge className={`${getDifficultyColor(recipe.difficulty)} text-white text-xs`}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HealthyRecipes;