import React from 'react';
import { motion } from 'framer-motion';

const FinancialPulse = ({ score = 85 }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * (circumference / 2); // Semi-circle

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <svg width="200" height="120" style={{ transform: 'rotate(-180deg)' }}>
        <circle
          cx="100"
          cy="20"
          r={radius}
          fill="transparent"
          stroke="var(--bg-main)"
          strokeWidth="12"
          strokeDasharray={`${circumference / 2} ${circumference}`}
          strokeLinecap="round"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference / 2 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          cx="100"
          cy="20"
          r={radius}
          fill="transparent"
          stroke="url(#pulseGradient)"
          strokeWidth="12"
          strokeDasharray={`${circumference / 2} ${circumference}`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      
      <div style={{ position: 'absolute', bottom: '20px', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)' }}>
          {score}
        </motion.div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--success)', letterSpacing: '1px' }}>VERY GOOD</div>
      </div>
    </div>
  );
};

export default FinancialPulse;
