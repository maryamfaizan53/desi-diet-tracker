
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                title="AI Fitness Coach" 
                description="Personalized workout plans and BMI analysis powered by AI."
                imageSrc="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=60"
                imageAlt="AI fitness coaching"
                linkTo="/fitness"
              />
              <FeatureCard 
                title="South Asian Foods" 
                description="Comprehensive database of desi foods with accurate nutrition data."
                imageSrc="https://images.unsplash.com/photo-1695205962564-43ba2b18b075?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNvdXRoJTIwYXNpYW4lMjBmb29kfGVufDB8fDB8fHww"
                imageAlt="South Asian food variety"
                linkTo="/food-library"
              />
              <FeatureCard 
                title="Healthy Recipes" 
                description="AI-curated recipes for weight loss, gain, and balanced nutrition."
                imageSrc="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=60"
                imageAlt="Healthy recipe suggestions"
                linkTo="/fitness"
              />
              <FeatureCard 
                title="Progress Tracking" 
                description="Monitor calories, workouts, and achievements in real-time."
                imageSrc="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=60"
                imageAlt="Fitness progress tracking"
                linkTo="/fitness"
              />
            </div>
            
            <div className="mt-12 text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/fitness">
                    Start AI Fitness Journey <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/food-library">
                    Explore Food Library <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 glass-effect relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              <img 
                src="https://media.istockphoto.com/id/2158539574/photo/kind-beautiful-woman-eating-a-healthy-fruit-bowl-while-sitting-on-the-table-in-the-kitchen-at.jpg?s=612x612&w=0&k=20&c=ZqFvECI1BcKV3OR9nUX86jukn8hgXHm0SYfI_Ozk4Hc=" 
                alt="Background texture" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">
                Your AI-Powered <span className="text-gradient">Health Journey</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Get personalized fitness coaching, BMI analysis, healthy recipes, and workout plans 
                tailored specifically to your goals and South Asian lifestyle.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="default">
                  <Link to="/fitness">Try AI Fitness Coach</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/profile">Create Profile</Link>
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
  imageSrc?: string;
  imageAlt?: string;
  linkTo?: string;
}

const FeatureCard = ({ title, description, imageSrc, imageAlt, linkTo }: FeatureCardProps) => {
  const CardContent = (
    <div className="glass-card overflow-hidden rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer">
      {imageSrc && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={imageAlt || title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );

  return linkTo ? (
    <Link to={linkTo}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default Index;
