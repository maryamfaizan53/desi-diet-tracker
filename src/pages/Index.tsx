
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
              <h2 className="text-3xl font-bold mb-4">AI-Powered <span className="text-gradient">Health Intelligence</span></h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced artificial intelligence analyzes your health data to provide personalized recommendations, 
                custom workout plans, and nutrition guidance tailored to your unique needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                title="AI Health Analysis" 
                description="Advanced BMI analysis with personalized health insights and risk assessment."
                imageSrc="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format&fit=crop&q=60"
                imageAlt="AI health analysis dashboard"
                linkTo="/fitness"
              />
              <FeatureCard 
                title="Smart Nutrition AI" 
                description="Intelligent meal planning with South Asian cuisine and macro tracking."
                imageSrc="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=60"
                imageAlt="AI nutrition planning"
                linkTo="/food-library"
              />
              <FeatureCard 
                title="Personalized Workouts" 
                description="AI-generated exercise routines adapted to your fitness level and goals."
                imageSrc="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=60"
                imageAlt="AI workout generation"
                linkTo="/fitness"
              />
              <FeatureCard 
                title="Intelligent Tracking" 
                description="Real-time progress monitoring with predictive analytics and insights."
                imageSrc="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop&q=60"
                imageAlt="AI progress tracking"
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
