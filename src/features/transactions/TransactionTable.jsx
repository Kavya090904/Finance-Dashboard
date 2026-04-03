import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Edit3, 
  MoreVertical, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  ArrowUpDown,
  Filter,
  CheckCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionTable = () => {
  const { transactions, role, deleteTransaction, filters, setFilters } = useApp();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => setFilters({ ...filters, search: e.target.value });

  return (
    <motion.section 
      className="card" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '0', overflow: 'hidden' }}
    >
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Recent Transactions</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>You have {transactions.length} total transactions.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
            />
            <input 
              type="text" 
              placeholder="Search description..." 
              value={filters.search}
              onChange={handleSearch}
              style={{
                padding: '8px 16px 8px 36px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                width: '240px',
                outline: 'none'
              }}
            />
          </div>
          <button className="btn btn-secondary">
             <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div style={{ minHeight: '400px', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-main)' }}>
              <HeaderCell label="Description" sortKey="description" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Category" sortKey="category" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Date" sortKey="date" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Amount" sortKey="amount" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Status" />
              {role === 'admin' && <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode='popLayout'>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((t) => (
                  <motion.tr 
                    key={t.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}
                  >
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <div style={{ 
                            width: '36px', 
                            height: '36px', 
                            borderRadius: '10px', 
                            background: t.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: t.type === 'income' ? 'var(--success)' : 'var(--error)'
                          }}>
                            {t.type === 'income' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
                         </div>
                         <div style={{ fontWeight: '500', fontSize: '14px' }}>{t.description}</div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t.category}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                        <Calendar size={14} />
                        {format(new Date(t.date), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ 
                        fontWeight: '700', 
                        fontSize: '15px', 
                        color: t.type === 'income' ? 'var(--success)' : 'var(--text-main)' 
                      }}>
                        {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--success)', fontWeight: '600' }}>
                          <CheckCircle size={14} /> Completed
                       </div>
                    </td>
                    {role === 'admin' && (
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{ color: 'var(--text-muted)', background: 'none' }} onClick={() => alert('Edit triggered')}>
                            <Edit3 size={16} />
                          </button>
                          <button 
                            style={{ color: 'var(--error)', background: 'none' }} 
                            onClick={() => deleteTransaction(t.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              ) : (
                <tr>
                   <td colSpan={role === 'admin' ? 6 : 5} style={{ padding: '80px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                         <Clock size={48} style={{ color: 'var(--border)' }} />
                         <p style={{ color: 'var(--text-muted)' }}>No transactions found for your current filters.</p>
                         <button className="btn btn-secondary" onClick={() => setFilters({ search: '', type: 'all', category: 'all', dateRange: 'all' })}>
                           Clear Filters
                        </button>
                      </div>
                   </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Showing {sortedTransactions.length} of {transactions.length} rows</div>
        <div style={{ display: 'flex', gap: '8px' }}>
           <button className="btn btn-secondary" style={{ padding: '6px 12px' }}>Previous</button>
           <button className="btn btn-secondary" style={{ padding: '6px 12px', background: 'var(--border)' }}>Next</button>
        </div>
      </div>
    </motion.section>
  );
};

const HeaderCell = ({ label, sortKey, currentSort, onSort }) => (
  <th style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--secondary)', cursor: sortKey ? 'pointer' : 'default' }} onClick={() => sortKey && onSort(sortKey)}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {label}
      {sortKey && (
        currentSort?.key === sortKey ? 
        (currentSort.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : 
        <ArrowUpDown size={12} style={{ opacity: 0.3 }} />
      )}
    </div>
  </th>
);

export default TransactionTable;
