import React from 'react';
import { 
  Wallet, 
  BarChart, 
  PieChart, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  LayoutDashboard,
  ArrowRightLeft,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme, user, logout, role, setRole } = useApp();

  return (
    <nav className="glass-effect navbar-container" style={{
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      marginBottom: '24px',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
            padding: '8px', 
            borderRadius: '10px',
            color: 'white'
          }}>
            <Wallet size={20} />
          </div>
          <span className="logo-text" style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            FinTrack
          </span>
        </div>

        <div className="main-nav" style={{ display: 'flex', gap: '8px' }}>
          <NavBtn to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavBtn to="/transactions" icon={<ArrowRightLeft size={18} />} label="Transactions" />
          <NavBtn to="/insights" icon={<BarChart size={18} />} label="Insights" />
        </div>
      </div>

      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="role-switcher" style={{ background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
          <button 
            className={`role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
            style={{ fontSize: '12px' }}
          >
            Admin
          </button>
          <button 
            className={`role-tab ${role === 'viewer' ? 'active' : ''}`}
            onClick={() => setRole('viewer')}
            style={{ fontSize: '12px' }}
          >
            Viewer
          </button>
        </div>

        <button 
          onClick={toggleTheme}
          style={{ 
            padding: '8px', 
            borderRadius: '10px', 
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '4px 12px 4px 4px', 
          borderRadius: '100px', 
          border: '1px solid var(--border)',
          background: 'var(--bg-main)'
        }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '12px'
          }}>
            {user?.name.charAt(0)}
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>{user?.name.split(' ')[0]}</span>
          <button onClick={logout} style={{ display: 'flex', color: 'var(--error)', background: 'none' }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavBtn = ({ to, icon, label }) => (
  <NavLink 
    to={to} 
    style={({ isActive }) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
      background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
    })}
  >
    {icon}
    {label}
  </NavLink>
);

export default Navbar;
