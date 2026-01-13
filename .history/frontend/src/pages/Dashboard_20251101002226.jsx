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
