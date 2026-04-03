import { subDays, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const CATEGORIES = [
  "Housing", "Food", "Transport", "Shopping", "Entertainment", "Healthcare", "Salary", "Investment", "Freelance"
];

const generateTransactions = (count = 60) => {
  const transactions = [];
  
  for (let i = 0; i < count; i++) {
    const isIncome = i % 10 === 0 || i % 15 === 0;
    const type = isIncome ? 'income' : 'expense';
    
    let amount, category, description;
    
    if (isIncome) {
      amount = Math.floor(Math.random() * 5000) + 15000;
      category = Math.random() > 0.4 ? 'Salary' : 'Freelance';
      description = category === 'Salary' ? 'Monthly Payroll' : 'Project Payment';
    } else {
      amount = Math.floor(Math.random() * 2500) + 200;
      category = CATEGORIES[Math.floor(Math.random() * 6)];
      description = `${category} payment`;
      if (category === 'Food') description = ['Starbucks', 'Zomato Deli', 'Grocery Store', 'Neighborhood Grill'][Math.floor(Math.random() * 4)];
      if (category === 'Transport') description = ['Uber Ride', 'Metro Recharge', 'Gas Station'][Math.floor(Math.random() * 3)];
      if (category === 'Shopping') description = ['Amazon Purchase', 'Clothing Store', 'Apple Store'][Math.floor(Math.random() * 3)];
    }
    
    // Spread over last 60 days
    const date = subDays(new Date(), Math.floor(Math.random() * 60));
    
    transactions.push({
      id: Math.random().toString(36).substr(2, 9),
      date: date.toISOString(),
      amount,
      category,
      type,
      description,
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const MOCK_TRANSACTIONS = generateTransactions();

export const getBalanceTrend = (transactions) => {
  const last30Days = eachDayOfInterval({
    start: subDays(new Date(), 30),
    end: new Date(),
  });
  
  let currentBalance = 45000; 
  return last30Days.map(date => {
    const dayStr = format(date, 'yyyy-MM-dd');
    const dayTransactions = transactions.filter(t => 
      format(new Date(t.date), 'yyyy-MM-dd') === dayStr
    );
    
    const net = dayTransactions.reduce((acc, t) => 
      t.type === 'income' ? acc + t.amount : acc - t.amount, 0
    );
    
    currentBalance += net;
    
    return {
      date: format(date, 'MMM dd'),
      balance: currentBalance,
    };
  });
};
