
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMealTargets } from '@/data/foodData';

// Define user profile types
export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  goal: 'lose' | 'maintain' | 'gain';
  calorieTarget: number;
}

interface UserContextType {
  userProfile: UserProfile | null;
  isProfileComplete: boolean;
  updateUserProfile: (profile: UserProfile) => void;
  calculateCalorieTarget: (weight: number, goal: string) => number;
}

// Create context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Default user profile
const defaultUserProfile: UserProfile = {
  name: '',
  age: 30,
  weight: 70,
  height: 170,
  gender: 'male',
  goal: 'maintain',
  calorieTarget: 1800,
};

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load stored profile from localStorage
  const loadStoredProfile = (): UserProfile | null => {
    if (typeof window === 'undefined') {
      return null;
    }
    
    const storedProfile = localStorage.getItem('desiDietUserProfile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  };
  
  const [userProfile, setUserProfile] = useState<UserProfile | null>(loadStoredProfile);
  
  // Check if profile is complete
  const isProfileComplete = !!userProfile && userProfile.name !== '';
  
  // Calculate calorie target based on weight and goal
  const calculateCalorieTarget = (weight: number, goalType: string): number => {
    return getMealTargets(goalType, weight);
  };
  
  // Update user profile
  const updateUserProfile = (profile: UserProfile) => {
    const updatedProfile = {
      ...profile,
      calorieTarget: calculateCalorieTarget(profile.weight, profile.goal)
    };
    
    setUserProfile(updatedProfile);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('desiDietUserProfile', JSON.stringify(updatedProfile));
    }
  };
  
  // Context value
  const value = {
    userProfile,
    isProfileComplete,
    updateUserProfile,
    calculateCalorieTarget
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
