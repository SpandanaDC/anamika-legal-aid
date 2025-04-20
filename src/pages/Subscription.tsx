
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubscriptionCard } from '@/components/SubscriptionCard';

const Subscription = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header */}
        <section className="gradient-bg text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Subscription Plans
            </h1>
            <p className="text-xl max-w-3xl">
              Choose the plan that best suits your needs
            </p>
          </div>
        </section>

        {/* Subscription Cards */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SubscriptionCard 
                title="Basic"
                price="₹99"
                features={[
                  "10 Anamika chatbot accesses",
                  "5 Legal Aid queries/month"
                ]}
              />
              <SubscriptionCard 
                title="Premium"
                price="₹299"
                features={[
                  "100 Anamika accesses",
                  "Unlimited Legal Aid access"
                ]}
                highlighted={true}
              />
              <SubscriptionCard 
                title="Elite"
                price="₹499"
                features={[
                  "Unlimited access to all features"
                ]}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Subscription;
