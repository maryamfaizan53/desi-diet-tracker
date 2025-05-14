
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, User, PieChart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="glass-effect fixed top-0 w-full z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gradient font-bold text-2xl">DesiDiet</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" icon={<Home className="w-4 h-4 mr-1" />} label="Home" />
            <NavLink to="/food-library" icon={<Calendar className="w-4 h-4 mr-1" />} label="Food Library" />
            <NavLink to="/meal-planner" icon={<PieChart className="w-4 h-4 mr-1" />} label="Meal Planner" />
            <NavLink to="/profile" icon={<User className="w-4 h-4 mr-1" />} label="Profile" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Menu">
              <Menu />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={cn(
            "md:hidden absolute left-0 right-0 p-4 mt-2 glass-effect transition-all duration-300 ease-in-out", 
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-4 py-2">
            <MobileNavLink to="/" icon={<Home className="w-5 h-5 mr-2" />} label="Home" onClick={toggleMobileMenu} />
            <MobileNavLink to="/food-library" icon={<Calendar className="w-5 h-5 mr-2" />} label="Food Library" onClick={toggleMobileMenu} />
            <MobileNavLink to="/meal-planner" icon={<PieChart className="w-5 h-5 mr-2" />} label="Meal Planner" onClick={toggleMobileMenu} />
            <MobileNavLink to="/profile" icon={<User className="w-5 h-5 mr-2" />} label="Profile" onClick={toggleMobileMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavLink = ({ to, icon, label }: NavLinkProps) => (
  <Link to={to} className="flex items-center text-sm font-medium text-gray-200 hover:text-primary transition-colors">
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, icon, label, onClick }: NavLinkProps) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="flex items-center w-full p-2 rounded-md hover:bg-primary/20 transition-colors text-gray-200"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
