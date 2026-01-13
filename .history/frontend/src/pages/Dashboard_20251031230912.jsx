// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { FiPlus, FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import ChartCard from '../components/ChartCard';
import AIInsights from '../components/AIInsights';
import BudgetForecast from '../components/BudgetForecast';
import FinancialCalendar from '../components/FinancialCalendar';
import FloatingVoiceButton from '../components/FloatingVoiceButton';
import FloatingCalculatorButton from '../components/FloatingCalculatorButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const {
    getStats,
    getTransactions,
    getGoals,
    getBudgets,
    getAlerts,
    addTransaction,
    stats,
    transactions,
    goals,
    budgets,
    alerts,
  } = useContext(FinanceContext);
  const [period, setPeriod] = useState('month');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    getStats(period);
    getTransactions();
    getGoals();
    getBudgets();
    getAlerts();
  }, [period]);

  // Toggle theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Prepare data for charts
  const categoryData = {
    labels: Object.keys(stats.categoryData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(stats.categoryData).map(item => item.income),
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: Object.values(stats.categoryData).map(item => item.expense),
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dailyData = {
    labels: Object.keys(stats.dailyData).sort(),
    datasets: [
      {
        label: 'Income',
        data: Object.keys(stats.dailyData)
          .sort()
          .map(date => stats.dailyData[date].income),
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: Object.keys(stats.dailyData)
          .sort()
          .map(date => stats.dailyData[date].expense),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(stats.categoryData),
    datasets: [
      {
        data: Object.values(stats.categoryData).map(item => item.expense),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="flex space-x-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="custom-toggle"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon income">
            <FiTrendingUp />
          </div>
          <div className="card-content">
            <h3>Total Income</h3>
            <p>${stats.income.toLocaleString()}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon expense">
            <FiTrendingDown />
          </div>
          <div className="card-content">
            <h3>Total Expenses</h3>
            <p>${stats.expenses.toLocaleString()}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon balance">
            <FiDollarSign />
          </div>
          <div className="card-content">
            <h3>Balance</h3>
            <p>${stats.balance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">Income vs Expenses</h3>
          </div>
          <div className="chart-card-container">
            <Line data={dailyData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">Expense Categories</h3>
          </div>
          <div className="chart-card-container">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="ai-insights">
        <div className="ai-insights-header">
          <div className="ai-insights-icon">🤖</div>
          <h3 className="ai-insights-title">AI Insights</h3>
        </div>
        <div className="ai-insights-content">
          <AIInsights 
            transactions={transactions}
            goals={goals}
            budgets={budgets}
          />
        </div>
      </div>

      {/* Budget Forecast Section */}
      <div className="budget-forecast">
        <div className="budget-forecast-header">
          <div className="budget-forecast-icon">📊</div>
          <h3 className="budget-forecast-title">Budget Forecast</h3>
        </div>
        <div className="budget-forecast-content">
          <BudgetForecast 
            transactions={transactions}
            budgets={budgets}
          />
        </div>
      </div>

      {/* Financial Calendar */}
      <div className="financial-calendar">
        <div className="financial-calendar-header">
          <div className="financial-calendar-icon">📅</div>
          <h3 className="financial-calendar-title">Financial Calendar</h3>
        </div>
        <div className="financial-calendar-content">
          <FinancialCalendar />
        </div>
      </div>

      {/* Recent Transactions & Goals */}
      <div className="transactions-goals-grid">
        <div className="transactions-section">
          <div className="transactions-header">
            <h3 className="transactions-title">Recent Transactions</h3>
          </div>
          <div className="transactions-list">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction._id}
                className="transaction-item"
              >
                <div className="transaction-details">
                  <h4>{transaction.description}</h4>
                  <p>{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  <p>{transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}</p>
                  <span>
                    {transaction.emotion === 'happy' && '😊'}
                    {transaction.emotion === 'neutral' && '😐'}
                    {transaction.emotion === 'sad' && '😢'}
                    {transaction.emotion === 'angry' && '😠'}
                    {transaction.emotion === 'surprised' && '😲'}
                    {transaction.isPrivate && '🔒'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="goals-section">
          <div className="goals-header">
            <h3 className="goals-title">Goals Progress</h3>
          </div>
          <div className="goals-list">
            {goals.slice(0, 3).map((goal) => (
              <div key={goal._id} className="goal-item">
                <div className="goal-header">
                  <span className="goal-name">{goal.title}</span>
                  <span className="goal-percentage">
                    {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                  </span>
                </div>
                <div className="goal-progress">
                  <div
                    className="goal-progress-bar"
                    style={{
                      width: `${Math.min(
                        (goal.currentAmount / goal.targetAmount) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="alerts-section">
          <div className="alerts-header">
            <div className="alerts-icon">⚠️</div>
            <h3 className="alerts-title">Budget Alerts</h3>
          </div>
          <div className="alerts-list">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`alert-item ${alert.type}`}
              >
                <p>{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <FloatingVoiceButton 
        addTransaction={addTransaction} 
        stats={stats} 
        transactions={transactions} 
      />
      <FloatingCalculatorButton />
    </div>
  );
};

export default Dashboard;