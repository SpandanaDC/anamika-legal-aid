
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, MessageSquare, Calendar, Gavel, HelpCircle } from 'lucide-react';

// Mock data for demonstration
const chatHistory = [
  { id: 1, date: '2023-04-15', time: '10:30 AM', type: 'Chatbot Interaction', description: 'Query about property inheritance laws' },
  { id: 2, date: '2023-04-10', time: '2:15 PM', type: 'Chatbot Interaction', description: 'Information about divorce proceedings' },
  { id: 3, date: '2023-04-01', time: '9:45 AM', type: 'Chatbot Interaction', description: 'Question about consumer rights' }
];

const appointmentHistory = [
  { 
    id: 1, 
    date: '2023-04-12', 
    time: '11:00 AM', 
    type: 'Legal Consultation',
    expert: 'Adv. Priya Sharma',
    status: 'Completed',
    location: 'Delhi Office'
  },
  { 
    id: 2, 
    date: '2023-03-25', 
    time: '3:30 PM', 
    type: 'Document Review',
    expert: 'Adv. Rajesh Kumar',
    status: 'Completed',
    location: 'Virtual Meeting'
  }
];

const legalAidHistory = [
  { 
    id: 1, 
    date: '2023-03-15', 
    time: '10:00 AM', 
    type: 'Legal Aid Consultation',
    service: 'Document Preparation',
    status: 'Completed',
    location: 'Mumbai Legal Aid Center'
  }
];

const supportHistory = [
  { 
    id: 1, 
    date: '2023-04-05', 
    time: '9:15 AM', 
    type: 'Emergency Support',
    description: 'Assistance with harassment complaint',
    status: 'Resolved',
    helpline: 'Senior Citizen Helpline'
  }
];

const History = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const renderHistoryCard = (item: any, icon: React.ReactNode) => (
    <Card key={item.id} className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-kanoon-light-pink/20 flex items-center justify-center mr-4">
            {icon}
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="font-medium">{item.type}</h3>
                <p className="text-gray-600 text-sm">
                  {item.date} at {item.time}
                </p>
              </div>
              <div className="md:text-right mt-2 md:mt-0">
                {'status' in item && (
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    item.status === 'Completed' || item.status === 'Resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-3">
              {'description' in item && <p className="text-gray-700">{item.description}</p>}
              {'expert' in item && <p className="text-gray-700">Expert: {item.expert}</p>}
              {'service' in item && <p className="text-gray-700">Service: {item.service}</p>}
              {'helpline' in item && <p className="text-gray-700">Helpline: {item.helpline}</p>}
              {'location' in item && (
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

          <h1 className="text-3xl font-serif font-bold gradient-text mb-8">Your Activity History</h1>
          
          <Tabs defaultValue="all">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="all" className="flex-1">All Activity</TabsTrigger>
              <TabsTrigger value="chats" className="flex-1">Chats</TabsTrigger>
              <TabsTrigger value="appointments" className="flex-1">Appointments</TabsTrigger>
              <TabsTrigger value="legal-aid" className="flex-1">Legal Aid</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="space-y-8">
                {chatHistory.length > 0 && (
                  <div>
                    <h2 className="text-xl font-medium mb-4">Chatbot Interactions</h2>
                    {chatHistory.map(item => renderHistoryCard(item, <MessageSquare className="h-5 w-5 text-kanoon-medium-purple" />))}
                  </div>
                )}
                
                {appointmentHistory.length > 0 && (
                  <div>
                    <h2 className="text-xl font-medium mb-4">Expert Appointments</h2>
                    {appointmentHistory.map(item => renderHistoryCard(item, <Calendar className="h-5 w-5 text-kanoon-medium-purple" />))}
                  </div>
                )}
                
                {legalAidHistory.length > 0 && (
                  <div>
                    <h2 className="text-xl font-medium mb-4">Legal Aid</h2>
                    {legalAidHistory.map(item => renderHistoryCard(item, <Gavel className="h-5 w-5 text-kanoon-medium-purple" />))}
                  </div>
                )}
                
                {supportHistory.length > 0 && (
                  <div>
                    <h2 className="text-xl font-medium mb-4">Support Requests</h2>
                    {supportHistory.map(item => renderHistoryCard(item, <HelpCircle className="h-5 w-5 text-kanoon-medium-purple" />))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="chats">
              <h2 className="text-xl font-medium mb-4">Chatbot Interactions</h2>
              {chatHistory.length > 0 ? (
                chatHistory.map(item => renderHistoryCard(item, <MessageSquare className="h-5 w-5 text-kanoon-medium-purple" />))
              ) : (
                <p className="text-center text-gray-500 py-8">No chat history found.</p>
              )}
            </TabsContent>
            
            <TabsContent value="appointments">
              <h2 className="text-xl font-medium mb-4">Expert Appointments</h2>
              {appointmentHistory.length > 0 ? (
                appointmentHistory.map(item => renderHistoryCard(item, <Calendar className="h-5 w-5 text-kanoon-medium-purple" />))
              ) : (
                <p className="text-center text-gray-500 py-8">No appointment history found.</p>
              )}
            </TabsContent>
            
            <TabsContent value="legal-aid">
              <h2 className="text-xl font-medium mb-4">Legal Aid</h2>
              {legalAidHistory.length > 0 ? (
                legalAidHistory.map(item => renderHistoryCard(item, <Gavel className="h-5 w-5 text-kanoon-medium-purple" />))
              ) : (
                <p className="text-center text-gray-500 py-8">No legal aid history found.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
