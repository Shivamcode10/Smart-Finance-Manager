import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { FiDownload, FiCalendar, FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FinancialReports = ({ transactions, goals, budgets }) => {
  const [reportPeriod, setReportPeriod] = useState('month');
  const [reportType, setReportType] = useState('overview');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    generateReportData();
  }, [transactions, reportPeriod, reportType]);

  const generateReportData = () => {
    const now = new Date();
    let startDate = new Date();
    
    switch (reportPeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const filteredTransactions = transactions.filter(t => 
      new Date(t.date) >= startDate
    );

    switch (reportType) {
      case 'overview':
        generateOverviewData(filteredTransactions);
        break;
      case 'trends':
        generateTrendsData(filteredTransactions);
        break;
      case 'comparison':
        generateComparisonData(filteredTransactions);
        break;
      case 'goals':
        generateGoalsData();
        break;
    }
  };

  const generateOverviewData = (transactions) => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryData = {};
    transactions.forEach(t => {
      if (!categoryData[t.category]) {
        categoryData[t.category] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        categoryData[t.category].income += t.amount;
      } else {
        categoryData[t.category].expense += t.amount;
      }
    });

    setChartData({
      summary: { income, expenses, balance: income - expenses },
      categories: categoryData,
      transactions: transactions
    });
  };

  const generateTrendsData = (transactions) => {
    const dailyData = {};
    transactions.forEach(t => {
      const date = t.date.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        dailyData[date].income += t.amount;
      } else {
        dailyData[date].expense += t.amount;
      }
    });

    const sortedDates = Object.keys(dailyData).sort();
    
    setChartData({
      daily: sortedDates.map(date => ({
        date,
        income: dailyData[date].income,
        expense: dailyData[date].expense,
        balance: dailyData[date].income - dailyData[date].expense
      }))
    });
  };

  const generateComparisonData = (transactions) => {
    const currentPeriod = transactions.filter(t => {
      const now = new Date();
      const transactionDate = new Date(t.date);
      
      switch (reportPeriod) {
        case 'month':
          return transactionDate.getMonth() === now.getMonth();
        case 'quarter':
          return Math.floor(transactionDate.getMonth() / 3) === Math.floor(now.getMonth() / 3);
        case 'year':
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });

    const previousPeriod = transactions.filter(t => {
      const now = new Date();
      const transactionDate = new Date(t.date);
      
      switch (reportPeriod) {
        case 'month':
          return transactionDate.getMonth() === now.getMonth() - 1;
        case 'quarter':
          return Math.floor(transactionDate.getMonth() / 3) === Math.floor(now.getMonth() / 3) - 1;
        case 'year':
          return transactionDate.getFullYear() === now.getFullYear() - 1;
        default:
          return false;
      }
    });

    const currentIncome = currentPeriod.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const currentExpenses = currentPeriod.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const previousIncome = previousPeriod.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const previousExpenses = previousPeriod.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    setChartData({
      comparison: {
        current: { income: currentIncome, expenses: currentExpenses },
        previous: { income: previousIncome, expenses: previousExpenses },
        incomeChange: previousIncome > 0 ? ((currentIncome - previousIncome) / previousIncome) * 100 : 0,
        expenseChange: previousExpenses > 0 ? ((currentExpenses - previousExpenses) / previousExpenses) * 100 : 0
      }
    });
  };

  const generateGoalsData = () => {
    const goalsProgress = goals.map(goal => ({
      title: goal.title,
      target: goal.targetAmount,
      current: goal.currentAmount,
      percentage: (goal.currentAmount / goal.targetAmount) * 100,
      deadline: goal.deadline
    }));

    setChartData({
      goals: goalsProgress
    });
  };

  const exportReport = () => {
    const reportData = {
      period: reportPeriod,
      type: reportType,
      data: chartData,
      generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `financial-report-${reportPeriod}-${reportType}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderChart = () => {
    switch (reportType) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="flex items-center">
                  <FiTrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Income</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      ${chartData.summary?.income?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <div className="flex items-center">
                  <FiTrendingDown className="h-8 w-8 text-red-600 dark:text-red-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                      ${chartData.summary?.expenses?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <div className="flex items-center">
                  <FiDollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Net Balance</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      ${chartData.summary?.balance?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Breakdown</h3>
              <div className="h-64">
                <Doughnut
                  data={{
                    labels: Object.keys(chartData.categories || {}),
                    datasets: [{
                      data: Object.values(chartData.categories || {}).map(c => c.expense),
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                      ],
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'trends':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Income & Expense Trends</h3>
            <div className="h-64">
              <Line
                data={{
                  labels: chartData.daily?.map(d => d.date) || [],
                  datasets: [
                    {
                      label: 'Income',
                      data: chartData.daily?.map(d => d.income) || [],
                      borderColor: 'rgba(34, 197, 94, 1)',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      tension: 0.4,
                    },
                    {
                      label: 'Expenses',
                      data: chartData.daily?.map(d => d.expense) || [],
                      borderColor: 'rgba(239, 68, 68, 1)',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      tension: 0.4,
                    },
                    {
                      label: 'Balance',
                      data: chartData.daily?.map(d => d.balance) || [],
                      borderColor: 'rgba(59, 130, 246, 1)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      tension: 0.4,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    }
                  }
                }}
              />
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Period Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Income</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current:</span>
                      <span className="font-semibold">${chartData.comparison?.current?.income?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Previous:</span>
                      <span className="font-semibold">${chartData.comparison?.previous?.income?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Change:</span>
                      <span className={`font-semibold ${chartData.comparison?.incomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {chartData.comparison?.incomeChange?.toFixed(1) || 0}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Expenses</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current:</span>
                      <span className="font-semibold">${chartData.comparison?.current?.expenses?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Previous:</span>
                      <span className="font-semibold">${chartData.comparison?.previous?.expenses?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Change:</span>
                      <span className={`font-semibold ${chartData.comparison?.expenseChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {chartData.comparison?.expenseChange?.toFixed(1) || 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Goals Progress</h3>
            <div className="space-y-4">
              {chartData.goals?.map((goal, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{goal.title}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{goal.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${goal.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>${goal.target.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FiCalendar className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={reportPeriod}
                onChange={(e) => setReportPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="overview">Overview</option>
                <option value="trends">Trends</option>
                <option value="comparison">Comparison</option>
                <option value="goals">Goals</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={exportReport}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiDownload className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Content */}
      {renderChart()}
    </div>
  );
};

export default FinancialReports;