
import React, { createContext, useContext, useState } from 'react';

// Define payment types
export interface PlanDetails {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface DummyCardDetails {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
}

interface PaymentContextType {
  selectedPlan: PlanDetails | null;
  isProcessingPayment: boolean;
  paymentError: string | null;
  plans: PlanDetails[];
  userSubscription: PlanDetails | null;
  selectPlan: (plan: PlanDetails) => void;
  processPayment: (cardDetails: DummyCardDetails) => Promise<boolean>;
  clearPaymentError: () => void;
  cancelSubscription: () => void;
}

// Create context with default values
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Available subscription plans
const subscriptionPlans: PlanDetails[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 0,
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
    features: [
      'Everything in Basic Plan',
      'Personalized recipe suggestions',
      'Unlimited meal history',
      'Progress graphs and insights'
    ],
    recommended: true
  },
  {
    id: 'pro',
    name: 'Professional Plan',
    price: 19.99,
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
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [userSubscription, setUserSubscription] = useState<PlanDetails | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const selectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setPaymentError(null);
  };
  
  const processPayment = async (cardDetails: DummyCardDetails): Promise<boolean> => {
    if (!selectedPlan) {
      setPaymentError('No plan selected');
      return false;
    }
    
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // Simulate payment processing API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, simulate success for valid cards (starts with '4' like Visa)
      const isValidCard = cardDetails.number?.length === 16 && cardDetails.number.startsWith('4');
      
      if (!isValidCard) {
        setPaymentError('Invalid card details. Use a 16-digit number starting with 4.');
        return false;
      }
      
      // Set the subscription
      setUserSubscription(selectedPlan);
      
      // Save subscription to localStorage for persistence
      localStorage.setItem('desiDietSubscription', JSON.stringify({
        planId: selectedPlan.id,
        startDate: new Date().toISOString(),
        // Set expiry to 30 days from now
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }));
      
      return true;
    } catch (error) {
      setPaymentError('Payment processing error');
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  const cancelSubscription = () => {
    setUserSubscription(null);
    localStorage.removeItem('desiDietSubscription');
  };
  
  const clearPaymentError = () => {
    setPaymentError(null);
  };
  
  // Load subscription from localStorage on component mount
  React.useEffect(() => {
    const savedSubscription = localStorage.getItem('desiDietSubscription');
    if (savedSubscription) {
      try {
        const { planId, expiryDate } = JSON.parse(savedSubscription);
        
        // Check if subscription is expired
        if (new Date(expiryDate) > new Date()) {
          const plan = subscriptionPlans.find(p => p.id === planId);
          if (plan) {
            setUserSubscription(plan);
          }
        } else {
          // Clear expired subscription
          localStorage.removeItem('desiDietSubscription');
        }
      } catch (error) {
        console.error('Error loading subscription from localStorage', error);
      }
    }
  }, []);
  
  // Context value
  const value = {
    selectedPlan,
    isProcessingPayment,
    paymentError,
    plans: subscriptionPlans,
    userSubscription,
    selectPlan,
    processPayment,
    clearPaymentError,
    cancelSubscription
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
