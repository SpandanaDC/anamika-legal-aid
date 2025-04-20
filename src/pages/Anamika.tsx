
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Book, Bookmark, FileText, RefreshCcw } from 'lucide-react';

const Anamika = () => {
  const { isAuthenticated } = useAuth();
  const { translate, currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'bot', message: string}>>([
    {
      role: 'bot',
      message: 'Hello! I am Anamika, your personal legal assistant. I can help you understand legal terms, explain legal documents, and guide you through legal procedures. How can I assist you today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, { role: 'user', message }]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
      let response = '';
      
      // Generate different responses based on detected keywords
      if (message.toLowerCase().includes('document') || message.toLowerCase().includes('agreement')) {
        response = 'Legal documents typically contain several important sections, including parties involved, terms and conditions, obligations, and signature blocks. Would you like me to explain a specific type of legal document?';
      } else if (message.toLowerCase().includes('section') || message.toLowerCase().includes('ipc')) {
        response = 'The Indian Penal Code (IPC) contains various sections defining criminal offenses and their punishments. Could you specify which section you\'d like me to explain?';
      } else if (message.toLowerCase().includes('divorce') || message.toLowerCase().includes('marriage')) {
        response = 'In India, divorce laws vary based on personal laws (Hindu Marriage Act, Muslim Personal Law, etc.). The general grounds include cruelty, desertion, conversion, mental disorder, etc. The process typically involves filing a petition, mediation, and court hearings.';
      } else if (message.toLowerCase().includes('property') || message.toLowerCase().includes('inheritance')) {
        response = 'Property laws in India cover aspects like ownership, transfer, inheritance, and dispute resolution. Inheritance is governed by personal laws based on religion. Would you like specific information about property registration or inheritance rights?';
      } else {
        const generalResponses = [
          'I understand you\'re asking about this legal topic. Could you provide more specific details so I can give you accurate information?',
          'This is an interesting legal question. To better assist you, could you tell me more about your specific concern?',
          'From a legal perspective, there are several aspects to consider. Could you clarify which aspect you\'re most interested in?',
          'Thank you for your question. The legal framework around this topic involves multiple regulations. What specific information are you looking for?'
        ];
        response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }
      
      setChatHistory(prev => [...prev, { role: 'bot', message: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedTopics = [
    "Explain bail and anticipatory bail",
    "What is a power of attorney?",
    "How to file an RTI application?",
    "Explain tenant rights in India",
    "What is the process for will registration?"
  ];

  const handleSuggestedTopic = (topic: string) => {
    setMessage(topic);
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
              {translate('anamika')}
            </h1>
            <p className="text-xl max-w-3xl">
              Your personal legal assistant, available 24/7 to explain legal terms, guide you through documents, and help you understand legal procedures in simple language.
            </p>
          </div>
        </section>
        
        {/* Chat Interface */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <Card className="md:col-span-1 h-fit">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center py-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="/placeholder.svg" alt="Anamika" />
                      <AvatarFallback className="bg-kanoon-medium-purple text-white text-xl">Aн</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-medium">Anamika</h2>
                    <p className="text-sm text-gray-500">Legal AI Assistant</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Ask me about:</h3>
                    <ul className="space-y-2">
                      {suggestedTopics.map((topic, index) => (
                        <li key={index}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-left text-sm hover:bg-gray-100"
                            onClick={() => handleSuggestedTopic(topic)}
                          >
                            <span className="truncate">{topic}</span>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <h3 className="font-medium mb-2">Features:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <Book className="h-4 w-4 mr-2" />
                        <span>Legal term explanations</span>
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>Document assistance</span>
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <Bookmark className="h-4 w-4 mr-2" />
                        <span>Procedure guidance</span>
                      </li>
                      <li className="flex items-center text-sm text-gray-600">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        <span>Multilingual support</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              {/* Chat Area */}
              <Card className="md:col-span-3 h-[600px] flex flex-col">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {chat.role === 'bot' && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src="/placeholder.svg" alt="Anamika" />
                            <AvatarFallback className="bg-kanoon-medium-purple text-white text-xs">Aн</AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-[75%] px-4 py-3 rounded-lg ${
                            chat.role === 'user' 
                              ? 'bg-kanoon-medium-purple text-white rounded-tr-none' 
                              : 'bg-gray-100 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          {chat.message}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src="/placeholder.svg" alt="Anamika" />
                          <AvatarFallback className="bg-kanoon-medium-purple text-white text-xs">Aн</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg rounded-tl-none">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={chatEndRef} />
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-grow"
                    />
                    <Button 
                      className="btn-gradient text-white"
                      onClick={handleSendMessage}
                      disabled={message.trim() === '' || isTyping}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
                    <span>Chatting in: {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}</span>
                    <span>Powered by Kanoon Vistar AI</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Anamika;
