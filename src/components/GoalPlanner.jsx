import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Calendar, Target, TrendingUp } from 'lucide-react';

const GoalPlanner = ({ currentSavingsRate = 12450 }) => {
  const [goalAmount, setGoalAmount] = useState(500000);
  
  const monthsToGoal = Math.ceil(goalAmount / currentSavingsRate);
  const years = Math.floor(monthsToGoal / 12);
  const months = monthsToGoal % 12;

  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + monthsToGoal);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
         <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>SET YOUR ACHIEVEMENT GOAL</label>
         <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: '800', color: 'var(--primary)' }}>₹</span>
            <input 
              type="number" 
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              style={{
                width: '100%', padding: '16px 16px 16px 40px', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-main)',
                fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', outline: 'none'
              }}
            />
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
         <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ color: 'var(--primary)', marginBottom: '12px' }}><Calendar size={20} /></div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Estimated Time</div>
            <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>
               {years > 0 ? `${years}y ` : ''}{months}m
            </div>
         </div>

         <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ color: 'var(--success)', marginBottom: '12px' }}><Target size={20} /></div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Target Completion</div>
            <div style={{ fontSize: '18px', fontWeight: '800', marginTop: '4px' }}>
               {targetDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </div>
         </div>
      </div>

      <div className="glass-effect" style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
            <TrendingUp size={14} /> AI INSIGHT
         </div>
         <p style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '8px', lineHeight: '1.5' }}>
            At your current efficiency, you reach this goal faster than **74%** of similar profiles! Keep up the momentum.
         </p>
      </div>
    </div>
  );
};

export default GoalPlanner;
