
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Bell, ArrowRight } from 'lucide-react';

// Mock data for demonstration
const caseUpdates = [
  {
    id: 1,
    caseNumber: 'KV-2023-001',
    title: 'Property Dispute Resolution',
    date: '2023-04-18',
    time: '11:30 AM',
    status: 'Hearing Scheduled',
    description: 'Your case has been scheduled for hearing on May 5, 2023, at Delhi District Court, Room 302.',
    isNew: true
  },
  {
    id: 2,
    caseNumber: 'KV-2023-002',
    title: 'Insurance Claim',
    date: '2023-04-15',
    time: '09:45 AM',
    status: 'Document Requested',
    description: 'Please submit the additional verification documents requested by the insurance company by April 25, 2023.',
    isNew: true
  },
  {
    id: 3,
    caseNumber: 'KV-2023-003',
    title: 'Employment Dispute',
    date: '2023-04-10',
    time: '03:15 PM',
    status: 'In Progress',
    description: 'Your conciliation meeting with the employer representative has been completed. Awaiting final resolution.',
    isNew: false
  },
  {
    id: 4,
    caseNumber: 'KV-2022-045',
    title: 'Consumer Complaint',
    date: '2023-03-25',
    time: '10:20 AM',
    status: 'Resolved',
    description: 'Your complaint has been successfully resolved. The company has agreed to provide a full refund within 7 working days.',
    isNew: false
  }
];

const CaseUpdates = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hearing Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Document Requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 container mx-auto px-4">
        <div className="py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif font-bold gradient-text">Case Updates</h1>
            <Button variant="outline" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Notification Settings
            </Button>
          </div>
          
          <div className="space-y-6">
            {caseUpdates.map(update => (
              <Card 
                key={update.id} 
                className={`overflow-hidden hover:shadow-md transition-shadow ${update.isNew ? 'border-l-4 border-l-kanoon-medium-purple' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        {update.isNew && (
                          <span className="inline-block w-2 h-2 rounded-full bg-kanoon-medium-purple mr-2"></span>
                        )}
                        <h3 className="text-lg font-medium">{update.title}</h3>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">Case No: {update.caseNumber}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(update.status)}`}>
                        {update.status}
                      </span>
                      <p className="text-gray-500 text-sm mt-1">
                        {update.date} at {update.time}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{update.description}</p>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost"
                      className="text-kanoon-medium-purple hover:bg-kanoon-light-pink/20 hover:text-kanoon-dark-violet"
                    >
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseUpdates;
