import React from 'react';
import { motion } from 'framer-motion';

const SpendingRule = ({ income = 100000, expenses = 60000, savings = 40000 }) => {
  // Mock breakdown based on 50/30/20 rule
  const needs = Math.floor(income * 0.5);
  const wants = Math.floor(income * 0.3);
  const safety = Math.floor(income * 0.2);

  const actualNeeds = Math.floor(expenses * 0.7); // Mock
  const actualWants = Math.floor(expenses * 0.3); // Mock
  
  const sectors = [
    { label: 'Needs (50%)', target: needs, actual: actualNeeds, color: 'var(--primary)' },
    { label: 'Wants (30%)', target: wants, actual: actualWants, color: 'var(--warning)' },
    { label: 'Savings (20%)', target: safety, actual: savings, color: 'var(--success)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {sectors.map((s, i) => {
        const pct = Math.min(100, (s.actual / s.target) * 100);
        return (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
               <span style={{ fontWeight: '700' }}>{s.label}</span>
               <span style={{ color: 'var(--text-muted)' }}>₹{s.actual.toLocaleString()} / ₹{s.target.toLocaleString()}</span>
            </div>
            <div style={{ height: '10px', background: 'var(--bg-main)', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${pct}%` }}
                 transition={{ duration: 1.5, delay: i * 0.2 }}
                 style={{ height: '100%', background: s.color, borderRadius: '10px' }}
               />
            </div>
            {pct > 100 && <div style={{ fontSize: '10px', color: 'var(--error)', marginTop: '4px', textAlign: 'right', fontWeight: '700' }}>OVER LIMIT!</div>}
          </div>
        );
      })}
    </div>
  );
};

export default SpendingRule;
