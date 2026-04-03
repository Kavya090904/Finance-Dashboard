import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, ShieldCheck, Zap } from 'lucide-react';

const Achievements = () => {
  const milestones = [
    { title: "First Save", desc: "Saved over ₹5k in one go", icon: <Star size={18} />, color: "#f59e0b", done: true },
    { title: "Budget King", desc: "Stayed under food budget", icon: <Trophy size={18} />, color: "#6366f1", done: true },
    { title: "Safety Net", desc: "Emergency fund at 50%", icon: <ShieldCheck size={18} />, color: "#10b981", done: false },
    { title: "Daily Pulse", desc: "7-day tracking streak", icon: <Zap size={18} />, color: "#ef4444", done: false }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      {milestones.map((m, i) => (
        <motion.div 
          key={i}
          whileHover={{ scale: 1.05 }}
          style={{ 
            padding: '16px', 
            borderRadius: '16px', 
            background: 'var(--bg-main)', 
            border: `1px solid ${m.done ? m.color : 'var(--border)'}`,
            opacity: m.done ? 1 : 0.6,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
           <div style={{ 
             padding: '8px', 
             borderRadius: '10px', 
             background: m.done ? `${m.color}20` : 'rgba(255,255,255,0.05)',
             color: m.done ? m.color : 'var(--text-muted)'
           }}>
             {m.icon}
           </div>
           <div>
              <div style={{ fontSize: '13px', fontWeight: '800' }}>{m.title}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{m.desc}</div>
           </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Achievements;
