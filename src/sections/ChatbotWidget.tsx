import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { queryPortfolioAI } from '../utils/portfolioAI';
import { useLanguage } from '../context/LanguageContext';

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
  const { t } = useLanguage();
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
    }, 400);
  };

  return (
    <div className="fixed bottom-[calc(80px+env(safe-area-inset-bottom,0px))] right-4 sm:right-5 z-50 flex flex-col-reverse items-end">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer border-0 p-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-slate-900 z-50 flex-shrink-0"
        aria-label="Open Portfolio Assistant Widget"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white flex-shrink-0" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white flex-shrink-0" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 h-[460px] max-h-[75vh] card card-elevated shadow-xl flex flex-col overflow-hidden mb-3 relative z-10"
          >
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t('chatbot.title')}</h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                    {t('chatbot.scope')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer border-0 focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3.5 no-scrollbar">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={msg.id} className={`flex items-start space-x-2.5 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                      isBot
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/50'
                        : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
                    }`}>
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[78%] rounded-xl p-3 text-xs leading-relaxed whitespace-pre-line ${
                      isBot
                        ? 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-slate-100'
                        : 'bg-blue-600 text-white font-medium'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2.5 flex space-x-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Quick Replies */}
            <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-bold px-1">Quick Questions:</span>
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto no-scrollbar pt-0.5">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(reply)}
                    className="text-[9px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-lg transition-all cursor-pointer"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2 bg-white dark:bg-slate-900"
            >
              <input
                type="text"
                placeholder={t('chatbot.placeholder')}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="input-field py-2 text-xs"
              />
              <button
                type="submit"
                aria-label="Send Query"
                className="btn-primary py-2 px-3 text-xs flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
