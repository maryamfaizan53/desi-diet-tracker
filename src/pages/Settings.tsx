
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Download, FileText, Database, RefreshCw, Moon, Sun, Trash2, CreditCard } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useMeal } from '@/context/MealContext';

const Settings = () => {
  const { userProfile } = useUser();
  const { clearAllMeals } = useMeal();
  const [darkMode, setDarkMode] = useState(true);
  
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // In a real implementation, this would toggle the theme in a ThemeContext
    toast({
      title: `${!darkMode ? 'Dark' : 'Light'} theme activated`,
      description: `You've switched to ${!darkMode ? 'dark' : 'light'} mode.`,
    });
  };
  
  const handleExportData = () => {
    // This would generate and download a JSON or PDF of the user's data
    toast({
      title: "Data exported",
      description: "Your meal plan data has been exported successfully.",
    });
  };
  
  const handleResetData = () => {
    clearAllMeals();
    toast({
      title: "Data reset",
      description: "Your meal plan data has been reset successfully.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto max-w-3xl">
          <div className="glass-effect p-8 rounded-xl">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            
            <div className="space-y-8">
              {/* Theme Settings */}
              <div className="glass-card p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <Label htmlFor="theme-toggle">Dark Mode</Label>
                  </div>
                  <Switch 
                    id="theme-toggle" 
                    checked={darkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
              </div>
              
              {/* Data Management */}
              <div className="glass-card p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Data Management</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      <span>Export Meal Plans as PDF</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleExportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      <span>Export Data as JSON</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleExportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5" />
                      <span>Sync with Cloud</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-5 h-5 text-red-500" />
                      <span className="text-red-500">Reset All Data</span>
                    </div>
                    <Button size="sm" variant="destructive" onClick={handleResetData}>
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Subscription Settings */}
              <div className="glass-card p-5 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Subscription</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Current Plan</span>
                    </div>
                    <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                      Free Plan
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upgrade to premium for personalized recipe suggestions, unlimited meal history, and more.
                    </p>
                    <Button asChild>
                      <Link to="/subscription">View Plans</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Account Settings */}
              {userProfile && (
                <div className="glass-card p-5 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Account</h2>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span>{userProfile.name}@example.com</span>
                    </div>
                    
                    <Button asChild variant="outline">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
