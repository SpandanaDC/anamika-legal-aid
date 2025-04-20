
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  colorClass?: string;
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  link,
  colorClass = "from-kanoon-dark-violet to-kanoon-medium-purple"
}: FeatureCardProps) {
  const { translate } = useLanguage();
  
  return (
    <div className="rounded-xl bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="p-6 flex flex-col h-full">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r mb-4", colorClass)}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 font-serif">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Button asChild className="btn-gradient text-white w-full">
          <Link to={link}>Explore</Link>
        </Button>
      </div>
    </div>
  );
}
