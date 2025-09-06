
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

// Define payment types
export interface PlanDetails {
  id: string;
  name: string;
  price: number;
  priceId: string;
  features: string[];
  recommended?: boolean;
}

interface PaymentContextType {
  selectedPlan: PlanDetails | null;
  isProcessingPayment: boolean;
  paymentError: string | null;
  plans: PlanDetails[];
  userSubscription: PlanDetails | null;
  subscriptionData: any;
  selectPlan: (plan: PlanDetails) => void;
  processPayment: () => Promise<boolean>;
  clearPaymentError: () => void;
  cancelSubscription: () => Promise<void>;
  checkSubscription: () => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

// Create context with default values
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Available subscription plans with Stripe price IDs
const subscriptionPlans: PlanDetails[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 0,
    priceId: '', // Free plan doesn't need price ID
    features: [
      'Track daily meals',
      'Basic food library',
      'Calorie tracking'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 9.99,
    priceId: 'price_1QXCcYBhRcDEm2W97s7dZd7X', // Replace with your actual Stripe price ID
    features: [
      'Everything in Basic Plan',
      'Personalized recipe suggestions',
      'Unlimited meal history',
      'Progress graphs and insights'
    ],
    recommended: true
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    price: 19.99,
    priceId: 'price_1QXCdZBhRcDEm2W9JhKjN8xP', // Replace with your actual Stripe price ID
    features: [
      'Everything in Premium Plan',
      'Nutritionist consultations',
      'Custom meal planning',
      'Priority support'
    ]
  }
];

// Provider component
export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [userSubscription, setUserSubscription] = useState<PlanDetails | null>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const selectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setPaymentError(null);
  };
  
  const processPayment = async (): Promise<boolean> => {
    if (!selectedPlan || !user) {
      setPaymentError('Please select a plan and login first');
      return false;
    }
    
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: selectedPlan.priceId,
          planName: selectedPlan.name
        }
      });

      if (error) {
        setPaymentError(error.message);
        return false;
      }

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.open(data.url, '_blank');
        return true;
      }
      
      return false;
    } catch (error: any) {
      setPaymentError(error.message || 'Payment processing error');
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (!error && data) {
        setSubscriptionData(data);
        
        if (data.subscribed && data.subscription_tier) {
          const plan = subscriptionPlans.find(p => 
            p.name.toLowerCase().includes(data.subscription_tier.toLowerCase())
          );
          setUserSubscription(plan || null);
        } else {
          setUserSubscription(null);
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const openCustomerPortal = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        setPaymentError(error.message);
        return;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      setPaymentError(error.message || 'Error opening customer portal');
    }
  };
  
  const cancelSubscription = async () => {
    await openCustomerPortal();
  };
  
  const clearPaymentError = () => {
    setPaymentError(null);
  };
  
  // Check subscription when user logs in
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setUserSubscription(null);
      setSubscriptionData(null);
    }
  }, [user]);
  
  // Context value
  const value = {
    selectedPlan,
    isProcessingPayment,
    paymentError,
    plans: subscriptionPlans,
    userSubscription,
    subscriptionData,
    selectPlan,
    processPayment,
    clearPaymentError,
    cancelSubscription,
    checkSubscription,
    openCustomerPortal
  };
  
  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

// Hook to use the payment context
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};
