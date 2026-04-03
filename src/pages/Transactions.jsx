import React from 'react';
import { motion } from 'framer-motion';
import TransactionTable from '../components/TransactionTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, ArrowDownRight, ArrowUpRight, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TransactionsPage = () => {
  const { transactions } = useApp();

  const last7Days = [...new Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toISOString().split('T')[0];
    const total = transactions
      .filter(t => t.date.split('T')[0] === dayStr && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return { name: d.toLocaleDateString('en-IN', { weekday: 'short' }), amount: total };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="main-content"
    >
      <header className="dashboard-header" style={{ marginBottom: '32px' }}>
        <div>
          <h1>Transactions</h1>
          <p>Analyzing {transactions.length} records of your financial activity.</p>
        </div>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
         <div className="card" style={{ height: '220px', gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Recent Expense Trends</h3>
               <div style={{ fontSize: '11px', color: 'var(--success)', background: 'var(--bg-main)', padding: '4px 8px', borderRadius: '4px' }}>
                 Weekly Average: ₹{Math.floor(last7Days.reduce((a,b)=>a+b.amount,0)/7).toLocaleString()}
               </div>
             </div>
             <div style={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={last7Days}>
                      <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                      <Tooltip contentStyle={{ background: 'var(--bg-main)', border: '1px solid var(--border)' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
         </div>
         <div className="card glass-effect" style={{ border: '2px solid var(--primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Smart Search</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              You can search by category, merchant, or tags to find any transaction across your history.
            </p>
         </div>
      </div>

      <TransactionTable />
    </motion.div>
  );
};

export default TransactionsPage;
