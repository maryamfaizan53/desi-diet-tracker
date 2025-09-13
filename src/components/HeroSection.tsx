import React, { useEffect } from 'react';
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
          
          {/* Auto-Moving Health & Fitness Carousel */}
          <div className="w-full max-w-5xl mx-auto mb-10">
            <AutoCarousel />
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

          
          
          {/* Features Grid */}
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

const AutoCarousel = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = React.useState<any>();

  useEffect(() => {
    if (!api) return;

    const autoplay = () => {
      api.scrollNext();
    };

    const interval = setInterval(autoplay, 3000);

    const handlePointerDown = () => clearInterval(interval);
    const handlePointerUp = () => {
      clearInterval(interval);
      setTimeout(() => {
        const newInterval = setInterval(autoplay, 3000);
      }, 1000);
    };

    const container = api.containerNode();
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerup', handlePointerUp);

    return () => {
      clearInterval(interval);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerup', handlePointerUp);
    };
  }, [api]);

  const healthCategories = [
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "AI Fitness Coach",
      description: "Smart workout planning"
    },
    {
      image: "https://media.istockphoto.com/id/1480239160/photo/an-analyst-uses-a-computer-and-dashboard-for-data-business-analysis-and-data-management.jpg?s=612x612&w=0&k=20&c=Zng3q0-BD8rEl0r6ZYZY0fbt2AWO9q_gC8lSrwCIgdk=",
      title: "Health Analytics",
      description: "BMI & progress tracking"
    },
    {
      image: "https://media.istockphoto.com/id/1331919924/photo/technology-makes-life-so-much-easier-for-young-asian-woman-using-mobile-app-device-on.jpg?s=612x612&w=0&k=20&c=8MFgliNHfNLWxUjpZWcNtSs4dndEYQEU491ll5WF0_s=",
      title: "Smart Nutrition",
      description: "Personalized meal plans"
    },
    {
      image: "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Workout Plans",
      description: "Custom exercise routines"
    },
    {
      image: "https://media.istockphoto.com/id/2070585218/photo/happy-smiling-face-mental-health-concept-positive-thinking-and-attitude-emotion-support-and.jpg?s=612x612&w=0&k=20&c=3bdrVxMevqYk6yK7qFLZiWqNN9eGUwK0mcnv62eKgxw=",
      title: "Mental Wellness",
      description: "Meditation & mindfulness"
    },
    {
      image: "https://media.istockphoto.com/id/2211457357/photo/smartwatch-for-sleeping-tracking.webp?a=1&b=1&s=612x612&w=0&k=20&c=-lW_9CWBtmWzUPtMyTcuuxEC92Ckp7Cj1xHilld2Lso=",
      title: "Sleep Tracking",
      description: "Rest optimization"
    },
    {
      image: "https://media.istockphoto.com/id/2209325680/photo/investor-reviewing-real-time-financial-performance-pie-charts-and-investment-metrics-using.jpg?s=612x612&w=0&k=20&c=-akDXWHAm-lKnne22_oT5-b59XlbNcNUyu2TZuH-gIs=",
      title: "Progress Monitor",
      description: "Achievement tracking"
    },
    {
      image: "https://media.istockphoto.com/id/2213560189/photo/man-tracking-daily-water-intake-using-a-mobile-app.jpg?s=612x612&w=0&k=20&c=jfvmzS0XOrX8lPiRddrKbaCw8eUxreKkre5bWnMgKnY=",
      title: "Hydration Goals",
      description: "Water intake tracking"
    }
  ];

  return (
    <Carousel 
      setApi={setApi}
      className="w-full" 
      opts={{ 
        align: "start", 
        loop: true 
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {healthCategories.map((category, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <div className="overflow-hidden rounded-xl shadow-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-500 hover:shadow-primary/20 relative group">
                <img 
                  src={category.image}
                  alt={category.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{category.description}</p>
                </div>
              </div>
              <p className="text-sm text-center mt-3 text-muted-foreground font-medium">{category.title}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-background/80 backdrop-blur-sm border-white/20 hover:bg-primary/20" />
      <CarouselNext className="right-2 bg-background/80 backdrop-blur-sm border-white/20 hover:bg-primary/20" />
    </Carousel>
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