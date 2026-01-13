import React, { useEffect, useState, useContext, useRef } from 'react';
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
import { motion, useInView } from 'framer-motion';
import { FiPlus, FiTrendingUp, FiTrendingDown, FiDollarSign, FiActivity, FiPieChart, FiCreditCard } from 'react-icons/fi';
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
  
  // Refs for scroll animations
  const headerRef = useRef(null);
  const summaryRef = useRef(null);
  const chartsRef = useRef(null);
  const insightsRef = useRef(null);
  const transactionsRef = useRef(null);
  
  // Check if elements are in view for scroll animations
  const headerInView = useInView(headerRef, { once: true });
  const summaryInView = useInView(summaryRef, { once: true });
  const chartsInView = useInView(chartsRef, { once: true });
  const insightsInView = useInView(insightsRef, { once: true });
  const transactionsInView = useInView(transactionsRef, { once: true });

  useEffect(() => {
    getStats(period);
    getTransactions();
    getGoals();
    getBudgets();
    getAlerts();
  }, [period]);

  // Prepare data for charts with enhanced colors
  const categoryData = {
    labels: Object.keys(stats.categoryData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(stats.categoryData).map(item => item.income),
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: Object.values(stats.categoryData).map(item => item.expense),
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        tension: 0.4,
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
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: Object.keys(stats.dailyData)
          .sort()
          .map(date => stats.dailyData[date].expense),
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
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
          'rgba(99, 102, 241, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(6, 182, 212, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(168, 85, 247, 0.7)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 2,
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
          font: {
            size: 12
          }
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
          font: {
            size: 12
          }
        }
      },
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with finance-themed image and gradient overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://picsum.photos/seed/finance-dashboard/1920/1080.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.3),transparent)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.2),transparent)]" />
      
      {/* Main content */}
      <div className="relative z-20 p-6">
        {/* Header with animated gradient text */}
        <motion.div 
          ref={headerRef}
          className="mb-8 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-500 to-emerald-400 animate-gradientShift">
            Financial Dashboard
          </h1>
          <div className="flex space-x-2">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-white"
            >
              <option value="week" className="bg-gray-800">This Week</option>
              <option value="month" className="bg-gray-800">This Month</option>
              <option value="year" className="bg-gray-800">This Year</option>
            </select>
          </div>
        </motion.div>

        {/* Summary Cards with glassmorphism and animations */}
        <motion.div 
          ref={summaryRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={summaryInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-2xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.5)] border border-white/20 p-6 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center">
              <motion.div 
                className="p-3 rounded-full bg-green-500/20 mr-4"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiTrendingUp className="h-6 w-6 text-green-400" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-gray-300">Total Income</p>
                <p className="text-xl font-semibold text-white">${stats.income.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-2xl rounded-xl shadow-[0_20px_50px_rgba(239,68,68,0.3)] hover:shadow-[0_25px_60px_rgba(239,68,68,0.5)] border border-white/20 p-6 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center">
              <motion.div 
                className="p-3 rounded-full bg-red-500/20 mr-4"
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiTrendingDown className="h-6 w-6 text-red-400" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-gray-300">Total Expenses</p>
                <p className="text-xl font-semibold text-white">${stats.expenses.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 dark:bg-gray-900/50 backdrop-blur-2xl rounded-xl shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-[0_25px_60px_rgba(59,130,246,0.5)] border border-white/20 p-6 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center">
              <motion.div 
                className="p-3 rounded-full bg-blue-500/20 mr-4"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FiDollarSign className="h-6 w-6 text-blue-400" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-gray-300">Balance</p>
                <p className="text-xl font-semibold text-white">${stats.balance.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts with animated containers */}
        <motion.div 
          ref={chartsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={chartsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6 animate-slideUp"
            whileHover={{ y: -5, boxShadow: "0 25px 60px rgba(59,130,246,0.5)" }}
          >
            <h2 className="text-xl font-semibold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Income vs Expenses
            </h2>
            <div className="h-64">
              <Line data={dailyData} options={chartOptions} />
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6 animate-slideUp"
            whileHover={{ y: -5, boxShadow: "0 25px 60px rgba(59,130,246,0.5)" }}
          >
            <h2 className="text-xl font-semibold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Expense Categories
            </h2>
            <div className="h-64">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>
        </motion.div>

        {/* AI Insights Section with animations */}
        <motion.div 
          ref={insightsRef}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={insightsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              AI Insights
            </h2>
            <AIInsights 
              transactions={transactions}
              goals={goals}
              budgets={budgets}
            />
          </div>
        </motion.div>

        {/* Budget Forecast Section with animations */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={insightsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Budget Forecast
            </h2>
            <BudgetForecast 
              transactions={transactions}
              budgets={budgets}
            />
          </div>
        </motion.div>

        {/* Financial Calendar with animations */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={insightsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Financial Calendar
            </h2>
            <FinancialCalendar />
          </div>
        </motion.div>

        {/* Recent Transactions & Goals with animations */}
        <motion.div 
          ref={transactionsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={transactionsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.div 
            className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6 hover:border-indigo-400/50 transition-all"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <FiActivity className="h-5 w-5 text-indigo-400" />
              </motion.div>
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((transaction, index) => (
                <motion.div
                  key={transaction._id}
                  className="flex justify-between items-center p-3 bg-white/10 dark:bg-gray-800/30 rounded-md hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div>
                    <p className="text-sm font-medium text-white">{transaction.description}</p>
                    <p className="text-xs text-gray-400">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === 'income'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {transaction.emotion === 'happy' && '😊'}
                      {transaction.emotion === 'neutral' && '😐'}
                      {transaction.emotion === 'sad' && '😢'}
                      {transaction.emotion === 'angry' && '😠'}
                      {transaction.emotion === 'surprised' && '😲'}
                      {transaction.isPrivate && '🔒'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6 hover:border-indigo-400/50 transition-all"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <FiPieChart className="h-5 w-5 text-indigo-400" />
              </motion.div>
              Goals Progress
            </h3>
            <div className="space-y-3">
              {goals.slice(0, 3).map((goal, index) => (
                <motion.div
                  key={goal._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-white">{goal.title}</span>
                    <span className="text-sm text-gray-400">
                      {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Alerts with animations */}
        {alerts.length > 0 && (
          <motion.div 
            className="mt-6 bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(8,112,184,0.3)] border border-white/20 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={transactionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <FiCreditCard className="h-5 w-5 text-indigo-400" />
              </motion.div>
              Budget Alerts
            </h3>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-md ${
                    alert.type === 'danger'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <p className="text-sm">{alert.message}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Floating Buttons */}
        <FloatingVoiceButton 
          addTransaction={addTransaction} 
          stats={stats} 
          transactions={transactions} 
        />
        <FloatingCalculatorButton />
      </div>
    </div>
  );
};

export default Dashboard;