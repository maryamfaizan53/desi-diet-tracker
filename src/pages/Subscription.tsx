
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X, Star, Clock, CreditCard, Calendar, Shield } from 'lucide-react';
import { usePayment, PlanDetails } from '@/context/PaymentContext';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

const Subscription = () => {
  const navigate = useNavigate();
  const { plans, selectPlan, selectedPlan, processPayment, 
          isProcessingPayment, paymentError, userSubscription, cancelSubscription } = usePayment();
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
      toast("Authentication required", {
        description: "Please login to subscribe to a plan.",
      });
      navigate('/auth');
      return;
    }
    
    selectPlan(plan);
    setShowPaymentForm(plan.price > 0);
    
    if (plan.price === 0) {
      // Basic plan is free, no payment needed
      processPayment().then(success => {
        if (success) {
          toast("Plan selected", {
            description: `You've selected the ${plan.name}.`,
          });
          navigate('/meal-planner');
        }
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await processPayment();
      if (success) {
        toast("Payment Initiated", {
          description: "You've been redirected to Stripe. Complete the payment to activate your subscription.",
        });
        setShowPaymentForm(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast("Payment Error", {
        description: "There was an error processing your payment. Please try again.",
      });
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription();
      toast("Redirected to Customer Portal", {
        description: "You can manage your subscription in the Stripe Customer Portal.",
      });
    } catch (error) {
      toast("Error", {
        description: "There was an error opening the customer portal.",
      });
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

          {userSubscription && !showPaymentForm && (
            <div className="max-w-md mx-auto glass-effect p-6 rounded-xl mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <h2 className="text-2xl font-semibold">Current Subscription</h2>
                    <Badge className="ml-2 bg-green-500">Active</Badge>
                  </div>
                  <p className="text-lg font-medium">{userSubscription.name}</p>
                  <p className="text-muted-foreground">${userSubscription.price}/month</p>
                  
                  <div className="mt-4 space-y-2">
                    {userSubscription.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={handleCancelSubscription} variant="destructive" className="w-full">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          )}
          
          {!showPaymentForm ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`glass-card p-6 rounded-xl relative hover:scale-105 transition-transform ${
                    plan.recommended ? 'border-2 border-green-500' : ''
                  } ${userSubscription?.id === plan.id ? 'border-2 border-blue-500' : ''}`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white px-4 py-1 rotate-12 shadow-lg text-sm font-medium z-10">
                      Recommended
                    </div>
                  )}
                  {userSubscription?.id === plan.id && (
                    <div className="absolute -top-3 -left-3 bg-blue-500 text-white px-4 py-1 -rotate-12 shadow-lg text-sm font-medium z-10">
                      Current Plan
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{plan.name}</h2>
                    {plan.id === 'premium' && <Star className="h-5 w-5 text-yellow-400" />}
                    {plan.id === 'pro' && <Shield className="h-5 w-5 text-purple-500" />}
                  </div>
                  
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
                    disabled={userSubscription?.id === plan.id}
                  >
                    {userSubscription?.id === plan.id ? 'Current Plan' : (plan.price > 0 ? 'Subscribe Now' : 'Get Started')}
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
                  <div className="relative">
                    <Input
                      id="number"
                      name="number"
                      placeholder="4111 1111 1111 1111"
                      value={cardDetails.number}
                      onChange={handleInputChange}
                      required
                    />
                    <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">This will redirect you to Stripe Checkout to complete payment securely</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <div className="relative">
                      <Input
                        id="expiry"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleInputChange}
                        required
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
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
                    {isProcessingPayment ? 'Processing...' : `Subscribe to ${selectedPlan?.name}`}
                  </Button>
                </div>
                
                <div className="pt-2 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <p>Your payment information is secure and encrypted.</p>
                </div>
              </form>
            </div>
          )}

          {/* <div className="max-w-2xl mx-auto mt-16 p-6 border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sample Python Object-Oriented Principles</h2>
            <p className="mb-3 text-muted-foreground">
              Below is a representation of how this application would implement subscription plans using Python OOP.
              (This is just for demonstration as Python can't be directly used in this React app)
            </p>
            <div className="bg-muted p-4 rounded-md overflow-auto text-left">
              <pre className="text-xs">
{`# Python OOP Principles (Representational Only)

class Plan:
    def __init__(self, id, name, price, features):
        self.id = id
        self.name = name
        self.price = price
        self.features = features
        
    def is_free(self):
        return self.price == 0
        
    def __str__(self):
        return f"{self.name} (${self.price}/month)"


class Subscription:
    def __init__(self, user, plan, start_date):
        self.user = user
        self.plan = plan
        self.start_date = start_date
        self.active = True
        
    def cancel(self):
        self.active = False
        
    def is_active(self):
        return self.active
        
    def days_remaining(self):
        # Calculate days remaining in subscription
        pass


class PaymentProcessor:
    @staticmethod
    def process_payment(card_details, amount):
        # Validate card
        if card_details.number.startswith('4') and len(card_details.number) == 16:
            return True
        return False


class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.subscription = None
        
    def subscribe(self, plan, payment_details):
        payment_successful = PaymentProcessor.process_payment(payment_details, plan.price)
        if payment_successful:
            self.subscription = Subscription(self, plan, datetime.now())
            return True
        return False
        
    def has_access_to_feature(self, feature_name):
        if not self.subscription or not self.subscription.is_active():
            return False
        return feature_name in self.subscription.plan.features


# Usage example
basic_plan = Plan("basic", "Basic Plan", 0, ["Track daily meals", "Basic food library"])
premium_plan = Plan("premium", "Premium Plan", 9.99, ["Unlimited meals", "Recipe suggestions"])

user = User("John Doe", "john@example.com")
card = CardDetails("John Doe", "4111111111111111", "12/25", "123")

if user.subscribe(premium_plan, card):
    print("Subscription successful!")
    
if user.has_access_to_feature("Recipe suggestions"):
    print("User can access recipe suggestions")
`}
              </pre>
            </div>
          </div> */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscription;
