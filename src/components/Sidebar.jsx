import React from 'react';
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Settings, 
  Moon, 
  Sun, 
  User, 
  ShieldCheck, 
  LogOut,
  Wallet
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { theme, toggleTheme, role, setRole } = useApp();

  return (
    <aside className="glass-effect" style={{ 
      width: '260px', 
      minHeight: '100vh', 
      borderRight: '1px solid var(--border)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: 'var(--primary)', 
          padding: '8px', 
          borderRadius: '10px',
          color: 'white'
        }}>
          <Wallet size={24} />
        </div>
        <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          Zorvyn <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '500' }}>v1.0</span>
        </span>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <SidebarItem icon={<ArrowUpRight size={20} />} label="Income" />
          <SidebarItem icon={<ArrowDownLeft size={20} />} label="Expenses" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </ul>
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="role-switcher">
          <button 
            className={`role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <ShieldCheck size={14} style={{ marginRight: '4px' }} /> Admin
          </button>
          <button 
            className={`role-tab ${role === 'viewer' ? 'active' : ''}`}
            onClick={() => setRole('viewer')}
          >
            <User size={14} style={{ marginRight: '4px' }} /> Viewer
          </button>
        </div>

        <button 
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px',
            borderRadius: '12px',
            background: 'var(--bg-main)',
            border: '1px solid var(--border)',
            color: 'var(--text-main)',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <div style={{ 
          marginTop: '8px',
          padding: '16px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)',
          color: 'white',
          fontSize: '13px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <span style={{ opacity: 0.8 }}>Logged in as</span>
          <span style={{ fontWeight: '600', fontSize: '15px' }}>{role === 'admin' ? 'Kavya (Admin)' : 'Guest Viewer'}</span>
          <button style={{ 
            marginTop: '4px',
            background: 'rgba(255,255,255,0.2)',
            padding: '6px',
            borderRadius: '6px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
           }}>
             <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active }) => (
  <li>
    <a href="#" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      borderRadius: '12px',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      background: active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
      fontWeight: active ? '600' : '500',
      transition: 'all 0.2s ease',
      fontSize: '15px'
    }}>
      {icon}
      {label}
    </a>
  </li>
);

export default Sidebar;
