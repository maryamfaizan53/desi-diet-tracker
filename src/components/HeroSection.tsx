
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
            Your AI-Powered <span className="text-gradient">Health Coach</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Experience personalized fitness coaching, BMI analysis, and nutrition guidance powered by advanced AI.
            Get custom workout plans, healthy recipes, and real-time health insights tailored to your unique goals.
          </p>
          
          {/* Enhanced Health & Fitness Carousel */}
          <div className="w-full max-w-4xl mx-auto mb-10">
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl shadow-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-primary/20">
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="AI-Powered Fitness Coaching" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm text-center mt-3 text-muted-foreground font-medium">AI Fitness Coaching</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl shadow-2xl transform hover:scale-110 hover:-rotate-1 transition-all duration-500 hover:shadow-accent/20">
                      <img 
                        src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Health Analytics and BMI Tracking" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm text-center mt-3 text-muted-foreground font-medium">Health Analytics</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl shadow-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-primary/20">
                      <img 
                        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Personalized Nutrition Planning" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm text-center mt-3 text-muted-foreground font-medium">Smart Nutrition</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-xl shadow-2xl transform hover:scale-110 hover:-rotate-1 transition-all duration-500 hover:shadow-accent/20">
                      <img 
                        src="https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Custom Workout Plans" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm text-center mt-3 text-muted-foreground font-medium">Custom Workouts</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm border-white/20 hover:bg-primary/20" />
              <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm border-white/20 hover:bg-primary/20" />
            </Carousel>
          </div>
          
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
              title="AI Health Analysis" 
              description="Get personalized BMI insights and health recommendations"
              iconClass="animate-float"
            />
            <FeatureCard 
              title="Smart Workouts" 
              description="AI-generated workout plans based on your fitness level"
              iconClass="animate-pulse-glow"
            />
            <FeatureCard 
              title="Nutrition AI" 
              description="Intelligent meal planning with South Asian cuisine"
              iconClass="animate-float"
            />
            <FeatureCard 
              title="Progress Tracking" 
              description="Real-time analytics and goal achievement monitoring"
              iconClass="animate-pulse-glow"
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
  iconClass?: string;
}

const FeatureCard = ({ title, description, iconClass }: FeatureCardProps) => (
  <div className="glass-card p-6 rounded-xl animate-scale-in relative overflow-hidden">
    <div className={`absolute -top-1 -right-1 w-12 h-12 bg-primary/30 rounded-full ${iconClass || ""}`}></div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default HeroSection;
