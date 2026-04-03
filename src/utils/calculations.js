import { format, subMonths, isSameMonth } from 'date-fns';

export const calculateSummary = (transactions) => {
  const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = income - expenses;
  // Let's assume savings is roughly 20% of income for a base, or income - expense if positive
  const savings = Math.max(0, balance * 0.4); 
  
  return { income, expenses, balance, savings };
};

export const getCategoryStats = (transactions) => {
  const stats = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    stats[t.category] = (stats[t.category] || 0) + t.amount;
  });
  
  const sorted = Object.entries(stats).map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
    
  return {
    breakdown: sorted,
    highest: sorted[0] || { name: 'None', value: 0 },
    lowest: sorted[sorted.length - 1] || { name: 'None', value: 0 }
  };
};

export const getMonthlyComparison = (transactions) => {
  const now = new Date();
  const lastMonth = subMonths(now, 1);
  
  const currentTotal = transactions
    .filter(t => t.type === 'expense' && isSameMonth(new Date(t.date), now))
    .reduce((a, b) => a + b.amount, 0);
    
  const lastTotal = transactions
    .filter(t => t.type === 'expense' && isSameMonth(new Date(t.date), lastMonth))
    .reduce((a, b) => a + b.amount, 0);
    
  let pct = 0;
  if (lastTotal > 0) {
    pct = ((currentTotal - lastTotal) / lastTotal) * 100;
  }
  
  return {
    current: currentTotal,
    last: lastTotal,
    increase: pct.toFixed(1)
  };
};

export const generateSmartInsights = (transactions) => {
  const { highest } = getCategoryStats(transactions);
  const { current, last, increase } = getMonthlyComparison(transactions);
  
  const insights = [];
  
  if (highest.name !== 'None') {
    insights.push(`You spent most on **${highest.name}** this month 🍔`);
  }
  
  if (parseFloat(increase) > 0) {
    insights.push(`Expenses increased by **${increase}%** compared to last month 📊`);
  } else if (parseFloat(increase) < 0) {
    insights.push(`Great job! Expenses decreased by **${Math.abs(increase)}%** this month 🎉`);
  }
  
  const savings = calculateSummary(transactions).savings;
  if (savings > 0) {
    insights.push(`You saved **₹${savings.toLocaleString()}** this month 💡`);
  }
  
  return insights;
};
