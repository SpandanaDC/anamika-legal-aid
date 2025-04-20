
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, ChevronRight, FilePlus, FileQuestion, User } from 'lucide-react';

const LegalAid = () => {
  const { isAuthenticated } = useAuth();
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', message: string}>>([
    {
      role: 'assistant',
      message: 'Hello! I\'m here to provide legal guidance on common issues. How can I assist you today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSendMessage = () => {
    if (query.trim() === '') return;
    
    // Add user message to conversation
    setConversation([...conversation, { role: 'user', message: query }]);
    setQuery('');
    setIsTyping(true);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      const responseOptions = [
        'I understand your concern. Based on Indian law, you have several options including...',
        'According to the relevant legal provisions, the process you should follow is...',
        'In such cases, Section 123 of the XYZ Act provides protection. You should consider...',
        'This is a common issue. The legal recourse available to you includes...',
        'Let me guide you through the legal process for this situation. First, you need to...'
      ];
      
      const randomResponse = responseOptions[Math.floor(Math.random() * responseOptions.length)];
      
      setConversation(prev => [...prev, { role: 'assistant', message: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const commonQuestions = [
    "What rights do I have as a tenant?",
    "How do I file a consumer complaint?",
    "What is the process for filing an FIR?",
    "How can I apply for legal aid services?",
    "What are my rights during police interrogation?"
  ];

  const handleQuickQuestion = (question: string) => {
    setQuery(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Header */}
        <section className="gradient-bg text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {translate('legalAid')}
            </h1>
            <p className="text-xl max-w-3xl">
              Get step-by-step guidance on common legal issues and procedures. Our intelligent assistant is here to help you understand your legal options.
            </p>
          </div>
        </section>
        
        {/* Chat Interface */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar with common questions */}
              <div className="md:col-span-1 order-2 md:order-1">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-4">Common Questions</h3>
                    <ul className="space-y-2">
                      {commonQuestions.map((question, index) => (
                        <li key={index}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-left hover:bg-gray-100"
                            onClick={() => handleQuickQuestion(question)}
                          >
                            <FileQuestion className="h-4 w-4 mr-2 shrink-0" />
                            <span className="truncate">{question}</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="text-lg font-medium mb-4">Legal Resources</h3>
                      <ul className="space-y-2">
                        <li>
                          <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-100">
                            <FilePlus className="h-4 w-4 mr-2 shrink-0" />
                            <span className="truncate">Document Templates</span>
                          </Button>
                        </li>
                        <li>
                          <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-100">
                            <User className="h-4 w-4 mr-2 shrink-0" />
                            <span className="truncate">Find a Lawyer</span>
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Chat area */}
              <div className="md:col-span-2 order-1 md:order-2">
                <Card className="h-[600px] flex flex-col">
                  <CardContent className="p-4 flex-grow overflow-hidden flex flex-col">
                    <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                      {conversation.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] px-4 py-2 rounded-lg ${
                              message.role === 'user' 
                                ? 'bg-kanoon-medium-purple text-white' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.message}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your legal question here..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="resize-none"
                      />
                      <Button 
                        className="btn-gradient text-white"
                        onClick={handleSendMessage}
                        disabled={query.trim() === '' || isTyping}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Note: This is a general legal guidance tool. For specific legal advice, please consult a qualified lawyer.</p>
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

export default LegalAid;
