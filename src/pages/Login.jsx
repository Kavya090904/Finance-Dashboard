import React, { useState } from 'react';
import { Wallet, ShieldCheck, User, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState('admin');

  const handleEnter = () => {
    login(selectedRole);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #1e1b4b 0%, #020617 100%)',
      color: 'white',
      overflow: 'hidden'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: '400px',
          padding: '40px',
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ 
          background: 'var(--primary)', 
          padding: '16px', 
          borderRadius: '16px',
          marginBottom: '20px',
          boxShadow: '0 0 30px var(--primary)'
        }}>
          <Wallet size={48} />
        </div>
        
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>FinTrack</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '32px' }}>
          Welcome! Select your role to access the dashboard.
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          <RoleCard 
            active={selectedRole === 'admin'} 
            onClick={() => setSelectedRole('admin')}
            icon={<ShieldCheck size={20} />} 
            label="Administrator" 
            desc="Full access to manage transactions"
          />
          <RoleCard 
            active={selectedRole === 'viewer'} 
            onClick={() => setSelectedRole('viewer')}
            icon={<User size={20} />} 
            label="Viewer" 
            desc="Read-only access to charts & trends"
          />
        </div>

        <button 
          onClick={handleEnter}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: '700' }}
        >
          Enter Dashboard <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </button>
      </motion.div>
    </div>
  );
};

const RoleCard = ({ active, onClick, icon, label, desc }) => (
  <div 
    onClick={onClick}
    style={{
      padding: '16px',
      borderRadius: '12px',
      border: `2px solid ${active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)'}`,
      background: active ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'all 0.2s ease',
      textAlign: 'left'
    }}
  >
    <div style={{ 
      padding: '8px', 
      borderRadius: '8px', 
      background: active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
      color: active ? 'white' : 'var(--text-muted)'
    }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: '700', fontSize: '14px', color: active ? 'white' : 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>{desc}</div>
    </div>
  </div>
);

export default Login;
