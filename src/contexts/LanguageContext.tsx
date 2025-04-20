
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'english' | 'hindi' | 'kannada' | 'tamil' | 'telugu' | 'bengali' | 'marathi';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  english: {
    welcome: 'Welcome to Kanoon Vistar',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    age: 'Age',
    confirmPassword: 'Confirm Password',
    educateYourself: 'Educate Yourself',
    seniorCitizenHelp: 'Senior Citizen Help',
    legalAid: 'Legal Aid',
    anamika: 'Anamika',
    basicPlan: 'Basic',
    premiumPlan: 'Premium',
    elitePlan: 'Elite',
    purchase: 'Purchase',
    logout: 'Logout',
    profile: 'Profile',
    help: 'Help',
    subscription: 'Subscription',
  },
  hindi: {
    welcome: 'कानून विस्तार में आपका स्वागत है',
    login: 'लॉगिन',
    register: 'पंजीकरण',
    email: 'ईमेल',
    password: 'पासवर्ड',
    fullName: 'पूरा नाम',
    phoneNumber: 'फोन नंबर',
    age: 'आयु',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    educateYourself: 'स्वयं को शिक्षित करें',
    seniorCitizenHelp: 'वरिष्ठ नागरिक सहायता',
    legalAid: 'कानूनी सहायता',
    anamika: 'अनामिका',
    basicPlan: 'बेसिक',
    premiumPlan: 'प्रीमियम',
    elitePlan: 'एलीट',
    purchase: 'खरीदें',
    logout: 'लॉगआउट',
    profile: 'प्रोफ़ाइल',
    help: 'सहायता',
    subscription: 'सदस्यता',
  },
  kannada: {
    welcome: 'ಕಾನೂನು ವಿಸ್ತಾರಕ್ಕೆ ಸುಸ್ವಾಗತ',
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ',
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    fullName: 'ಪೂರ್ಣ ಹೆಸರು',
    phoneNumber: 'ಫೋನ್ ನಂಬರ',
    age: 'ವಯಸ್ಸು',
    confirmPassword: 'ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ',
    educateYourself: 'ನಿಮ್ಮನ್ನು ಶಿಕ್ಷಿತರನ್ನಾಗಿಸಿ',
    seniorCitizenHelp: 'ಹಿರಿಯ ನಾಗರಿಕ ಸಹಾಯ',
    legalAid: 'ಕಾನೂನು ಸಹಾಯ',
    anamika: 'ಅನಾಮಿಕಾ',
    basicPlan: 'ಮೂಲ',
    premiumPlan: 'ಪ್ರೀಮಿಯಂ',
    elitePlan: 'ಎಲೀಟ್',
    purchase: 'ಖರೀದಿಸಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    profile: 'ಪ್ರೊಫೈಲ್',
    help: 'ಸಹಾಯ',
    subscription: 'ಚಂದಾದಾರಿಕೆ',
  },
  tamil: {
    welcome: 'கனூன் விஸ்தார்க்கு வரவேற்கிறோம்',
    login: 'உள்நுழைய',
    register: 'பதிவு செய்யுங்கள்',
    // ... add more translations
    subscription: 'சந்தா',
  },
  telugu: {
    welcome: 'కానూన్ విస్తార్‌కు స్వాగతం',
    login: 'లాగిన్',
    register: 'నమోదు',
    // ... add more translations
    subscription: 'చందా',
  },
  bengali: {
    welcome: 'কানুন বিস্তারে স্বাগতম',
    login: 'লগইন',
    register: 'নিবন্ধন',
    // ... add more translations
    subscription: 'সাবস্ক্রিপশন',
  },
  marathi: {
    welcome: 'कानून विस्तार मध्ये आपले स्वागत आहे',
    login: 'लॉगिन',
    register: 'नोंदणी',
    // ... add more translations
    subscription: 'सदस्यत्व',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const translate = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translate
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
