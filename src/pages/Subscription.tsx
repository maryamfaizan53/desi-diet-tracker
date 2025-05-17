
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';
import { usePayment, PlanDetails } from '@/context/PaymentContext';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const Subscription = () => {
  const navigate = useNavigate();
  const { plans, selectPlan, selectedPlan, processPayment, isProcessingPayment, paymentError } = usePayment();
  const { user, isAuthenticated } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Payment form state
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });
  
  const handleSelectPlan = (plan: PlanDetails) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to subscribe to a plan.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    selectPlan(plan);
    setShowPaymentForm(plan.price > 0);
    
    if (plan.price === 0) {
      // Basic plan is free, no payment needed
      toast({
        title: "Plan selected",
        description: `You've selected the ${plan.name}.`,
      });
      navigate('/meal-planner');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await processPayment(cardDetails);
    
    if (success && selectedPlan) {
      toast({
        title: "Payment successful",
        description: `You've successfully subscribed to the ${selectedPlan.name}.`,
      });
      navigate('/meal-planner');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Subscription Plans</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your health and nutrition goals.
            </p>
          </div>
          
          {!showPaymentForm ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`glass-card p-6 rounded-xl relative hover:scale-105 transition-transform ${
                    plan.recommended ? 'border-2 border-green-500' : ''
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-1 rotate-12 shadow-lg text-sm font-medium">
                      Recommended
                    </div>
                  )}
                  
                  <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.price > 0 ? 'Subscribe Now' : 'Get Started'}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto glass-effect p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
              
              {selectedPlan && (
                <div className="glass-card p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{selectedPlan.name}</p>
                      <p className="text-sm text-muted-foreground">${selectedPlan.price}/month</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowPaymentForm(false)}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmitPayment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Name on card"
                    value={cardDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="number">Card Number</Label>
                  <Input
                    id="number"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {paymentError && (
                  <div className="bg-red-500/10 text-red-500 p-3 rounded-md text-sm flex items-center gap-2">
                    <X className="w-4 h-4" />
                    {paymentError}
                  </div>
                )}
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? 'Processing...' : `Pay $${selectedPlan?.price}`}
                  </Button>
                </div>
                
                <p className="text-center text-xs text-muted-foreground">
                  Your payment information is secure and encrypted.
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscription;
