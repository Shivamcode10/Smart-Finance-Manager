// frontend/src/pages/Reports.jsx
import React, { useEffect, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';

const Reports = () => {
  const {
    getTransactions,
    getGoals,
    transactions,
    goals,
  } = useContext(FinanceContext);

  useEffect(() => {
    getTransactions();
    getGoals();
  }, []);

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Financial Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your financial health
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <div className="flex items-center">
            <FiTrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mr-3" />
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Income</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                ${totalIncome.toLocaleString()}
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
                ${totalExpenses.toLocaleString()}
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
                ${balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-2">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction._id} className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  transaction.type === 'income'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}$                   {transaction.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;