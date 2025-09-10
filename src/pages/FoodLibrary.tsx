
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
    vegetables: "https://media.istockphoto.com/id/1483238954/photo/wooden-crate-filled-with-fresh-organic-vegetables.webp?a=1&b=1&s=612x612&w=0&k=20&c=L6j8s-0SBwXIW6iBaX2_svpRp_KlleHT1eJFF87CaPE=",
    lentils: "https://images.unsplash.com/photo-1599579085809-4edbc35cee01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D",
    meat: "https://images.unsplash.com/photo-1723893905879-0e309c2a8e06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lYXR8ZW58MHx8MHx8fDA%3D",
    carbs: "https://media.istockphoto.com/id/1067113342/photo/healthy-products-sources-of-carbohydrates.webp?a=1&b=1&s=612x612&w=0&k=20&c=5_U5-rB1WNpYWmK47xJc40cxsnzSIhA2DH9Na91ejsw=",
    protein: "https://media.istockphoto.com/id/1457411409/photo/food-rich-in-healthy-proteins.webp?a=1&b=1&s=612x612&w=0&k=20&c=J9kJtE_Ym8rczbLz3P54suAVOYnTOxJbqypW2jvDNuU=",
    beverages: "https://images.unsplash.com/photo-1631308492942-3a713d7fd02e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJldmVyYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    sweets: "https://media.istockphoto.com/id/1054228718/photo/indian-sweets-in-a-plate-includes-gulab-jamun-rasgulla-kaju-katli-morichoor-bundi-laddu.webp?a=1&b=1&s=612x612&w=0&k=20&c=i_eG_hiRCHa1evPiSHYauXWHVSQ5LZ893QrdAlKB_vE="
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
            <h1 className="text-3xl font-bold mb-4">AI Food Library</h1>
            <p className="text-muted-foreground mb-6">
              Discover South Asian foods with AI-powered nutrition insights and personalized recommendations.
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
              <div className="h-46 w-16 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
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

const Link = ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]:React.ReactNode}) => (
  <a href={to} {...props}>{children}</a>
);

export default FoodLibrary;
