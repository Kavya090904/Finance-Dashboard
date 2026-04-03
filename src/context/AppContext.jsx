import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MOCK_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Login / Role state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Role state (for login)
  const [role, setRole] = useState(user?.role || 'viewer'); // 'admin' or 'viewer'
  
  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark'); // Default to dark for premium feel
  
  // Transactions state
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  // Filter and Search state
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Actions
  const login = (role) => {
    const userData = { role, name: role === 'admin' ? 'Kavya (Admin)' : 'Guest Viewer' };
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addTransaction = (t) => {
    if (role !== 'admin') return;
    setTransactions(prev => [{ ...t, id: Math.random().toString(36).substr(2, 9) }, ...prev]);
  };

  const deleteTransaction = (id) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         t.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === 'all' || t.type === filters.type;
      const matchCategory = filters.category === 'all' || t.category === filters.category;
      return matchSearch && matchType && matchCategory;
    });
  }, [transactions, filters]);

  const value = {
    user, login, logout,
    role, setRole,
    theme, toggleTheme,
    transactions, filteredTransactions,
    addTransaction, deleteTransaction,
    filters, setFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
