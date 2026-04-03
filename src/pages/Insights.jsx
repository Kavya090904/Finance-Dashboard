import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Lightbulb, 
  Coffee, 
  ShoppingBag, 
  Plane, 
  AlertCircle,
  BarChart2,
  PieChart as PieChartIcon,
  Search,
  Sparkles
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell
} from 'recharts';
import { useApp } from '../context/AppContext';
import { getCategoryStats, getMonthlyComparison, calculateSummary } from '../utils/calculations';
import { motion } from 'framer-motion';
import SpendingRule from '../components/SpendingRule';

const Insights = () => {
  const { transactions } = useApp();
  const stats = getCategoryStats(transactions);
  const comparison = getMonthlyComparison(transactions);
  const summary = calculateSummary(transactions);

  const radarData = stats.breakdown.slice(0, 6).map(s => ({
    subject: s.name,
    A: s.value,
    fullMark: stats.highest.value + 5000,
  }));

  const historyData = [
    { month: 'Oct', income: 95000, expenses: 62000 },
    { month: 'Nov', income: 98000, expenses: 65000 },
    { month: 'Dec', income: 105000, expenses: 78000 },
    { month: 'Jan', income: 100000, expenses: 60000 },
    { month: 'Feb', income: 102000, expenses: 58000 },
    { month: 'Mar', income: 100000, expenses: 60000 },
  ];

  const assetData = [
    { name: 'Liquid Cash', value: 45000, color: 'var(--primary)' },
    { name: 'Fixed Deposits', value: 120000, color: 'var(--success)' },
    { name: 'Mutual Funds', value: 85000, color: 'var(--info)' },
    { name: 'Crypto', value: 12000, color: 'var(--warning)' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="main-content"
    >
      <header className="dashboard-header">
        <div>
          <h1>Smart Insights</h1>
          <p>Deep dive into your financial behavior and optimization suggestions.</p>
        </div>
      </header>

      <section className="bento-grid">
        {/* Executive AI Summary Card */}
        <motion.div variants={itemVariants} className="bento-col-12 card glass-effect" style={{ borderLeft: '4px solid var(--primary)', background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.03) 0%, transparent 100%)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '12px', background: 'var(--primary)', color: 'white', borderRadius: '12px' }}>
                 <Sparkles size={24} />
              </div>
              <div style={{ flex: 1 }}>
                 <h2 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Executive AI Summary</h2>
                 <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', lineHeight: '1.5' }}>
                   "Your financial health is **stable**. While your **Shopping** spend rose by 12% this week, your discipline in **Dining Out** has offset the cost. You're on track to save **₹42,000** by month-end."
                 </p>
              </div>
           </div>
        </motion.div>

        {/* Income vs Expenses Comparison Chart */}
        <motion.div variants={itemVariants} className="bento-col-12 card" style={{ height: '350px', marginBottom: '8px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Income vs Expenses History</h3>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: '600' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--primary)' }} /> Income
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--error)' }} /> Expenses
                 </div>
              </div>
           </div>
           <div style={{ height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="income" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={3} />
                  <Area type="monotone" dataKey="expenses" stroke="var(--error)" fill="var(--error)" fillOpacity={0.1} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </motion.div>

        {/* Spending Analysis Radar */}
        <motion.div variants={itemVariants} className="bento-col-8 card glass-effect" style={{ height: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Spending Profile</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOP 6 CATEGORIES</span>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <Radar name="Spending" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Asset Allocation Visual */}
        <motion.div variants={itemVariants} className="bento-col-4 card" style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <h3 style={{ fontSize: '16px', fontWeight: '800', width: '100%', marginBottom: '24px' }}>Asset Allocation</h3>
           <div style={{ height: '220px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={assetData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                       {assetData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div style={{ width: '100%', marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {assetData.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: a.color }} />
                   <span style={{ color: 'var(--text-muted)' }}>{a.name}</span>
                </div>
              ))}
           </div>
        </motion.div>

        {/* 50/30/20 Rule Analysis */}
        <motion.div variants={itemVariants} className="bento-col-4 card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '10px' }}>
                 <TrendingUp size={18} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Budget Rules</h3>
           </div>
           <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              Analyzing your spending against the <strong>50/30/20 Rule</strong>. Are you within your limits?
           </p>
           <SpendingRule income={summary.income} expenses={summary.expenses} savings={summary.savings} />
        </motion.div>

        {/* Monthly Comparison */}
        <motion.div variants={itemVariants} className="bento-col-12 card" style={{ display: 'flex', alignItems: 'center', gap: '48px', padding: '32px', flexWrap: 'wrap' }}>
           <div style={{ flex: '1 1 200px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Month-over-Month</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                 Your spending this month is <strong>{getMonthlyComparison(transactions).increase > 0 ? 'higher' : 'lower'}</strong> than last month.
              </p>
           </div>
           <div style={{ flex: '2 1 400px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <ComparisonProgress label="Food" current={15400} last={12000} />
              <ComparisonProgress label="Shopping" current={8200} last={9500} />
              <ComparisonProgress label="Transport" current={4000} last={4200} />
           </div>
        </motion.div>

        {/* Merchant Leaderboard */}
        <motion.div variants={itemVariants} className="bento-col-12 card" style={{ padding: '32px' }}>
           <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px' }}>Top Spending Merchants</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {[
                { name: 'Amazon', amount: 12400, color: '#FF9900' },
                { name: 'Zomato', amount: 8200, color: '#CB202D' },
                { name: 'Uber', amount: 4500, color: '#000000' },
                { name: 'Starbucks', amount: 3200, color: '#00704A' },
                { name: 'Netflix', amount: 1499, color: '#E50914' }
              ].map((m, i) => (
                <div key={i} style={{ padding: '16px', borderRadius: '16px', background: 'var(--bg-main)', border: '1px solid var(--border)' }}>
                   <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>{m.name}</div>
                   <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>₹{m.amount.toLocaleString()}</div>
                   <div style={{ height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(m.amount / 12400) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        style={{ height: '100%', background: m.color }} 
                      />
                   </div>
                </div>
              ))}
           </div>
        </motion.div>

        {/* Smart Suggestions */}
        <motion.div variants={itemVariants} className="bento-col-12 card glass-effect" style={{ borderTop: '4px solid var(--warning)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Lightbulb size={24} color="var(--warning)" />
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Smart Optimizations</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <SuggestionCard 
              icon={<ShoppingBag size={20} />} 
              title="Shopping Optimization" 
              text="You are overspending on shopping. Try setting a budget." 
              type="warning"
            />
            <SuggestionCard 
              icon={<Coffee size={20} />} 
              title="Lifestyle Changes" 
              text="Reducing food expenses could save you approx ₹800 month." 
              type="success"
            />
            <SuggestionCard 
              icon={<AlertCircle size={20} />} 
              title="Budget Alert" 
              text="Current spending rate is higher than usual. Avoid non-essentials." 
              type="info"
            />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

const ComparisonProgress = ({ label, current, last }) => {
  const diff = ((current - last) / last) * 100;
  return (
    <div style={{ flex: 1, padding: '16px', background: 'var(--bg-main)', borderRadius: '16px', border: '1px solid var(--border)' }}>
       <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>{label}</div>
       <div style={{ fontSize: '18px', fontWeight: '800', color: diff > 0 ? 'var(--error)' : 'var(--success)' }}>
          {diff > 0 ? '+' : ''}{Math.floor(diff)}%
       </div>
       <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '12px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.abs(diff))}%` }}
            transition={{ duration: 1 }}
            style={{ height: '100%', background: diff > 0 ? 'var(--error)' : 'var(--success)' }} 
          />
       </div>
    </div>
  );
};

const SuggestionCard = ({ icon, title, text, type }) => {
  const color = type === 'warning' ? 'var(--warning)' : type === 'success' ? 'var(--success)' : 'var(--info)';
  return (
    <div style={{
      padding: '20px',
      borderRadius: '16px',
      background: 'var(--bg-main)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ padding: '8px', background: `${color}15`, color, borderRadius: '8px', width: 'fit-content' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: '800', fontSize: '15px', marginBottom: '4px' }}>{title}</div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{text}</p>
      </div>
    </div>
  );
};

export default Insights;
