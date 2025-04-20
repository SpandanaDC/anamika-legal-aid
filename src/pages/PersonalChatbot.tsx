
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronLeft, SendHorizontal, Mic } from 'lucide-react';

const PersonalChatbot = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm Anamika, your personal legal assistant. Tell me your issue!",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          text: "I'm processing your inquiry. As a demo, I can provide general information about Indian legal processes. How else can I assist you?", 
          sender: 'bot' 
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/home')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Card className="bg-white shadow-md rounded-xl overflow-hidden h-[70vh] flex flex-col">
            {/* Chat header */}
            <div className="bg-kanoon-dark-violet text-white p-4">
              <h1 className="text-xl font-medium">Anamika - Your Personal Legal Assistant</h1>
            </div>
            
            {/* Chat messages */}
            <div className="flex-grow p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-kanoon-medium-purple text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="border-t p-4 bg-white">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Tell me your issue..."
                  className="flex-grow"
                />
                <Button onClick={handleSend} disabled={!input.trim()}>
                  <SendHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PersonalChatbot;
