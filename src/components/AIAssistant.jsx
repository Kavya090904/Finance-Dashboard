import React, { useState } from 'react';
import { Sparkles, MessageCircle, X, ArrowRight, Zap, TrendingUp, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import aiAvatar from '../assets/ai_avatar.png';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm your Smart Finance Assistant. I've analyzed your **Housing** and **Food** expenses for March." },
    { role: 'ai', text: "Would you like to see how you can save **₹5,400** by optimizing your subscription plans?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const avatarUrl = aiAvatar;

  const suggestions = [
    { icon: <Zap size={14} />, text: "How can I save ₹2,000 more?" },
    { icon: <TrendingUp size={14} />, text: "What's my monthly trend?" },
    { icon: <ShieldAlert size={14} />, text: "Any irregular expenses?" }
  ];

  const handleSuggestion = (text) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'ai', text: "Great question! Analyzing your trends now... Looks like your savings rate is 15% higher than last year! 📈" }]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Bubble */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '64px',
          height: '64px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          color: 'white',
          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          border: '2px solid rgba(255,255,255,0.2)'
        }}
      >
         <MessageCircle size={32} />
         <motion.div 
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ repeat: Infinity, duration: 2 }}
           style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', border: '2px solid white' }} 
         />
      </motion.button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className="glass-effect"
            style={{
              position: 'fixed',
              bottom: '110px',
              right: '32px',
              width: '380px',
              height: '520px',
              borderRadius: '24px',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <motion.div 
                      animate={{ boxShadow: ['0 0 0px var(--primary)', '0 0 15px var(--primary)', '0 0 0px var(--primary)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: '44px', height: '44px', borderRadius: '14px', overflow: 'hidden', border: '2px solid var(--primary)' }}
                    >
                       <img src={avatarUrl} alt="AI Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                    <div>
                      <div style={{ fontWeight: '800', fontSize: '16px' }}>FinX Assistant</div>
                      <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '700' }}>AI ANALYZER ONLINE</div>
                    </div>
                 </div>
                 <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-muted)', background: 'none' }}><X size={20} /></button>
               </div>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               {messages.map((m, i) => (
                 <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  style={{ 
                    padding: '14px 18px', 
                    borderRadius: m.role === 'ai' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    background: m.role === 'ai' ? 'var(--bg-main)' : 'var(--primary)',
                    color: m.role === 'ai' ? 'var(--text-main)' : 'white',
                    maxWidth: '85%',
                    alignSelf: m.role === 'ai' ? 'flex-start' : 'flex-end',
                    fontSize: '13px',
                    lineHeight: '1.5'
                  }}
                  dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                 />
               ))}

               {isTyping && (
                 <div style={{ background: 'var(--bg-main)', padding: '10px 16px', borderRadius: '16px', width: 'fit-content', display: 'flex', gap: '4px' }}>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                 </div>
               )}
            </div>

            <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                 {suggestions.map((s, i) => (
                   <button key={i} onClick={() => handleSuggestion(s.text)} style={{ 
                     padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '100px',
                     fontSize: '11px', fontWeight: '600', color: 'var(--primary)', cursor: 'pointer'
                   }} className="card-hover">
                      {s.icon} {s.text}
                   </button>
                 ))}
               </div>
               <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="Ask AI anything..." style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-main)', boxSizing: 'border-box' }} />
                  <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }}>
                    <Sparkles size={20} />
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
