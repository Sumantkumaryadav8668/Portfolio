import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { queryPortfolioAI } from '../utils/portfolioAI';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const welcomeMessage = "Hi there! I'm Sumant's Portfolio Assistant. How can I help you? You can ask about Sumant's education (Class 10, 12, CGPA), skills, projects, certifications, achievements, GitHub stats, or LeetCode data.";

const quickReplies = [
  "What is Sumant's Class 10 percentage?",
  "What is Sumant's Class 12 percentage?",
  "What is Sumant's CGPA?",
  "What projects has Sumant built?",
  "What certifications does Sumant have?",
  "What are Sumant's skills?",
  "What is Sumant's LeetCode data?"
];

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { id: '1', sender: 'bot', text: welcomeMessage }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const responseText = queryPortfolioAI(text);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'bot', text: responseText }
      ]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/95 transition-colors cursor-pointer border-0"
        aria-label="Open Portfolio Assistant Widget"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 sm:w-96 h-[480px] bg-brand-card border border-brand-border rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 relative z-10"
          >
            <div className="bg-brand-bgSec/80 border-b border-brand-border p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/15 flex items-center justify-center text-brand-accent">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-text">Sumant's Portfolio Assistant</h4>
                  <span className="text-[10px] text-brand-success font-semibold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-success mr-1 animate-pulse"></span>
                    Portfolio Scope Only
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-transparent hover:bg-brand-bg flex items-center justify-center text-brand-muted hover:text-brand-text cursor-pointer border-0 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={msg.id} className={`flex items-start space-x-2.5 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                      isBot ? 'bg-brand-primary/10 text-brand-accent' : 'bg-brand-card border border-brand-border text-brand-text'
                    }`}>
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line ${
                      isBot ? 'bg-brand-bgSec border border-brand-border/60 text-brand-text' : 'bg-brand-primary text-white'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-brand-primary/10 text-brand-accent flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-brand-bgSec border border-brand-border/60 rounded-2xl px-4 py-3 flex space-x-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-muted animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-muted animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-muted animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="p-3 border-t border-brand-border/40 space-y-1">
              <span className="text-[10px] text-brand-muted uppercase font-bold px-1">Quick Questions:</span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto no-scrollbar pt-1">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(reply)}
                    className="text-[10px] bg-brand-bg border border-brand-border/70 hover:border-brand-accent hover:text-brand-text text-brand-muted px-2.5 py-1 rounded-xl transition-all cursor-pointer border-0"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-brand-border flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about marks, CGPA, projects, skills..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-brand-bgSec/60 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none focus:border-brand-primary"
              />
              <button
                type="submit"
                aria-label="Send Query"
                className="w-9 h-9 rounded-xl bg-brand-primary hover:bg-brand-primary/80 flex items-center justify-center text-white transition-colors flex-shrink-0 cursor-pointer border-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
