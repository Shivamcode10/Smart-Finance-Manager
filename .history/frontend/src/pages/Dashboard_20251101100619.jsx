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
import './Dashboard.css'; // This is your external CSS

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

  useEffect(() => {
    getStats(period);
    getTransactions();
    getGoals();
    getBudgets();
    getAlerts();
  }, [period]);

  // Prepare data for charts (unchanged)
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
        <h1 className="dashboard-title">
          Dashboard
        </h1>
        <div className="period-selector">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="period-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card income-card">
          <div className="card-content">
            <div className="card-icon income-icon">
              <FiTrendingUp className="icon" />
            </div>
            <div className="card-details">
              <p className="card-label">
                Total Income
              </p>
              <p className="card-value">
                ${stats.income.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="summary-card expense-card">
          <div className="card-content">
            <div className="card-icon expense-icon">
              <FiTrendingDown className="icon" />
            </div>
            <div className="card-details">
              <p className="card-label">
                Total Expenses
              </p>
              <p className="card-value">
                ${stats.expenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="summary-card balance-card">
          <div className="card-content">
            <div className="card-icon balance-icon">
              <FiDollarSign className="icon" />
            </div>
            <div className="card-details">
              <p className="card-label">
                Balance
              </p>
              <p className="card-value">
                ${stats.balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <ChartCard title="Income vs Expenses">
          <Line data={dailyData} options={chartOptions} />
        </ChartCard>
        <ChartCard title="Expense Categories">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </ChartCard>
      </div>

      {/* AI Insights Section */}
      <div className="section-container">
        <AIInsights 
          transactions={transactions}
          goals={goals}
          budgets={budgets}
        />
      </div>

      {/* Budget Forecast Section */}
      <div className="section-container">
        <BudgetForecast 
          transactions={transactions}
          budgets={budgets}
        />
      </div>

      {/* Financial Calendar */}
      <div className="section-container">
        <FinancialCalendar />
      </div>

      {/* Recent Transactions & Goals */}
      <div className="transactions-goals-container">
        <div className="transactions-container">
          <h3 className="section-title">
            Recent Transactions
          </h3>
          <div className="transactions-list">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction._id}
                className="transaction-item"
              >
                <div className="transaction-details">
                  <p className="transaction-description">
                    {transaction.description}
                  </p>
                  <p className="transaction-meta">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="transaction-amount">
                  <p
                    className={`amount ${transaction.type === 'income' ? 'income' : 'expense'}`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$ {transaction.amount.toLocaleString()}
                  </p>
                  <p className="transaction-emotion">
                    {transaction.emotion === 'happy' && '😊'}
                    {transaction.emotion === 'neutral' && '😐'}
                    {transaction.emotion === 'sad' && '😢'}
                    {transaction.emotion === 'angry' && '😠'}
                    {transaction.emotion === 'surprised' && '😲'}
                    {transaction.isPrivate && '🔒'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="goals-container">
          <h3 className="section-title">
            Goals Progress
          </h3>
          <div className="goals-list">
            {goals.slice(0, 3).map((goal) => (
              <div key={goal._id} className="goal-item">
                <div className="goal-header">
                  <span className="goal-title">
                    {goal.title}
                  </span>
                  <span className="goal-percentage">
                    {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
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
        <div className="alerts-container">
          <h3 className="section-title">
            Budget Alerts
          </h3>
          <div className="alerts-list">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`alert-item ${alert.type === 'danger' ? 'danger' : 'warning'}`}
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