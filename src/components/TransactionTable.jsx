import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Edit3, 
  Plus, 
  Filter,
  ArrowUp, 
  ArrowDown, 
  ArrowUpDown,
  Calendar,
  MoreVertical,
  CheckCircle,
  FileText,
  Download
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

import TransactionModal from './TransactionModal';

const TransactionTable = () => {
  const { filteredTransactions, role, deleteTransaction, filters, setFilters } = useApp();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    alert("System: Report for " + filteredTransactions.length + " transactions is being generated...");
  };

  const avgSpend = filteredTransactions.length > 0 
    ? Math.floor(filteredTransactions.reduce((acc, curr) => acc + (curr.type === 'expense' ? curr.amount : 0), 0) / filteredTransactions.length)
    : 0;

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Transaction Summary Header */}
      <div style={{ padding: '24px', background: 'rgba(99, 102, 241, 0.05)', display: 'flex', gap: '48px', borderBottom: '1px solid var(--border)' }}>
         <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>AVG. TRANSACTION</div>
            <div style={{ fontSize: '18px', fontWeight: '800' }}>₹{avgSpend.toLocaleString()}</div>
         </div>
         <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>SELECTED VOLUME</div>
            <div style={{ fontSize: '18px', fontWeight: '800' }}>{filteredTransactions.length} Items</div>
         </div>
         <div style={{ marginLeft: 'auto' }}>
            <button 
              onClick={handleExport}
              className="btn btn-secondary" 
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
               <Download size={16} /> Export Report
            </button>
         </div>
      </div>

      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-main)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              style={{
                width: '300px', padding: '10px 16px 10px 40px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '14px', outline: 'none'
              }}
            />
          </div>
          <select 
             value={filters.type}
             onChange={(e) => setFilters({...filters, type: e.target.value})}
             style={{ padding: '10px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '13px' }}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        {role === 'admin' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary" 
            style={{ borderRadius: '12px' }}
          >
            <Plus size={18} /> New Transaction
          </button>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: 'rgba(99, 102, 241, 0.03)' }}>
              <HeaderCell label="Date" sortKey="date" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Description" sortKey="description" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Category" sortKey="category" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Amount" sortKey="amount" currentSort={sortConfig} onSort={requestSort} />
              <HeaderCell label="Type" />
              {role === 'admin' && <th style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode='popLayout'>
              {sortedTransactions.map(t => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={t.id} 
                  style={{ borderBottom: '1px solid var(--border)', fontSize: '14px' }}
                >
                  <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} />
                      {format(new Date(t.date), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '600' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       {t.description}
                       {t.type === 'expense' && (
                         <div style={{ padding: '4px', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--text-muted)' }} title="Receipt Attached">
                            <FileText size={10} />
                         </div>
                       )}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ background: 'var(--bg-main)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', border: '1px solid var(--border)' }}>
                      {t.category}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '800' }}>
                    <div style={{ color: t.type === 'income' ? 'var(--success)' : 'var(--text-main)' }}>
                      {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span className={`badge badge-${t.type}`}>{t.type}</span>
                  </td>
                  {role === 'admin' && (
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button 
                          onClick={() => alert("Edit mode: Currently restricted in this demo.")}
                          style={{ color: 'var(--text-muted)', background: 'none' }}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          style={{ color: 'var(--error)', background: 'none' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {sortedTransactions.length === 0 && (
        <div style={{ padding: '100px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <FileText size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
          <p style={{ fontSize: '16px', fontWeight: '500' }}>No transactions found 😕</p>
          <p style={{ fontSize: '13px' }}>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

const HeaderCell = ({ label, sortKey, currentSort, onSort }) => (
  <th 
    style={{ padding: '16px 24px', fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', cursor: sortKey ? 'pointer' : 'default' }}
    onClick={() => sortKey && onSort(sortKey)}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {label}
      {sortKey && (
        currentSort.key === sortKey ? 
        (currentSort.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : 
        <ArrowUpDown size={12} style={{ opacity: 0.2 }} />
      )}
    </div>
  </th>
);

export default TransactionTable;
