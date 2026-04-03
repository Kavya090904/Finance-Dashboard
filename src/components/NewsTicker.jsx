import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

const NewsTicker = () => {
  const news = [
    { text: "NIFTY 50 gains +0.85% today as tech sector recovers. 📈", trend: 'up' },
    { text: "Gold prices drop to ₹72,400 per 10g. 💰", trend: 'down' },
    { text: "RBI maintains interest rates for the 4th consecutive quarter. 🏛️", trend: 'info' },
    { text: "USD/INR exchange rate stable at ₹83.45. 💵", trend: 'info' },
    { text: "Smart savings tip: Automate 10% of your income to mutual funds! 💡", trend: 'up' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '36px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      zIndex: 999,
      overflow: 'hidden',
      fontSize: '11px',
      fontWeight: '600'
    }}>
      <div style={{
        padding: '0 16px',
        background: 'var(--primary)',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        zIndex: 2,
        boxShadow: '10px 0 20px rgba(0,0,0,0.5)'
      }}>
        LATEST UPDATES
      </div>
      <motion.div 
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex',
          gap: '64px',
          whiteSpace: 'nowrap',
          paddingLeft: '32px'
        }}
      >
        {news.concat(news).map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              color: item.trend === 'up' ? '#10b981' : item.trend === 'down' ? '#ef4444' : '#0ea5e9' 
            }}>
              {item.trend === 'up' ? <TrendingUp size={14} /> : item.trend === 'down' ? <TrendingDown size={14} /> : <Info size={14} />}
            </span>
            {item.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default NewsTicker;
