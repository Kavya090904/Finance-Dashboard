import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Plus, 
  Filter,
  ArrowRight,
  TrendingUp as TrendUpIcon,
  ShoppingBag,
  Home,
  Coffee,
  HeartPlus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { getSpendingBreakdown, getBalanceTrend } from '../../data/mockData';
import { motion } from 'framer-motion';

import TransactionModal from '../../components/TransactionModal';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

const Dashboard = () => {
  const { rawTransactions, role, addTransaction } = useApp();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const income = rawTransactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = rawTransactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  const spendingData = getSpendingBreakdown(rawTransactions);
  const balanceTrend = getBalanceTrend(rawTransactions);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="main-content"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <header className="dashboard-header">
        <div>
          <h1>Finance Dashboard</h1>
          <p>Welcome back! Here's what's happening with your accounts today.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {role === 'admin' && (
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Add Transaction
            </button>
          )}
          <button className="btn btn-secondary">
             <Filter size={18} /> Filters
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bento-grid">
        <StatCard 
          variants={itemVariants}
          label="Total Balance" 
          value={`$${balance.toLocaleString()}`} 
          trend="+12%" 
          icon={<DollarSign size={20} />} 
          color="var(--primary)"
          chartColor="#6366f1"
        />
        <StatCard 
          variants={itemVariants}
          label="Net Income" 
          value={`$${income.toLocaleString()}`} 
          trend="+8%" 
          icon={<TrendingUp size={20} />} 
          color="var(--success)"
          chartColor="#10b981"
        />
        <StatCard 
          variants={itemVariants}
          label="Total Expenses" 
          value={`$${expense.toLocaleString()}`} 
          trend="-3%" 
          icon={<TrendingDown size={20} />} 
          color="var(--error)"
          chartColor="#ef4444"
        />
        <StatCard 
          variants={itemVariants}
          label="Top Category" 
          value={spendingData[0]?.name || 'N/A'} 
          trend={`$${spendingData[0]?.value || 0}`} 
          icon={<CreditCard size={20} />} 
          color="var(--warning)"
          chartColor="#f59e0b"
          sublabel="Highest spending this month"
        />

        {/* Charts Section */}
        <div className="bento-col-8 card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Balance Trend</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span>Last 30 Days</span>
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrend}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bento-col-4 card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>Spending Breakdown</h3>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: 'var(--bg-card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ padding: '12px 0' }}>
             <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
               {spendingData.slice(0, 4).map((item, i) => (
                 <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i] }} />
                    <span style={{ color: 'var(--text-muted)' }}>{item.name}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Dynamic Insights Section */}
        <div className="bento-col-12" style={{ marginTop: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Financial Insights</h3>
          <div className="bento-grid">
            <div className="bento-col-4 card glass-effect" style={{ borderLeft: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', width: 'fit-content', color: 'var(--primary)' }}>
                <TrendUpIcon size={20} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Spending Spike</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Your spending in <strong>{spendingData[0]?.name}</strong> increased by 15% this month compared to last.
              </p>
            </div>

            <div className="bento-col-4 card glass-effect" style={{ borderLeft: '4px solid var(--success)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', width: 'fit-content', color: 'var(--success)' }}>
                <DollarSign size={20} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Monthly Comparison</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                You've saved <strong>$450</strong> more this month than the average of the last 3 months. Great job!
              </p>
            </div>

            <div className="bento-col-4 card glass-effect" style={{ borderLeft: '4px solid var(--warning)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', width: 'fit-content', color: 'var(--warning)' }}>
                <Coffee size={20} />
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Recommendation</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                By reducing "Daily Coffee" expenses, you could reach your <strong>Savings Goal</strong> 2 weeks earlier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const StatCard = ({ label, value, trend, icon, color, chartColor, variants, sublabel }) => (
  <motion.div 
    className="bento-col-3 bento-col-lg-3 card card-hover" 
    style={{ minWidth: 'calc(25% - 12px)', flex: 1 }}
    variants={variants}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div style={{ padding: '8px', borderRadius: '10px', background: `${color}15`, color }}>
        {icon}
      </div>
      <div style={{ fontSize: '12px', fontWeight: '600', color: trend.startsWith('+') ? 'var(--success)' : 'var(--error)' }}>
        {trend}
      </div>
    </div>
    <div style={{ height: '20px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '500' }}>{label}</div>
    <div style={{ fontSize: '24px', fontWeight: '700', marginTop: '4px' }}>{value}</div>
    {sublabel && <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{sublabel}</div>}
  </motion.div>
);

export default Dashboard;
