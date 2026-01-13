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
import VoiceCommands from '../components/VoiceCommands';

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
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="flex space-x-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
              <FiTrendingUp className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Income
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ${stats.income.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 mr-4">
              <FiTrendingDown className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Expenses
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ${stats.expenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
              <FiDollarSign className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Balance
              </p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ${stats.balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Income vs Expenses">
          <Line data={dailyData} options={chartOptions} />
        </ChartCard>
        <ChartCard title="Expense Categories">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </ChartCard>
      </div>

      {/* AI Insights Section */}
      <div className="mb-6">
        <AIInsights 
          transactions={transactions}
          goals={goals}
          budgets={budgets}
        />
      </div>

      {/* Budget Forecast Section */}
      <div className="mb-6">
        <BudgetForecast 
          transactions={transactions}
          budgets={budgets}
        />
      </div>
      

      {/* Recent Transactions & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$                     {transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Goals Progress
          </h3>
          <div className="space-y-3">
            {goals.slice(0, 3).map((goal) => (
              <div key={goal._id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {goal.title}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
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
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Budget Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${
                  alert.type === 'danger'
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                }`}
              >
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;