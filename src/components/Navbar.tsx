import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User, HelpCircle, LogOut } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { translate } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full py-4 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-serif font-bold gradient-text">Kanoon Vistar</h1>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => navigate('/profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>{translate('profile')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>{translate('help')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{translate('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link to="/login">{translate('login')}</Link>
                </Button>
                <Button className="btn-gradient text-white" asChild>
                  <Link to="/register">{translate('register')}</Link>
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 bg-white shadow-md z-50 p-4">
          <div className="flex flex-col gap-2">
            <LanguageSelector />
            
            {isAuthenticated ? (
              <>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{translate('profile')}</span>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>{translate('help')}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{translate('logout')}</span>
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">{translate('login')}</Link>
                </Button>
                <Button className="btn-gradient text-white w-full" asChild>
                  <Link to="/register">{translate('register')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
