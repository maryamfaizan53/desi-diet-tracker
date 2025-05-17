
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      navigate('/meal-planner');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Registration failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await register(registerData.email, registerData.password, registerData.name);
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-effect p-8 rounded-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gradient mb-2">DesiDiet</h1>
          <p className="text-muted-foreground">Track your calories, desi style!</p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(v) => setActiveTab(v as 'login' | 'register')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              
              <div className="text-center">
                <Button variant="link" size="sm" className="text-xs">
                  Forgot password?
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Name</Label>
                <Input
                  id="register-name"
                  name="name"
                  placeholder="Enter your name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Register'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
