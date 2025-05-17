
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FoodCard from '@/components/FoodCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FoodCategory, foodCategories, foodDatabase, searchFoods } from '@/data/foodData';

// Helper function to get placeholder image for food categories
const getFoodCategoryImage = (category: FoodCategory): string => {
  const imageMap: Record<FoodCategory, string> = {
    vegetables: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    lentils: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    meat: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    carbs: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    protein: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    beverages: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    sweets: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  };
  
  return imageMap[category];
};

const FoodLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FoodCategory | 'all'>('all');
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically through the searchQuery state
  };
  
  // Filter foods based on search query and active tab
  const filteredFoods = searchQuery
    ? searchFoods(searchQuery)
    : activeTab === 'all'
    ? foodDatabase
    : foodDatabase.filter(food => food.category === activeTab);

  // Add images to foods
  const foodsWithImages = filteredFoods.map(food => ({
    ...food,
    image: food.image || getFoodCategoryImage(food.category)
  }));
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="glass-effect p-6 rounded-xl mb-8">
            <h1 className="text-2xl font-bold mb-2">Food Library</h1>
            <p className="text-muted-foreground mb-6">
              Browse our collection of South Asian foods or search for your favorites.
            </p>
            
            {/* Search form */}
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>
          
          {/* Category tabs and meal selection */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FoodCategory | 'all')} className="w-full md:max-w-2xl">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
                <TabsTrigger value="lentils">Lentils</TabsTrigger>
                <TabsTrigger value="meat">Meat</TabsTrigger>
              </TabsList>
              
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                <TabsTrigger value="carbs">Carbs</TabsTrigger>
                <TabsTrigger value="protein">Protein</TabsTrigger>
                <TabsTrigger value="beverages">Beverages</TabsTrigger>
                <TabsTrigger value="sweets">Sweets</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="w-full md:w-auto">
              <Tabs 
                value={selectedMealType} 
                onValueChange={(value) => setSelectedMealType(value as 'breakfast' | 'lunch' | 'dinner' | 'snacks')}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
                  <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="dinner">Dinner</TabsTrigger>
                  <TabsTrigger value="snacks">Snacks</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Food category display with image */}
          {activeTab !== 'all' && (
            <div className="glass-card p-4 mb-8 rounded-lg flex items-center overflow-hidden">
              <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
                <img 
                  src={getFoodCategoryImage(activeTab)} 
                  alt={foodCategories[activeTab].name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold">{foodCategories[activeTab as FoodCategory].name}</h2>
                <p className="text-sm text-muted-foreground">{foodCategories[activeTab as FoodCategory].description}</p>
              </div>
            </div>
          )}
          
          {/* Display filtered foods */}
          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {foodsWithImages.map(food => (
                <FoodCard 
                  key={food.id} 
                  food={food}
                  mealType={selectedMealType}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No foods found. Try a different search term.</p>
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline">
              <Link to="/meal-planner">Go to Meal Planner</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const Link = ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: any }) => (
  <a href={to} {...props}>{children}</a>
);

export default FoodLibrary;
