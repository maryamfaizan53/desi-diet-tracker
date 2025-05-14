
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <HeroSection />
        
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Plan Your Meals, <span className="text-gradient">Desi Style</span></h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Accurate calorie tracking with all your favorite South Asian dishes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Track South Asian Foods" 
                description="Comprehensive database of desi foods with accurate nutritional information."
              />
              <FeatureCard 
                title="Personalized Goals" 
                description="Set weight loss, maintenance or gain targets tailored to you."
              />
              <FeatureCard 
                title="Meal Planner" 
                description="Plan your daily meals to meet your nutritional targets."
              />
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/food-library">
                  Explore Food Library <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-12 glass-effect">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Get Started Today</h2>
              <p className="text-muted-foreground mb-8">
                Create your profile, set your goals, and start planning your meals with DesiDiet.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="default">
                  <Link to="/profile">Create Profile</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/food-library">Browse Foods</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="glass-card p-6 rounded-xl transition-all duration-200 hover:scale-105">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
