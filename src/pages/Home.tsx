
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubscriptionCard } from '@/components/SubscriptionCard';
import { FeatureCard } from '@/components/FeatureCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, ArrowRight, HelpCircle, MessageSquare, User } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="gradient-bg text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              {translate('welcome')}
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your gateway to understanding Indian laws, accessing legal aid, and empowering yourself with knowledge.
            </p>
          </div>
        </section>
        
        {/* Subscription Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 gradient-text">
              {translate('subscription')}
            </h2>
            
            <Tabs defaultValue="monthly" className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly (Save 15%)</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="monthly" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <SubscriptionCard 
                    type="basic"
                    price="₹99"
                    features={[
                      "10 Anamika chatbot accesses",
                      "5 Legal Aid queries/month",
                      "Access to basic educational content",
                      "Email support"
                    ]}
                  />
                  
                  <SubscriptionCard 
                    type="premium"
                    price="₹299"
                    features={[
                      "100 Anamika chatbot accesses",
                      "Unlimited Legal Aid access",
                      "Full access to educational content",
                      "Priority email support",
                      "Document review assistance"
                    ]}
                    isPopular
                  />
                  
                  <SubscriptionCard 
                    type="elite"
                    price="₹499"
                    features={[
                      "Unlimited access to all features",
                      "Priority 24/7 support",
                      "Personalized legal guidance",
                      "Document preparation assistance",
                      "Monthly legal advisory call"
                    ]}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="yearly" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <SubscriptionCard 
                    type="basic"
                    price="₹999"
                    features={[
                      "10 Anamika chatbot accesses per month",
                      "5 Legal Aid queries/month",
                      "Access to basic educational content",
                      "Email support",
                      "2 months free"
                    ]}
                  />
                  
                  <SubscriptionCard 
                    type="premium"
                    price="₹2,999"
                    features={[
                      "100 Anamika chatbot accesses per month",
                      "Unlimited Legal Aid access",
                      "Full access to educational content",
                      "Priority email support",
                      "Document review assistance",
                      "2 months free"
                    ]}
                    isPopular
                  />
                  
                  <SubscriptionCard 
                    type="elite"
                    price="₹4,999"
                    features={[
                      "Unlimited access to all features",
                      "Priority 24/7 support",
                      "Personalized legal guidance",
                      "Document preparation assistance",
                      "Monthly legal advisory call",
                      "2 months free"
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Main Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 gradient-text">
              How can we help you?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                title={translate('educateYourself')}
                description="Learn about Indian laws, rights, and legal processes through interactive content."
                icon={<Book className="h-6 w-6 text-white" />}
                link="/educate-yourself"
                colorClass="from-kanoon-dark-violet to-kanoon-medium-purple"
              />
              
              <FeatureCard 
                title={translate('seniorCitizenHelp')}
                description="Special legal resources and support for senior citizens."
                icon={<HelpCircle className="h-6 w-6 text-white" />}
                link="/senior-citizen-help"
                colorClass="from-kanoon-medium-purple to-kanoon-lighter-purple"
              />
              
              <FeatureCard 
                title={translate('legalAid')}
                description="Get step-by-step legal help and guidance for common issues."
                icon={<User className="h-6 w-6 text-white" />}
                link="/legal-aid"
                colorClass="from-kanoon-lighter-purple to-kanoon-soft-pink"
              />
              
              <FeatureCard 
                title={translate('anamika')}
                description="Chat with Anamika, your personal legal assistant for quick answers."
                icon={<MessageSquare className="h-6 w-6 text-white" />}
                link="/anamika"
                colorClass="from-kanoon-soft-pink to-kanoon-light-pink"
              />
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4 gradient-bg text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Ready to explore your legal rights?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Start your journey towards legal empowerment today with Kanoon Vistar.
            </p>
            <div className="flex justify-center">
              <button className="bg-white text-kanoon-darker-purple px-6 py-3 rounded-full font-medium inline-flex items-center hover:bg-gray-100 transition-colors">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
