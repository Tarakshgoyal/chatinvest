'use client';
import React, { useState } from 'react';
import { Send, TrendingUp, DollarSign, BarChart3, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ChatMessage {
  id: number;
  message: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatHistory {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

const investmentOptions = [
  { id: 1, title: 'Portfolio Analysis', icon: PieChart, description: 'Analyze your current portfolio' },
  { id: 2, title: 'Market Trends', icon: TrendingUp, description: 'Get latest market insights' },
  { id: 3, title: 'Investment Strategy', icon: BarChart3, description: 'Develop investment strategies' },
  { id: 4, title: 'Risk Assessment', icon: DollarSign, description: 'Evaluate investment risks' },
  { id: 5, title: 'Sector Analysis', icon: TrendingUp, description: 'Deep dive into sectors' },
  { id: 6, title: 'Technical Analysis', icon: BarChart3, description: 'Chart patterns and indicators' },
];

const ChatInvestment = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      message: "Hello! I'm Fein-AI, your investment assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [chatHistory] = useState<ChatHistory[]>([
    { id: 1, title: 'Portfolio Review Q4', lastMessage: 'Your portfolio shows...', timestamp: new Date(Date.now() - 86400000) },
    { id: 2, title: 'Tesla Stock Analysis', lastMessage: 'Based on recent trends...', timestamp: new Date(Date.now() - 172800000) },
    { id: 3, title: 'XAUUSD Investment', lastMessage: 'Gold has shown...', timestamp: new Date(Date.now() - 259200000) },
  ]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      message: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setCurrentMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        message: "I understand your question. Let me analyze that for you...",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
    const option = investmentOptions.find(opt => opt.id === optionId);
    if (option) {
      setCurrentMessage(option.description);
    }
  };

  return (
    <div className="h-screen flex" style={{ backgroundColor: '#0f0f0f', color: '#ddf1a5' }}>
      {/* Left Sidebar - Chat History */}
      <div className="w-80 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold" style={{ color: '#ddf1a5' }}>Fein-AI</h1>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4">
          <h2 className="text-sm font-semibold mb-4 opacity-70">Chat History</h2>
          <ScrollArea className="h-full">
            <div className="space-y-3">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div className="font-medium text-sm mb-1">{chat.title}</div>
                  <div className="text-xs opacity-60 truncate">{chat.lastMessage}</div>
                  <div className="text-xs opacity-40 mt-1">
                    {chat.timestamp.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl p-4 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800'
                    }`}
                  >
                    <div className="text-sm">{message.message}</div>
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Investment Options Slider */}
        <div className="p-4 border-t border-gray-800">
          <h3 className="text-sm font-medium mb-3 opacity-70">Select an investment topic:</h3>
          <div className="relative px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {investmentOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <CarouselItem key={option.id} className="md:basis-1/2 lg:basis-1/3">
                      <div
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedOption === option.id
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-gray-700 bg-gray-900 hover:bg-gray-800'
                        }`}
                        onClick={() => handleOptionSelect(option.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-5 h-5 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="font-medium text-sm">{option.title}</div>
                            <div className="text-xs opacity-60">{option.description}</div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="text-white border-gray-700 bg-gray-800 hover:bg-gray-700 " />
              <CarouselNext className="text-white border-gray-700 bg-gray-800 hover:bg-gray-700 " />
            </Carousel>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex space-x-3">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Ask me about investments..."
              className="flex-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              style={{ color: '#ddf1a5' }}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInvestment;
