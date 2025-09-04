
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Food Library', path: '/food-library' },
    { label: 'Meal Planner', path: '/meal-planner' },
    { label: 'Fitness Hub', path: '/fitness' },
    { label: 'Settings', path: '/settings' },
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-black/40 shadow-lg' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gradient">
            DesiDiet
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Button
                key={link.path}
                variant={isActive(link.path) ? "default" : "ghost"}
                asChild
              >
                <Link to={link.path}>
                  {link.label}
                </Link>
              </Button>
            ))}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/subscription">Subscription</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" asChild>
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            <Menu />
          </Button>
        </div>
        
        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <Button
                  key={link.path}
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link to={link.path}>
                    {link.label}
                  </Link>
                </Button>
              ))}
              
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/profile">My Profile</Link>
                  </Button>
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/subscription">Subscription</Link>
                  </Button>
                  <Button variant="destructive" className="justify-start" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="default" className="justify-start" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
