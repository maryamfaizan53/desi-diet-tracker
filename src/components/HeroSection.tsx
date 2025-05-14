
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-background to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center text-center py-20 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Track Calories, <span className="text-gradient">Desi Style!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Plan and track your meals with South Asian foods like Roti, Daal, Paratha, and more.
            Achieve your health goals without giving up the flavors you love.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/food-library">
                Start Tracking <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/profile">
                Create Profile
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            <FeatureCard 
              title="100+ Desi Foods" 
              description="Comprehensive library of South Asian cuisine"
            />
            <FeatureCard 
              title="Meal Planning" 
              description="Create balanced meals that match your goals"
            />
            <FeatureCard 
              title="Track Progress" 
              description="Monitor your calorie intake and achievements"
            />
            <FeatureCard 
              title="Custom Goals" 
              description="Personalized plans for your health journey"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="glass-card p-6 rounded-xl animate-scale-in">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default HeroSection;
