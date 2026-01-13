// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FinanceContext } from "../context/FinanceContext";
import { Doughnut, Line } from "react-chartjs-2";
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
} from "chart.js";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
} from "react-icons/fi";
import ChartCard from "../components/ChartCard";
import AIInsights from "../components/AIInsights";
import BudgetForecast from "../components/BudgetForecast";
import FinancialCalendar from "../components/FinancialCalendar";
import FloatingVoiceButton from "../components/FloatingVoiceButton";
import FloatingCalculatorButton from "../components/FloatingCalculatorButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
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

  const [period, setPeriod] = useState("month");

  useEffect(() => {
    getStats(period);
    getTransactions();
    getGoals();
    getBudgets();
    getAlerts();
  }, [period]);

  // Chart data
  const categoryData = {
    labels: Object.keys(stats.categoryData),
    datasets: [
      {
        label: "Income",
        data: Object.values(stats.categoryData).map((i) => i.income),
        backgroundColor: "rgba(34,197,94,0.6)",
      },
      {
        label: "Expenses",
        data: Object.values(stats.categoryData).map((i) => i.expense),
        backgroundColor: "rgba(239,68,68,0.6)",
      },
    ],
  };

  const dailyData = {
    labels: Object.keys(stats.dailyData).sort(),
    datasets: [
      {
        label: "Income",
        data: Object.keys(stats.dailyData)
          .sort()
          .map((d) => stats.dailyData[d].income),
        borderColor: "rgba(34,197,94,1)",
        backgroundColor: "rgba(34,197,94,0.1)",
        tension: 0.4,
      },
      {
        label: "Expenses",
        data: Object.keys(stats.dailyData)
          .sort()
          .map((d) => stats.dailyData[d].expense),
        borderColor: "rgba(239,68,68,1)",
        backgroundColor: "rgba(239,68,68,0.1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "right" } },
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1635852773423-1b3e3b4e9728?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-black/60 to-blue-900/70 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          className="mb-8 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-300 drop-shadow-lg">
            Smart Finance Dashboard
          </h1>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur-md focus:ring-2 focus:ring-indigo-400"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[{
              title: "Total Income",
              icon: <FiTrendingUp className="h-8 w-8 text-green-400" />,
              color: "from-green-400/20 to-green-600/20",
              value: `$${stats.income.toLocaleString()}`
            },
            {
              title: "Total Expenses",
              icon: <FiTrendingDown className="h-8 w-8 text-red-400" />,
              color: "from-red-400/20 to-red-600/20",
              value: `$${stats.expenses.toLocaleString()}`
            },
            {
              title: "Balance",
              icon: <FiDollarSign className="h-8 w-8 text-blue-400" />,
              color: "from-blue-400/20 to-blue-600/20",
              value: `$${stats.balance.toLocaleString()}`
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} backdrop-blur-xl border border-white/20 shadow-xl hover:scale-105 transition-transform`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-white/10 rounded-full">{card.icon}</div>
                <div>
                  <p className="text-sm text-gray-300">{card.title}</p>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white/90">Income vs Expenses</h2>
            <div className="h-72">
              <Line data={dailyData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white/90">Expense Categories</h2>
            <div className="h-72">
              <Doughnut data={categoryData} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          className="mb-10 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <AIInsights transactions={transactions} goals={goals} budgets={budgets} />
        </motion.div>

        {/* Budget Forecast */}
        <motion.div
          className="mb-10 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          <BudgetForecast transactions={transactions} budgets={budgets} />
        </motion.div>

        {/* Financial Calendar */}
        <motion.div
          className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <FinancialCalendar />
        </motion.div>

        {/* Floating Buttons */}
        <motion.div
          className="animate-pulse"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <FloatingVoiceButton
            addTransaction={addTransaction}
            stats={stats}
            transactions={transactions}
          />
          <FloatingCalculatorButton />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
