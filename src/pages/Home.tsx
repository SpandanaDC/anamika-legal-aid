
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Book, 
  MessageSquare, 
  Users, 
  Gavel, 
  HelpCircle 
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const navigationCards = [
    {
      title: translate('educateYourself'),
      description: "Learn about Indian laws, rights, and legal processes",
      icon: <Book className="h-12 w-12 text-kanoon-dark-violet" />,
      path: "/educate-yourself",
      bgColor: "bg-[#FEF7CD]"
    },
    {
      title: translate('yourPersonalChatbot'),
      description: "Get answers to legal questions through AI",
      icon: <MessageSquare className="h-12 w-12 text-kanoon-medium-purple" />,
      path: "/anamika",
      bgColor: "bg-[#E5DEFF]"
    },
    {
      title: translate('connectWithLegalExperts'),
      description: "Book appointments with legal professionals",
      icon: <Users className="h-12 w-12 text-kanoon-medium-purple" />,
      path: "/connect-with-experts",
      bgColor: "bg-[#FFDEE2]"
    },
    {
      title: translate('legalAid'),
      description: "Access legal aid services and resources",
      icon: <Gavel className="h-12 w-12 text-kanoon-medium-purple" />,
      path: "/legal-aid",
      bgColor: "bg-[#F2FCE2]"
    },
    {
      title: translate('seniorCitizenPortal'),
      description: "Special resources for senior citizens",
      icon: <HelpCircle className="h-12 w-12 text-kanoon-medium-purple" />,
      path: "/senior-citizen-help",
      bgColor: "bg-[#FDE1D3]"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="gradient-bg text-white py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                {translate('welcome')}, {user?.name}
              </h1>
              <p className="text-xl">
                Your gateway to understanding Indian laws, accessing legal aid, and empowering yourself with knowledge.
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Navigation Cards */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 gradient-text">
              How can we help you today?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {navigationCards.map((card, index) => (
                <Card 
                  key={index} 
                  className={`border-none shadow-md hover:shadow-lg transition-shadow ${card.bgColor}`}
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="mb-4">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-medium">{card.title}</h3>
                      <p className="text-gray-600">{card.description}</p>
                      <Button 
                        className="mt-4 btn-gradient text-white"
                        onClick={() => navigate(card.path)}
                      >
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
