
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MealProvider } from "./context/MealContext";
import { UserProvider } from "./context/UserContext";
import { PaymentProvider } from "./context/PaymentContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import FoodLibrary from "./pages/FoodLibrary";
import MealPlanner from "./pages/MealPlanner";
import Profile from "./pages/Profile";
import Fitness from "./pages/Fitness";
import Settings from "./pages/Settings";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <PaymentProvider>
          <MealProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/food-library" element={<FoodLibrary />} />
                  <Route path="/meal-planner" element={<MealPlanner />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/fitness" element={<Fitness />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </MealProvider>
        </PaymentProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
