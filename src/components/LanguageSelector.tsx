
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage();
  
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'हिन्दी' },
    { value: 'kannada', label: 'ಕನ್ನಡ' },
    { value: 'tamil', label: 'தமிழ்' },
    { value: 'telugu', label: 'తెలుగు' },
    { value: 'bengali', label: 'বাংলা' },
    { value: 'marathi', label: 'मराठी' }
  ];

  return (
    <Select
      value={currentLanguage}
      onValueChange={(value) => setLanguage(value as any)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              {language.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
