import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage, ThemeMode, SubPath } from '../types';
import { sendMessageToGemini, initChatSession } from '../services/geminiService';
import { AI_PERSONAS } from '../constants';

interface ChatInterfaceProps {
  subPath: SubPath;
  theme: ThemeMode;
  userName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ subPath, theme, userName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize chat session when subPath changes
  useEffect(() => {
    const initializeAI = async () => {
      const instruction = AI_PERSONAS[subPath] || "You are a helpful assistant.";
      // Append context about the user
      const fullInstruction = `${instruction}\n\nThe user's name is ${userName}.`;
      
      try {
        await initChatSession(fullInstruction);
        setIsInitialized(true);
        // Add initial greeting based on persona
        const initialGreeting = subPath === SubPath.KINDERGARTEN 
          ? `Hi ${userName}! 🌟 I'm your magical friend! What do you want to play? 🎈`
          : `Hello ${userName}. I am ready to assist you with your ${subPath.replace('_', ' ')} goals. How can I help?`;
          
        setMessages([{
          id: 'init',
          role: 'model',
          text: initialGreeting,
          timestamp: Date.now()
        }]);
      } catch (error) {
        console.error("Failed to init chat", error);
      }
    };
    
    initializeAI();
  }, [subPath, userName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !isInitialized || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Dynamic Styles based on Theme
  const getBubbleStyles = (role: 'user' | 'model') => {
    const isUser = role === 'user';
    switch (theme) {
      case ThemeMode.FUN:
        return isUser 
          ? 'bg-purple-500 text-white rounded-3xl p-4 shadow-lg border-b-4 border-purple-700' 
          : 'bg-white text-purple-900 rounded-3xl p-4 shadow-lg border-b-4 border-gray-200';
      case ThemeMode.EXAM:
        return isUser
          ? 'bg-slate-800 text-white rounded-none p-3 font-mono'
          : 'bg-slate-200 text-slate-900 rounded-none p-3 font-mono border-l-4 border-slate-500';
      case ThemeMode.PROFESSIONAL:
        return isUser
          ? 'bg-zinc-800 text-white rounded-lg p-3'
          : 'bg-white text-zinc-900 rounded-lg p-3 border border-zinc-200 shadow-sm';
      default:
        return isUser
          ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none p-3'
          : 'bg-white text-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100';
    }
  };

  return (
    <div className={`flex flex-col h-[600px] w-full max-w-4xl mx-auto ${theme === ThemeMode.FUN ? 'p-4' : 'p-0'}`}>
      {/* Header */}
      <div className={`p-4 flex items-center gap-3 border-b ${
        theme === ThemeMode.FUN ? 'bg-yellow-200 rounded-t-3xl border-yellow-400' : 
        theme === ThemeMode.EXAM ? 'bg-slate-900 text-white border-none' : 
        'bg-white/50 backdrop-blur border-gray-200'
      }`}>
        <div className={`p-2 rounded-full ${theme === ThemeMode.FUN ? 'bg-purple-500 text-white' : 'bg-primary/10 text-primary'}`}>
          {theme === ThemeMode.FUN ? <Sparkles size={24} /> : <Bot size={24} />}
        </div>
        <div>
          <h2 className={`font-bold ${theme === ThemeMode.FUN ? 'text-2xl text-purple-900' : 'text-lg'}`}>
            {theme === ThemeMode.FUN ? 'Magic Buddy' : 'AI Mentor'}
          </h2>
          <p className="text-xs opacity-70 capitalize">{subPath.replace('_', ' ')} Mode</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
        theme === ThemeMode.FUN ? 'bg-yellow-50/50' : 'bg-transparent'
      }`}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] whitespace-pre-wrap ${getBubbleStyles(msg.role)}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className={`flex items-center gap-2 p-3 ${
                     theme === ThemeMode.FUN ? 'bg-white rounded-3xl' : 'bg-gray-100 rounded-lg'
                 }`}>
                     <Loader2 className="animate-spin h-4 w-4" />
                     <span className="text-sm opacity-70">Thinking...</span>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 ${
        theme === ThemeMode.FUN ? 'bg-yellow-200 rounded-b-3xl border-t-0 border-yellow-400' : 
        theme === ThemeMode.EXAM ? 'bg-slate-100 border-t border-slate-300' : 
        'bg-white border-t border-gray-200'
      }`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={theme === ThemeMode.FUN ? "Say something fun! 🎲" : "Ask a question..."}
            className={`flex-1 p-3 outline-none transition-all ${
              theme === ThemeMode.FUN ? 'rounded-full border-4 border-purple-300 focus:border-purple-500 bg-white' :
              theme === ThemeMode.EXAM ? 'rounded-none border border-slate-400 focus:bg-white bg-slate-50 font-mono' :
              'rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400'
            }`}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-3 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
              theme === ThemeMode.FUN ? 'rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 w-14 h-14' :
              theme === ThemeMode.EXAM ? 'rounded-none bg-slate-900 text-white hover:bg-slate-800 w-12' :
              'rounded-xl bg-blue-600 text-white hover:bg-blue-700 w-12'
            }`}
          >
            <Send size={theme === ThemeMode.FUN ? 24 : 18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
