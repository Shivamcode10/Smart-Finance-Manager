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
import { motion } from 'framer-motion';
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
  hover: {
    y: -5,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

const headerVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const chartVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const floatPulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

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
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        }
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with blur and gradient overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://picsum.photos/seed/finance-dashboard/1920/1080.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-pink-900/30 backdrop-blur-sm" />
      
      {/* Main content */}
      <div className="relative z-20 p-6">
        {/* Header with slide-in animation */}
        <motion.div 
          className="mb-6 flex justify-between items-center"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Dashboard
          </h1>
          <div className="flex space-x-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-white/20 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-md text-white"
            >
              <option value="week" className="bg-gray-800">This Week</option>
              <option value="month" className="bg-gray-800">This Month</option>
              <option value="year" className="bg-gray-800">This Year</option>
            </select>
          </div>
        </motion.div>

        {/* Summary Cards with glassmorphism and animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500/20 backdrop-blur-md mr-4">
                <FiTrendingUp className="h-6 w-6 text-green-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">
                  Total Income
                </p>
                <p className="text-xl font-semibold text-white">
                  ${stats.income.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-500/20 backdrop-blur-md mr-4">
                <FiTrendingDown className="h-6 w-6 text-red-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">
                  Total Expenses
                </p>
                <p className="text-xl font-semibold text-white">
                  ${stats.expenses.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-500/20 backdrop-blur-md mr-4">
                <FiDollarSign className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">
                  Balance
                </p>
                <p className="text-xl font-semibold text-white">
                  ${stats.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts with fade-in animation */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={chartVariants}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Income vs Expenses</h2>
            <div className="h-64">
              <Line data={dailyData} options={chartOptions} />
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={chartVariants}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Expense Categories</h2>
            <div className="h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>
        </motion.div>

        {/* AI Insights Section with fade-in animation */}
        <motion.div 
          className="mb-6"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">AI Insights</h2>
            <AIInsights 
              transactions={transactions}
              goals={goals}
              budgets={budgets}
            />
          </div>
        </motion.div>

        {/* Budget Forecast Section with fade-in animation */}
        <motion.div 
          className="mb-6"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Budget Forecast</h2>
            <BudgetForecast 
              transactions={transactions}
              budgets={budgets}
            />
          </div>
        </motion.div>

        {/* Financial Calendar with fade-in animation */}
        <motion.div 
          className="mb-6"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Financial Calendar</h2>
            <FinancialCalendar />
          </div>
        </motion.div>

        {/* Recent Transactions & Goals with fade-in animation */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={cardVariants}
          >
            <h3 className="text-lg font-medium text-white mb-4">
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex justify-between items-center p-3 bg-white/10 backdrop-blur-md rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-white/70">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === 'income'
                          ? 'text-green-300'
                          : 'text-red-300'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$                       {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/70">
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
          </motion.div>

          <motion.div 
            className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={cardVariants}
          >
            <h3 className="text-lg font-medium text-white mb-4">
              Goals Progress
            </h3>
            <div className="space-y-3">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal._id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-white">
                      {goal.title}
                    </span>
                    <span className="text-sm text-white/70">
                      {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
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
          </motion.div>
        </motion.div>

        {/* Alerts with fade-in animation */}
        {alerts.length > 0 && (
          <motion.div 
            className="mt-6 bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-white/20"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-lg font-medium text-white mb-4">
              Budget Alerts
            </h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md backdrop-blur-md ${
                    alert.type === 'danger'
                      ? 'bg-red-500/20 text-red-200'
                      : 'bg-yellow-500/20 text-yellow-200'
                  }`}
                >
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Floating buttons with pulse animation */}
        <motion.div
          variants={floatPulseVariants}
          initial="initial"
          animate="animate"
        >
          <FloatingVoiceButton 
            addTransaction={addTransaction} 
            stats={stats} 
            transactions={transactions} 
          />
        </motion.div>
        
        <motion.div
          variants={floatPulseVariants}
          initial="initial"
          animate="animate"
        >
          <FloatingCalculatorButton />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;