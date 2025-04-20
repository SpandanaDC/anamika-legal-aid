
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  Globe, 
  FileText, 
  Bell, 
  History, 
  CreditCard,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Dashboard({ isOpen, onClose }: DashboardProps) {
  const { user } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: <User className="h-5 w-5" />, 
      label: translate('profile'), 
      onClick: () => navigate('/profile') 
    },
    { 
      icon: <Globe className="h-5 w-5" />, 
      label: translate('language'), 
      component: <LanguageSelector /> 
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      label: translate('notes'), 
      onClick: () => navigate('/notes') 
    },
    { 
      icon: <Bell className="h-5 w-5" />, 
      label: translate('caseUpdates'), 
      onClick: () => navigate('/case-updates') 
    },
    { 
      icon: <History className="h-5 w-5" />, 
      label: translate('history'), 
      onClick: () => navigate('/history') 
    },
    { 
      icon: <CreditCard className="h-5 w-5" />, 
      label: translate('subscription'), 
      onClick: () => navigate('/subscription') 
    },
  ];

  return (
    <div className={`fixed inset-y-0 right-0 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold gradient-text">Dashboard</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {user && (
          <div className="mb-6 flex items-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        )}
        
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.component ? (
                <div className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                  <div className="ml-auto">{item.component}</div>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={item.onClick}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
