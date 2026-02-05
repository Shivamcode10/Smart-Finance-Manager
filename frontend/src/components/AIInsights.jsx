
import React, { useState, useEffect } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiTrendingUp, FiAlertCircle, FiTarget, FiDollarSign, FiInfo } from 'react-icons/fi';

const AIInsights = ({ transactions, goals, budgets }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    generateInsights();
  }, [transactions, goals, budgets, selectedPeriod]);

  const generateInsights = () => {
    setLoading(true);
    const newInsights = [];

    
    const spendingAnalysis = analyzeSpendingPatterns();
    if (spendingAnalysis) newInsights.push(spendingAnalysis);

    
    const budgetHealth = analyzeBudgetHealth();
    if (budgetHealth) newInsights.push(budgetHealth);

    
    const goalProgress = analyzeGoalProgress();
    if (goalProgress) newInsights.push(goalProgress);

    
    const predictions = generateSpendingPredictions();
    if (predictions) newInsights.push(predictions);

    
    const unusualSpending = identifyUnusualSpending();
    if (unusualSpending) newInsights.push(unusualSpending);

    setInsights(newInsights);
    setLoading(false);
  };

  const analyzeSpendingPatterns = () => {
    const recentTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    });

    if (recentTransactions.length < 5) return null;

    
    const categorySpending = {};
    recentTransactions.forEach(t => {
      if (t.type === 'expense') {
        if (!categorySpending[t.category]) {
          categorySpending[t.category] = { total: 0, count: 0 };
        }
        categorySpending[t.category].total += t.amount;
        categorySpending[t.category].count += 1;
      }
    });

    
    const topCategory = Object.entries(categorySpending)
      .sort((a, b) => b[1].total - a[1].total)[0];

    if (!topCategory) return null;

    const avgTransaction = topCategory[1].total / topCategory[1].count;
    const isHighSpending = avgTransaction > 100;

    return {
      type: 'spending_pattern',
      title: 'Spending Pattern Analysis',
      icon: FiTrendingUp,
      color: isHighSpending ? 'yellow' : 'blue',
      message: `Your highest spending category is ${topCategory[0]} with $${topCategory[1].total.toFixed(2)} this month. Average transaction: $${avgTransaction.toFixed(2)}.`,
      recommendation: isHighSpending 
        ? `Consider setting a stricter budget for ${topCategory[0]} or look for ways to reduce costs in this category.`
        : `Your spending in ${topCategory[0]} looks reasonable. Keep monitoring for any changes.`,
      data: {
        category: topCategory[0],
        total: topCategory[1].total,
        average: avgTransaction,
        count: topCategory[1].count
      }
    };
  };

  const analyzeBudgetHealth = () => {
    if (budgets.length === 0) return null;

    const atRiskBudgets = budgets.filter(budget => {
      const percentage = (budget.spent / budget.amount) * 100;
      return percentage >= 80;
    });

    if (atRiskBudgets.length === 0) {
      return {
        type: 'budget_health',
        title: 'Budget Health Check',
        icon: FiDollarSign,
        color: 'green',
        message: 'Great job! All your budgets are on track.',
        recommendation: 'Continue monitoring your spending to maintain this healthy budget status.',
        data: { healthyBudgets: budgets.length, atRiskBudgets: 0 }
      };
    }

    const mostAtRisk = atRiskBudgets.sort((a, b) => (b.spent / b.amount) - (a.spent / a.amount))[0];
    const percentage = (mostAtRisk.spent / mostAtRisk.amount) * 100;

    return {
      type: 'budget_health',
      title: 'Budget Alert',
      icon: FiAlertCircle,
      color: 'red',
      message: `⚠️ Your ${mostAtRisk.category} budget is at ${percentage.toFixed(0)}% capacity!`,
      recommendation: `Reduce spending in ${mostAtRisk.category} for the rest of the month or consider adjusting your budget.`,
      data: {
        category: mostAtRisk.category,
        percentage: percentage,
        spent: mostAtRisk.spent,
        budget: mostAtRisk.amount
      }
    };
  };

  const analyzeGoalProgress = () => {
    if (goals.length === 0) return null;

    const activeGoals = goals.filter(goal => {
      const now = new Date();
      const deadline = new Date(goal.deadline);
      return deadline > now;
    });

    if (activeGoals.length === 0) return null;

    const goalsBehind = activeGoals.filter(goal => {
      const now = new Date();
      const deadline = new Date(goal.deadline);
      const timePassed = (now - new Date(goal.createdAt)) / (deadline - new Date(goal.createdAt));
      const expectedProgress = timePassed * 100;
      const actualProgress = (goal.currentAmount / goal.targetAmount) * 100;
      return actualProgress < expectedProgress * 0.8;
    });

    if (goalsBehind.length === 0) {
      return {
        type: 'goal_progress',
        title: 'Goal Progress',
        icon: FiTarget,
        color: 'green',
        message: `Excellent! You're on track with all ${activeGoals.length} active goals.`,
        recommendation: 'Keep up the great work! Consider setting new goals to continue your financial growth.',
        data: { onTrack: activeGoals.length, behind: 0 }
      };
    }

    const mostBehind = goalsBehind.sort((a, b) => {
      const progressA = (a.currentAmount / a.targetAmount) * 100;
      const progressB = (b.currentAmount / b.targetAmount) * 100;
      return progressA - progressB;
    })[0];

    return {
      type: 'goal_progress',
      title: 'Goal Progress Alert',
      icon: FiAlertCircle,
      color: 'yellow',
      message: `You're behind on your "${mostBehind.title}" goal.`,
      recommendation: `Consider increasing your savings rate or adjusting your timeline. You're at ${((mostBehind.currentAmount / mostBehind.targetAmount) * 100).toFixed(0)}% of your goal.`,
      data: {
        goal: mostBehind.title,
        progress: (mostBehind.currentAmount / mostBehind.targetAmount) * 100,
        target: mostBehind.targetAmount,
        current: mostBehind.currentAmount
      }
    };
  };

  const generateSpendingPredictions = () => {
    const recentTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return transactionDate >= thirtyDaysAgo;
    });

    if (recentTransactions.length < 10) return null;

    
    const dailySpending = recentTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0) / 30;

   
    const predictedMonthlySpending = dailySpending * 30;

    
    const firstHalf = recentTransactions.slice(0, Math.floor(recentTransactions.length / 2));
    const secondHalf = recentTransactions.slice(Math.floor(recentTransactions.length / 2));

    const firstHalfSpending = firstHalf.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const secondHalfSpending = secondHalf.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    const trend = secondHalfSpending > firstHalfSpending ? 'increasing' : 'decreasing';

    return {
      type: 'prediction',
      title: 'Spending Prediction',
      icon: FiInfo,
      color: trend === 'increasing' ? 'yellow' : 'blue',
      message: `Based on your recent spending, I predict you'll spend $${predictedMonthlySpending.toFixed(2)} this month. Your spending trend is ${trend}.`,
      recommendation: trend === 'increasing' 
        ? 'Your spending is trending up. Consider reviewing your recent purchases to ensure they align with your financial goals.'
        : 'Your spending is trending down. Great job! Keep maintaining this positive trend.',
      data: {
        predicted: predictedMonthlySpending,
        trend: trend,
        daily: dailySpending
      }
    };
  };

  const identifyUnusualSpending = () => {
    const recentTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return transactionDate >= sevenDaysAgo;
    });

    if (recentTransactions.length < 5) return null;

    
    const expenses = recentTransactions.filter(t => t.type === 'expense');
    const amounts = expenses.map(t => t.amount);
    const average = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
    const standardDeviation = Math.sqrt(amounts.reduce((sum, a) => sum + Math.pow(a - average, 2), 0) / amounts.length);
    const threshold = average + (2 * standardDeviation);

    const unusualTransactions = expenses.filter(t => t.amount > threshold);

    if (unusualTransactions.length === 0) return null;

    const mostUnusual = unusualTransactions.sort((a, b) => b.amount - a.amount)[0];

    return {
      type: 'unusual_spending',
      title: 'Unusual Spending Detected',
      icon: FiAlertCircle,
      color: 'orange',
      message: `Unusual transaction detected: $${mostUnusual.amount.toFixed(2)} for ${mostUnusual.description}`,
      recommendation: 'This transaction is significantly higher than your average spending. Please review if this was intentional or if you need to adjust your budget.',
      data: {
        transaction: mostUnusual,
        average: average,
        threshold: threshold
      }
    };
  };

  const getInsightIcon = (iconName) => {
    const icons = {
      FiTrendingUp,
      FiAlertCircle,
      FiTarget,
      FiDollarSign,
      FiInfo
    };
    const Icon = icons[iconName] || FiInfo;
    return <Icon className="h-5 w-5" />;
  };

  const getInsightColor = (color) => {
    const colors = {
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
      red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200'
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Analyzing your financial data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <FiInfo className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          AI-Powered Insights
        </h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {insights.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <FiInfo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Not enough data to generate insights. Add more transactions to see AI-powered analysis.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getInsightColor(insight.color)}`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 mr-3 ${
                  insight.unlocked
                    ? 'text-yellow-500'
                    : 'text-gray-400'
                }`}>
                  {getInsightIcon(insight.icon)}
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${
                    insight.unlocked
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {insight.title}
                  </h3>
                  <p className={`text-sm ${
                    insight.unlocked
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {insight.message}
                  </p>
                  <div className="bg-white dark:bg-gray-700 rounded p-2">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      💡 Recommendation:
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {insight.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIInsights;