
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SubscriptionCardProps {
  type: 'basic' | 'premium' | 'elite';
  price: string;
  features: string[];
  isPopular?: boolean;
}

export function SubscriptionCard({ 
  type, 
  price, 
  features,
  isPopular = false 
}: SubscriptionCardProps) {
  const { translate } = useLanguage();
  
  const getTitle = () => {
    switch (type) {
      case 'basic':
        return translate('basicPlan');
      case 'premium':
        return translate('premiumPlan');
      case 'elite':
        return translate('elitePlan');
      default:
        return type;
    }
  };

  const getGradientClass = () => {
    switch (type) {
      case 'basic':
        return 'from-white/90 to-kanoon-light-pink/20';
      case 'premium':
        return 'from-white/90 to-kanoon-soft-pink/30';
      case 'elite':
        return 'from-white/90 to-kanoon-lighter-purple/20';
      default:
        return 'from-white/90 to-kanoon-light-pink/20';
    }
  };
  
  const getBorderClass = () => {
    if (isPopular) {
      return 'border-2 border-kanoon-medium-purple';
    }
    return 'border border-gray-200';
  };

  return (
    <div 
      className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl relative ${getBorderClass()}`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0 bg-kanoon-medium-purple text-white px-4 py-1 text-sm rounded-bl-lg font-medium">
          Popular
        </div>
      )}
      <div className={`p-6 bg-gradient-to-br ${getGradientClass()} h-full flex flex-col`}>
        <h3 className="text-xl font-bold mb-2 font-serif">{getTitle()}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full btn-gradient text-white mt-auto">
          {translate('purchase')}
        </Button>
      </div>
    </div>
  );
}
