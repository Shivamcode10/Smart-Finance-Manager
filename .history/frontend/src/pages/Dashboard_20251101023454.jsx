// frontend/src/pages/Dashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import FloatingVoiceButton from '../components/FloatingVoiceButton';
import FloatingCalculatorButton from '../components/FloatingCalculatorButton';
import { FiTrendingUp, FiDollarSign, FiBarChart2, FiPieChart } from 'react-icons/fi';

const statCards = [
  { title: 'Net Worth', value: '$45,820', icon: FiDollarSign, color: 'from-green-400 to-teal-500' },
  { title: 'Monthly Income', value: '$12,430', icon: FiTrendingUp, color: 'from-blue-400 to-indigo-500' },
  { title: 'Expenses', value: '$4,230', icon: FiBarChart2, color: 'from-rose-400 to-pink-500' },
  { title: 'Savings Rate', value: '32%', icon: FiPieChart, color: 'from-cyan-400 to-blue-400' },
];

const Dashboard = ({ addTransaction, alerts = [], goals = [], transactions = [], stats = {} }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-indigo-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <Sidebar />
      <div className="lg:pl-64">
        <Navbar />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold">Overview</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Your financial snapshot</p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {statCards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="relative rounded-2xl p-5 bg-white/70 dark:bg-gray-900/65 backdrop-blur-xl border border-white/10 dark:border-gray-700 shadow-lg"
                    transition={{ duration: 0.25 }}
                  >
                    <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${c.color} opacity-10 blur-xl`} />
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.title}</h3>
                        <p className="mt-2 text-2xl font-bold">{c.value}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-white/30 dark:bg-gray-800/40 shadow-inner">
                        <Icon className="h-7 w-7 text-slate-700 dark:text-slate-100" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="lg:col-span-2 bg-white/70 dark:bg-gray-900/65 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-gray-700 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Analytics</h2>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Last 30 days</div>
                </div>

                {/* Placeholder chart area */}
                <div className="w-full h-56 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 border border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <p className="text-sm text-slate-400">Interactive chart (e.g., Chart.js, Recharts) goes here</p>
                </div>

                {/* Transactions list */}
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Recent Transactions</h3>
                  <div className="space-y-2">
                    {transactions.slice(0, 4).map((t) => (
                      <div key={t._id} className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-white/5">
                        <div>
                          <p className="text-sm font-medium">{t.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(t.date).toLocaleDateString()}</p>
                        </div>
                        <div className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-rose-600'}`}>
                          {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.aside
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/70 dark:bg-gray-900/65 backdrop-blur-xl rounded-2xl p-6 border border-white/10 dark:border-gray-700 shadow-lg"
              >
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Goals Progress</h3>
                <div className="space-y-4">
                  {goals.slice(0, 3).map((goal) => (
                    <div key={goal._id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{goal.title}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.aside>
            </div>

            {/* Alerts */}
            {alerts.length > 0 && (
              <div className="mt-6 bg-white/70 dark:bg-gray-900/65 backdrop-blur-xl rounded-2xl p-4 border border-white/10 dark:border-gray-700 shadow-lg">
                <h3 className="text-sm font-medium mb-2">Budget Alerts</h3>
                <div className="space-y-2">
                  {alerts.map((a, idx) => (
                    <div key={idx} className={`p-3 rounded-md ${a.type === 'danger' ? 'bg-red-50 dark:bg-red-900/20 text-red-700' : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700'}`}>
                      <p className="text-sm">{a.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <FloatingVoiceButton addTransaction={() => {}} stats={{}} transactions={[]} />
      <FloatingCalculatorButton />
    </div>
  );
};

export default Dashboard;