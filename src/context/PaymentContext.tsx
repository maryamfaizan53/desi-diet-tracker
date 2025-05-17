
import React, { createContext, useContext, useState } from 'react';

// Define payment types
export interface PlanDetails {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface PaymentContextType {
  selectedPlan: PlanDetails | null;
  isProcessingPayment: boolean;
  paymentError: string | null;
  plans: PlanDetails[];
  selectPlan: (plan: PlanDetails) => void;
  processPayment: (cardDetails: any) => Promise<boolean>;
  clearPaymentError: () => void;
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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const selectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setPaymentError(null);
  };
  
  const processPayment = async (cardDetails: any): Promise<boolean> => {
    if (!selectedPlan) {
      setPaymentError('No plan selected');
      return false;
    }
    
    setIsProcessingPayment(true);
    setPaymentError(null);
    
    try {
      // Simulate payment processing API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, simulate success for valid cards
      const isValidCard = cardDetails.number?.length === 16;
      
      if (!isValidCard) {
        setPaymentError('Invalid card details');
        return false;
      }
      
      return true;
    } catch (error) {
      setPaymentError('Payment processing error');
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  const clearPaymentError = () => {
    setPaymentError(null);
  };
  
  // Context value
  const value = {
    selectedPlan,
    isProcessingPayment,
    paymentError,
    plans: subscriptionPlans,
    selectPlan,
    processPayment,
    clearPaymentError
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
