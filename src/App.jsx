import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import Login from './pages/Login';
import { AppProvider, useApp } from './context/AppContext';
import './App.css';

const AppLayout = () => {
  const { user } = useApp();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <main style={{ flex: 1, overflowY: 'auto', padding: '0 24px 48px' }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <NewsTicker />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
}

export default App;
