import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  Target,
  ArrowRight,
  Sparkles,
  Zap,
  UserCheck
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { useApp } from '../context/AppContext';
import { calculateSummary, getCategoryStats, generateSmartInsights } from '../utils/calculations';
import { getBalanceTrend } from '../data/mockData';
import TransactionModal from '../components/TransactionModal';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import AIAssistant from '../components/AIAssistant';
import FinancialPulse from '../components/FinancialPulse';
import Achievements from '../components/Achievements';
import GoalPlanner from '../components/GoalPlanner';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

const Dashboard = () => {
  const { transactions, role } = useApp();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const summary = calculateSummary(transactions);
  const stats = getCategoryStats(transactions);
  const insights = generateSmartInsights(transactions);
  const balanceTrend = getBalanceTrend(transactions);

  // Group by day for BarChart
  const dailySpending = balanceTrend.slice(-7).map(d => ({
    name: d.date.split(' ')[1],
    amount: Math.floor(Math.random() * 2000) + 500
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="main-content"
    >
      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AIAssistant />
      
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <h1>Smart Dashboard</h1>
            <p>Analyzing your personal finances with AI-powered insights.</p>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 16px', 
            background: 'rgba(245, 158, 11, 0.1)', 
            color: 'var(--warning)',
            borderRadius: '100px',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            fontSize: '12px',
            fontWeight: '800'
          }}>
            <Zap size={14} fill="var(--warning)" /> 12 DAY STREAK
          </div>
        </div>
        {role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Sparkles size={18} /> Quick Add
          </button>
        )}
      </header>

      {/* Welcome Banner */}
      <section className="card" style={{ 
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', 
        border: 'none', 
        marginBottom: '24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '32px',
        overflow: 'hidden',
        position: 'relative',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <div style={{ position: 'relative', zIndex: 2, flex: '1 1 300px' }}>
           <h2 style={{ fontSize: '28px', color: 'white', fontWeight: '800', marginBottom: '12px' }}>Welcome back, {role === 'admin' ? 'Kavya' : 'Guest'}!</h2>
           <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              Your net worth has increased by <strong>₹12,450</strong> this month. You're closer to your savings goal than ever!
           </p>
           <button 
            onClick={() => navigate('/insights')}
            className="btn btn-primary" 
            style={{ background: 'white', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
           >
              Check Savings Plan <ArrowRight size={18} />
           </button>
        </div>
        <div style={{ flex: 0.4, display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 2 }}>
           <img 
            src="/src/assets/growth_illustration.png" 
            alt="Growth Illustration" 
            style={{ width: '220px', height: 'auto', borderRadius: '16px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} 
           />
        </div>
        {/* Background Decorative Blob */}
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '200px', height: '200px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.4 }} />
      </section>

      {/* Summary Cards */}
      <section className="bento-grid">
        <SummaryCard 
          label="Total Balance" 
          value={summary.balance} 
          icon={<DollarSign size={20} />} 
          color="var(--primary)" 
          trend="+12%" 
        />
        <SummaryCard 
          label="Income" 
          value={summary.income} 
          icon={<TrendingUp size={20} />} 
          color="var(--success)" 
          trend="+8%" 
        />
        <SummaryCard 
          label="Expenses" 
          value={summary.expenses} 
          icon={<TrendingDown size={20} />} 
          color="var(--error)" 
          trend="-3%" 
        />
        <SummaryCard 
          label="Savings" 
          value={summary.savings} 
          icon={<Target size={20} />} 
          color="var(--warning)" 
          trend="+15%" 
        />

        {/* Charts Section */}
        <div className="bento-col-8 card" style={{ height: '380px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Balance over time</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrend}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="balance" stroke="var(--primary)" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bento-col-4 card" style={{ height: '380px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Spending categories</h3>
          <div style={{ height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.breakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {stats.breakdown.map((e, i) => <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '12px' }}>
            {stats.breakdown.slice(0, 4).map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                <span style={{ color: 'var(--text-muted)' }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bento-col-4 card" style={{ height: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', width: '100%' }}>Overall Target Progress</h3>
           <div style={{ height: '240px', width: '100%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie 
                      data={[
                        { name: 'Saved', value: summary.savings },
                        { name: 'Remaining', value: 30000 }
                      ]} 
                      cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value"
                    >
                       <Cell fill="var(--success)" />
                       <Cell fill="rgba(0,0,0,0.05)" />
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                 <div style={{ fontSize: '28px', fontWeight: '800' }}>82%</div>
                 <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Of Goal</div>
              </div>
           </div>
           <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center', lineHeight: '1.4' }}>
              You are <strong>₹5,400</strong> away from your monthly savings record!
           </p>
        </div>

        {/* EXTRA: Daily Spending Bar Chart */}
        <div className="bento-col-4 card" style={{ height: '380px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Daily Spending</h3>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySpending}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                 <YAxis hide />
                 <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                 <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '20px', lineHeight: '1.4' }}>
             Spendings are 5% lower this week compared to last week.
          </p>
        </div>

        {/* EXTRA: Budget Goals / Progress */}
        <div className="bento-col-8 card" style={{ height: '380px' }}>
           <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px' }}>Monthly Budget Goals</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <BudgetProgress label="Food & Dining" spent={15400} total={20000} color="var(--primary)" />
              <BudgetProgress label="Transport" spent={4200} total={5000} color="var(--success)" />
              <BudgetProgress label="Entertainment" spent={8900} total={10000} color="var(--warning)" />
              <BudgetProgress label="Investments" spent={25000} total={30000} color="var(--info)" />
           </div>
        </div>

        {/* Quick Insights */}
        <div className="bento-col-12 card glass-effect" style={{ border: '1px dashed var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--primary)' }}>
              <Sparkles size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>Quick AI Insights</h4>
              <ul style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {insights.map((insight, i) => (
                  <li key={i} style={{ fontSize: '14px', color: 'var(--text-muted)', background: 'var(--bg-main)', padding: '6px 12px', borderRadius: '100px', border: '1px solid var(--border)' }} 
                      dangerouslySetInnerHTML={{ __html: insight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* EXTRA: Financial Health & Virtual Card */}
        <div className="bento-col-4 card" style={{ height: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', width: '100%' }}>Financial Health</h3>
           <FinancialPulse score={82} />
           <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
              Your financial health has improved by <strong>12%</strong> since last month!
           </p>
        </div>

        <div className="bento-col-8 card" style={{ height: '320px', display: 'flex', gap: '32px', alignItems: 'center' }}>
           <div style={{ flex: 0.6 }}>
              <VirtualCard balance={summary.balance} />
           </div>
           <div style={{ flex: 0.4 }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Card Overview</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
                 Your primary FinTrack card was used for <strong>124</strong> transactions this period. Total limit remaining: ₹2,45,000.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                 <button className="btn btn-secondary" style={{ flex: 1 }}>Freeze</button>
                 <button className="btn btn-primary" style={{ flex: 1 }}>Manage</button>
              </div>
           </div>
        </div>

        {/* EXTRA: Goal Planner & Achievements */}
        <div className="bento-col-8 card" style={{ height: '400px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Investment Goal Planner</h3>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>PREDICTIVE AI TOOL</div>
           </div>
           <GoalPlanner currentSavingsRate={summary.savings / 2} />
        </div>

        <div className="bento-col-4 card" style={{ height: '400px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Savings Trophies</h3>
              <div style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '700' }}>2 / 4</div>
           </div>
           <div style={{ flex: 1, overflowY: 'auto' }}>
              <Achievements />
           </div>
        </div>

        {/* EXTRA: Financial Persona Card */}
        <div className="bento-col-12 card glass-effect" style={{ border: '2px solid var(--primary)', background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ padding: '20px', background: 'var(--primary)', color: 'white', borderRadius: '50%', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}>
                 <UserCheck size={32} />
              </div>
              <div style={{ flex: 1 }}>
                 <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>Strategic Saver Persona</h3>
                 <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>You are in the <strong>Top 15%</strong> of savers this month! Your discipline is paying off.</p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                    <div style={{ flex: 1, height: '8px', background: 'var(--bg-main)', borderRadius: '100px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '85%' }}
                         transition={{ duration: 2, ease: 'easeOut' }}
                         style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--info))', borderRadius: '100px' }}
                       />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary)' }}>85th Percentile</span>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

const VirtualCard = ({ balance }) => (
  <motion.div 
    whileHover={{ rotateY: 5, rotateX: -5 }}
    style={{ 
      width: '100%', 
      height: '180px', 
      borderRadius: '24px', 
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      padding: '24px',
      color: 'white',
      boxShadow: '0 20px 40px rgba(79, 70, 229, 0.4)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
     <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '120px', height: '120px', opacity: 0.2, border: '20px solid white', borderRadius: '50%' }} />
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
           <div style={{ fontSize: '11px', opacity: 0.7, letterSpacing: '1px' }}>TOTAL BALANCE</div>
           <div style={{ fontSize: '24px', fontWeight: '800', marginTop: '4px' }}>
              ₹{balance.toLocaleString()}
           </div>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
           <div style={{ width: '32px', height: '22px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
           <div style={{ width: '32px', height: '22px', background: 'rgba(255,255,255,0.4)', borderRadius: '4px' }} />
        </div>
     </div>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '13px' }}>
        <div>
           <div style={{ opacity: 0.6, fontSize: '10px', marginBottom: '2px' }}>CARD HOLDER</div>
           <div style={{ fontWeight: '600', letterSpacing: '1px' }}>KAVYA SHARMA</div>
        </div>
        <div>
           <div style={{ opacity: 0.6, fontSize: '10px', marginBottom: '2px' }}>EXPIRES</div>
           <div style={{ fontWeight: '600' }}>12/28</div>
        </div>
     </div>
  </motion.div>
);

const BudgetProgress = ({ label, spent, total, color }) => {
  const pct = Math.min(100, (spent / total) * 100);
  return (
    <div style={{ width: '100%' }}>
       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
          <span style={{ fontWeight: '600' }}>{label}</span>
          <span style={{ color: 'var(--text-muted)' }}>₹{spent.toLocaleString()} <span style={{ opacity: 0.5 }}>/ ₹{total.toLocaleString()}</span></span>
       </div>
       <div style={{ height: '8px', background: 'var(--bg-main)', borderRadius: '100px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ height: '100%', background: color, borderRadius: '100px' }} 
          />
       </div>
    </div>
  );
};

const SummaryCard = ({ label, value, icon, color, trend }) => (
  <div className="bento-col-3 card card-hover">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
      <div style={{ padding: '8px', background: `${color}15`, color, borderRadius: '10px' }}>{icon}</div>
      <div style={{ fontSize: '11px', fontWeight: '600', color: trend.startsWith('+') ? 'var(--success)' : 'var(--error)' }}>
        {trend}
      </div>
    </div>
    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-muted)' }}>{label}</div>
    <div style={{ fontSize: '24px', fontWeight: '800', marginTop: '4px' }}>
       <AnimatedCounter value={value} prefix="₹" />
    </div>
  </div>
);

export default Dashboard;
