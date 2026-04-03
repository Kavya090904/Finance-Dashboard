import React, { useState } from 'react';
import { X, PlusCircle, MinusCircle, DollarSign, Tag, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';

const TransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction, role } = useApp();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role !== 'admin') return;

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString()
    });
    onClose();
    setFormData({
      description: '',
      amount: '',
      category: 'Food',
      type: 'expense'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)'
        }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="card" 
            style={{ width: '450px', padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Add New Transaction</h2>
              <button onClick={onClose} style={{ color: 'var(--text-muted)' }}><X /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', padding: '4px', background: 'var(--bg-main)', borderRadius: '10px', border: '1px solid var(--border)' }}>
                 <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'income'})}
                  style={{ 
                    flex: 1, 
                    padding: '8px', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: formData.type === 'income' ? 'var(--bg-card)' : 'transparent',
                    color: formData.type === 'income' ? 'var(--success)' : 'var(--text-muted)',
                    boxShadow: formData.type === 'income' ? 'var(--shadow)' : 'none'
                  }}
                 >
                   <PlusCircle size={16} /> Income
                 </button>
                 <button 
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  style={{ 
                    flex: 1, 
                    padding: '8px', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: formData.type === 'expense' ? 'var(--bg-card)' : 'transparent',
                    color: formData.type === 'expense' ? 'var(--error)' : 'var(--text-muted)',
                    boxShadow: formData.type === 'expense' ? 'var(--shadow)' : 'none'
                  }}
                 >
                   <MinusCircle size={16} /> Expense
                 </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Description</label>
                <div style={{ position: 'relative' }}>
                  <Info size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    required
                    type="text" 
                    placeholder="E.g., Groceries" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-main)', boxSizing: 'border-box' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Amount</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      required
                      type="number" 
                      placeholder="0.00" 
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-main)', boxSizing: 'border-box' }} 
                    />
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>Category</label>
                  <div style={{ position: 'relative' }}>
                    <Tag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-main)', boxSizing: 'border-box', appearance: 'none' }} 
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                 <button type="button" onClick={onClose} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                 <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Transaction</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
