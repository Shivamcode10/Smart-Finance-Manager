import React, { useState, useEffect } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';
import { FiTrendingUp, FiCalendar, FiAlertTriangle } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetForecast = ({ transactions, budgets }) => {
  const [forecastData, setForecastData] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [forecastPeriod, setForecastPeriod] = useState('month');

  useEffect(() => {
    if (budgets.length > 0 && transactions.length > 0) {
      generateForecast();
    }
  }, [transactions, budgets, forecastPeriod]);

  const generateForecast = () => {
    // Calculate spending trends
    const spendingTrends = calculateSpendingTrends();
    
    // Generate predictions for each budget
    const predictions = budgets.map(budget => {
      const categorySpending = spendingTrends[budget.category] || [];
      const prediction = predictSpending(categorySpending, forecastPeriod);
      
      return {
        ...budget,
        prediction,
        risk: calculateRisk(budget, prediction)
      };
    });

    setForecastData(predictions);
  };

  const calculateSpendingTrends = () => {
    const trends = {};
    
    // Group transactions by category and date
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        if (!trends[transaction.category]) {
          trends[transaction.category] = [];
        }
        trends[transaction.category].push({
          date: transaction.date,
          amount: transaction.amount
        });
      }
    });

    // Calculate trends for each category
    Object.keys(trends).forEach(category => {
      trends[category] = trends[category].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return trends;
  };

  const predictSpending = (spendingData, period) => {
    if (spendingData.length < 3) {
      return {
        predicted: 0,
        confidence: 'low',
        method: 'insufficient_data'
      };
    }

    // Simple linear regression for prediction
    const n = Math.min(spendingData.length, 30); // Use last 30 transactions
    const recentData = spendingData.slice(-n);
    
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    recentData.forEach((transaction, index) => {
      const x = index;
      const y = transaction.amount;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Predict future spending
    let predicted = 0;
    let daysToPredict = 30; // Default to 30 days
    
    switch (period) {
      case 'week':
        daysToPredict = 7;
        break;
      case 'month':
        daysToPredict = 30;
        break;
      case 'quarter':
        daysToPredict = 90;
        break;
      case 'year':
        daysToPredict = 365;
        break;
    }

    for (let i = 1; i <= daysToPredict; i++) {
      predicted += slope * (n + i) + intercept;
    }

    // Calculate confidence based on data consistency
    const variance = recentData.reduce((sum, transaction) => {
      const expected = slope * recentData.indexOf(transaction) + intercept;
      return sum + Math.pow(transaction.amount - expected, 2);
    }, 0) / n;
    
    const confidence = variance < 1000 ? 'high' : variance < 5000 ? 'medium' : 'low';

    return {
      predicted,
      confidence,
      method: 'linear_regression',
      trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable'
    };
  };

  const calculateRisk = (budget, prediction) => {
    const percentage = (prediction.predicted / budget.amount) * 100;
    
    if (percentage >= 100) {
      return { level: 'high', message: 'Likely to exceed budget', color: 'red' };
    } else if (percentage >= 80) {
      return { level: 'medium', message: 'May approach budget limit', color: 'yellow' };
    } else {
      return { level: 'low', message: 'Within expected range', color: 'green' };
    }
  };

  const getChartData = () => {
    if (!selectedBudget || !forecastData) return null;

    const budget = forecastData.find(b => b._id === selectedBudget);
    if (!budget) return null;

    const categorySpending = calculateSpendingTrends()[budget.category] || [];
    const dailyData = {};
    
    // Organize spending by date
    categorySpending.forEach(transaction => {
      const date = transaction.date.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = 0;
      }
      dailyData[date] += transaction.amount;
    });

    // Create chart data
    const sortedDates = Object.keys(dailyData).sort();
    const last30Days = sortedDates.slice(-30);
    
    return {
      labels: last30Days,
      datasets: [
        {
          label: 'Actual Spending',
          data: last30Days.map(date => dailyData[date]),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Predicted Spending',
          data: Array(30).fill(0).map((_, index) => {
            const dailyPrediction = budget.prediction.predicted / 30;
            return dailyData[index] + dailyPrediction;
          }),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderDash: [5, 5],
          tension: 0.4,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        }
      }
    }
  };

  if (!forecastData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <FiTrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Not enough data to generate forecasts. Add more transactions to see predictions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <FiTrendingUp className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Budget Forecasting
        </h2>
        <select
          value={forecastPeriod}
          onChange={(e) => setForecastPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        >
          <option value="week">Next Week</option>
          <option value="month">Next Month</option>
          <option value="quarter">Next Quarter</option>
          <option value="year">Next Year</option>
        </select>
      </div>

      {/* Budget Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Budget to Forecast
        </label>
        <select
          value={selectedBudget || ''}
          onChange={(e) => setSelectedBudget(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Choose a budget...</option>
          {forecastData.map(budget => (
            <option key={budget._id} value={budget._id}>
              {budget.category} - ${budget.amount.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      {selectedBudget && (
        <div className="space-y-6">
          {/* Selected Budget Info */}
          {(() => {
            const budget = forecastData.find(b => b._id === selectedBudget);
            if (!budget) return null;

            return (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {budget.category} Budget
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    budget.risk.level === 'high' ? 'bg-red-100 text-red-800' :
                    budget.risk.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {budget.risk.message}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Spending</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${budget.spent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Budget Limit</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${budget.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Predicted Spending</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${budget.prediction.predicted.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Confidence:</strong> {budget.prediction.confidence}</p>
                  <p><strong>Trend:</strong> {budget.prediction.trend}</p>
                  <p><strong>Method:</strong> {budget.prediction.method.replace('_', ' ')}</p>
                </div>
              </div>
            );
          })()}

          {/* Forecast Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Spending Forecast
            </h3>
            <div className="h-64">
              <Line data={getChartData()} options={chartOptions} />
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FiAlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {(() => {
                const budget = forecastData.find(b => b._id === selectedBudget);
                if (!budget) return null;

                const recommendations = [];
                
                if (budget.risk.level === 'high') {
                  recommendations.push({
                    type: 'warning',
                    text: `Consider reducing spending in ${budget.category} or increasing your budget limit.`
                  });
                }
                
                if (budget.prediction.trend === 'increasing') {
                  recommendations.push({
                    type: 'info',
                    text: `Your spending in ${budget.category} is trending upward. Monitor this closely.`
                  });
                }
                
                if (budget.prediction.confidence === 'low') {
                  recommendations.push({
                    type: 'info',
                    text: 'Prediction confidence is low due to limited data. Continue tracking to improve accuracy.'
                  });
                }

                return recommendations.map((rec, index) => (
                  <div key={index} className={`p-3 rounded-lg ${
                    rec.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' :
                    'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                  }`}>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {rec.text}
                    </p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetForecast;