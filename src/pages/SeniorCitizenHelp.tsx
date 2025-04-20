
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Phone, ExternalLink } from 'lucide-react';

const SeniorCitizenHelp = () => {
  const { isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const benefitItems = [
    {
      title: 'Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
      content: 'This act provides for the maintenance and welfare of parents and senior citizens, ensuring they receive proper care and basic necessities from their children or legal guardians.'
    },
    {
      title: 'Senior Citizen Savings Scheme',
      content: 'A government scheme that provides senior citizens with a regular income stream through fixed deposits with higher interest rates than standard savings accounts.'
    },
    {
      title: 'Pension Schemes',
      content: 'Various pension schemes like National Pension System, Pradhan Mantri Vaya Vandana Yojana, and Atal Pension Yojana provide financial security to senior citizens.'
    },
    {
      title: 'Healthcare Benefits',
      content: 'Schemes like Ayushman Bharat provide healthcare coverage to senior citizens. Many hospitals also offer priority services and discounts for elderly patients.'
    },
    {
      title: 'Tax Benefits',
      content: 'Senior citizens (60+ years) and super senior citizens (80+ years) enjoy higher basic exemption limits and additional deductions under the Income Tax Act.'
    },
    {
      title: 'Travel Concessions',
      content: 'Indian Railways, various state transport services, and airlines offer discounted fares and special facilities for senior citizens.'
    }
  ];

  const supportItems = [
    {
      title: 'Elder Helpline (1800-180-1253)',
      content: 'A national helpline dedicated to addressing the concerns and grievances of senior citizens.',
      icon: <Phone className="h-5 w-5" />
    },
    {
      title: 'Legal Aid Clinics',
      content: 'Free legal assistance provided by the Legal Services Authority for senior citizens who cannot afford legal representation.',
      icon: <ExternalLink className="h-5 w-5" />
    },
    {
      title: 'Retirement Homes and Day Care Centers',
      content: 'Facilities that provide care, accommodation, and recreational activities for senior citizens.',
      icon: <ExternalLink className="h-5 w-5" />
    },
    {
      title: 'NGOs for Elderly Care',
      content: 'Organizations like HelpAge India, Dignity Foundation, and Age Care India work towards the welfare of senior citizens.',
      icon: <ExternalLink className="h-5 w-5" />
    },
    {
      title: 'IGNOAPS (Indira Gandhi National Old Age Pension Scheme)',
      content: 'Provides financial assistance to senior citizens who are below the poverty line.',
      icon: <ExternalLink className="h-5 w-5" />
    },
    {
      title: 'Special Police Units',
      content: 'Many police departments have special units or helplines dedicated to addressing the security concerns of senior citizens.',
      icon: <Phone className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header */}
        <section className="gradient-bg text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {translate('seniorCitizenHelp')}
            </h1>
            <p className="text-xl max-w-3xl">
              Dedicated resources and support for senior citizens to navigate legal processes, understand their rights, and access services designed for their needs.
            </p>
          </div>
        </section>
        
        {/* Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <Tabs defaultValue="benefits" className="space-y-8">
              <TabsList className="flex justify-center">
                <TabsTrigger value="benefits">Services & Benefits</TabsTrigger>
                <TabsTrigger value="support">Support & Guidance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="benefits">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">Legal Rights & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">
                      Senior citizens in India are entitled to various legal protections, financial benefits, and special services. Here's what you need to know:
                    </p>
                    
                    <Accordion type="single" collapsible className="space-y-2">
                      {benefitItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden">
                          <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 py-3 bg-gray-50">
                            <p>{item.content}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="mt-8 bg-kanoon-light-pink/20 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-4">Need Personalized Guidance?</h3>
                      <p className="mb-4">
                        If you need specific help understanding your benefits or applying for schemes, our experts can assist you.
                      </p>
                      <Button className="btn-gradient text-white">
                        Schedule a Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="support">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">Support Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">
                      Access to support services, helplines, and community resources designed specifically for senior citizens:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {supportItems.map((item, index) => (
                        <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-kanoon-medium-purple/10 flex items-center justify-center mr-3">
                              {item.icon}
                            </div>
                            <h3 className="font-medium">{item.title}</h3>
                          </div>
                          <p className="text-gray-600">{item.content}</p>
                          <Button variant="link" className="mt-2 p-0 text-kanoon-medium-purple">
                            Learn more
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 bg-kanoon-light-pink/20 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-2">Emergency Contact Information</h3>
                      <p className="mb-4">
                        Keep these important numbers handy for immediate assistance:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-red-500" />
                          <span>Emergency: 112</span>
                        </li>
                        <li className="flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Senior Citizen Helpline: 1800-180-1253</span>
                        </li>
                        <li className="flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-green-500" />
                          <span>Health Helpline: 1800-180-1104</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeniorCitizenHelp;
