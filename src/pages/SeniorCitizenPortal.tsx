
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  Book, 
  Award, 
  HelpCircle, 
  Phone, 
  AlertCircle 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SeniorCitizenPortal = () => {
  const { isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleEmergencySupport = () => {
    toast({
      title: "Emergency Support",
      description: "Connecting to emergency support line. Please stay on this page.",
      variant: "destructive",
    });
  };

  const segments = [
    {
      title: "Laws & Schemes for You",
      description: "Learn about the legal provisions and government schemes specifically designed for senior citizens.",
      icon: <Book className="h-8 w-8 text-white" />,
      color: "bg-kanoon-dark-violet",
      items: [
        "Maintenance and Welfare of Parents and Senior Citizens Act, 2007",
        "Senior Citizen Savings Scheme",
        "Indira Gandhi National Old Age Pension Scheme",
        "Varishtha Pension Bima Yojana",
        "Tax Benefits for Senior Citizens"
      ]
    },
    {
      title: "Services & Benefits",
      description: "Discover the various services and benefits available to enhance your quality of life.",
      icon: <Award className="h-8 w-8 text-white" />,
      color: "bg-kanoon-medium-purple",
      items: [
        "Healthcare Benefits & Concessions",
        "Banking Services for Senior Citizens",
        "Travel Concessions",
        "Utility Bill Discounts",
        "Special Queues & Priority Services"
      ]
    },
    {
      title: "Support & Guidance",
      description: "Access resources and support networks designed to assist senior citizens.",
      icon: <HelpCircle className="h-8 w-8 text-white" />,
      color: "bg-kanoon-lighter-purple",
      items: [
        "Elder Helplines",
        "Legal Aid Clinics for Seniors",
        "Retirement Homes & Day Care Centers",
        "NGOs Working for Elder Care",
        "Support Groups & Community Services"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header */}
        <section className="gradient-bg text-white py-12 px-4">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              className="mb-4 text-white hover:bg-white/20"
              onClick={() => navigate('/home')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Senior Citizen Portal
            </h1>
            <p className="text-xl max-w-3xl">
              Dedicated resources and support for senior citizens to navigate legal processes, understand their rights, and access services designed for their needs.
            </p>
          </div>
        </section>
        
        {/* Segmented Cards */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {segments.map((segment, index) => (
                <Card key={index} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className={`p-4 ${segment.color}`}>
                    <div className="flex items-center space-x-3">
                      {segment.icon}
                      <h2 className="text-xl font-medium text-white">{segment.title}</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{segment.description}</p>
                    <ul className="space-y-2">
                      {segment.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-kanoon-medium-purple mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 text-kanoon-medium-purple border-kanoon-medium-purple hover:bg-kanoon-medium-purple/10"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Emergency Support */}
            <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-red-800">Emergency Support</h3>
                    <p className="text-red-600">
                      Need immediate assistance? Our support team is available 24/7.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Helpline
                  </Button>
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleEmergencySupport}
                  >
                    Emergency Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeniorCitizenPortal;
