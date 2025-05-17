
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isSubscribed: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user for demonstration
const sampleUser: AuthUser = {
  id: '123456',
  email: 'demo@example.com',
  name: 'Demo User',
  isSubscribed: false,
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking authentication status
        const storedUser = localStorage.getItem('desiDietUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo
      if (email && password) {
        setUser(sampleUser);
        localStorage.setItem('desiDietUser', JSON.stringify(sampleUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo
      if (email && password && name) {
        const newUser = { ...sampleUser, email, name };
        setUser(newUser);
        localStorage.setItem('desiDietUser', JSON.stringify(newUser));
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('desiDietUser');
  };
  
  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
