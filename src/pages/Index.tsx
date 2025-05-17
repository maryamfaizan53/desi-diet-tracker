
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
                imageSrc="https://images.unsplash.com/photo-1695205962564-43ba2b18b075?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNvdXRoJTIwYXNpYW4lMjBmb29kfGVufDB8fDB8fHww"
                imageAlt="South Asian food variety"
              />
              <FeatureCard 
                title="Personalized Goals" 
                description="Set weight loss, maintenance or gain targets tailored to you."
                imageSrc="https://media.istockphoto.com/id/2075354173/photo/fitness-couple-is-doing-kettlebell-twist-in-a-gym-togehter.jpg?s=612x612&w=0&k=20&c=lfs1V1d0YB33tn72myi6FElJnylPJYYM9lW5ZhlnYqY="
                imageAlt="Personalized nutrition planning"
              />
              <FeatureCard 
                title="Meal Planner" 
                description="Plan your daily meals to meet your nutritional targets."
                imageSrc="https://plus.unsplash.com/premium_photo-1664910003783-43edbeb8163b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoJTIwZ29hbHMlMjBkaWV0fGVufDB8fDB8fHww"
                imageAlt="Meal planning and preparation"
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
  imageSrc?: string;
  imageAlt?: string;
}

const FeatureCard = ({ title, description, imageSrc, imageAlt }: FeatureCardProps) => (
  <div className="glass-card overflow-hidden rounded-xl transition-all duration-200 hover:scale-105">
    {imageSrc && (
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={imageAlt || title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Index;
