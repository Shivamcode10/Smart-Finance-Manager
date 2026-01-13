import React from 'react';
import { FiLock } from 'react-icons/fi';

const DashboardEnhanced = ({
  transactions,
  goals,
  alerts,
  addTransaction,
  stats,
}) => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Transactions Section */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          Recent Transactions
        </h2>
        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors cursor-pointer shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {/* Icon based on transaction type */}
                <div
                  className={`p-3 rounded-full ${
                    transaction.type === 'income'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {transaction.description || 'No Description'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                    <span>
                      {transaction.emotion === 'happy' && '😊'}
                      {transaction.emotion === 'neutral' && '😐'}
                      {transaction.emotion === 'sad' && '😢'}
                      {transaction.emotion === 'angry' && '😠'}
                      {transaction.emotion === 'surprised' && '😲'}
                    </span>
                    {transaction.isPrivate && (
                      <FiLock className="text-gray-400 dark:text-gray-500" />
                    )}
                  </p>
                </div>
              </div>
              <p
                className={`text-xl font-semibold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}$
                {transaction.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Goals Progress Section */}
      <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          Goals Progress
        </h2>
        <div className="space-y-6 max-w-3xl">
          {goals.slice(0, 3).map((goal) => {
            const progress = Math.min(
              (goal.currentAmount / goal.targetAmount) * 100,
              100
            );
            return (
              <div key={goal._id}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {goal.title}
                  </h3>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-4 bg-indigo-600 dark:bg-indigo-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
            Budget Alerts
          </h2>
          <div className="space-y-4 max-w-3xl">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm ${
                  alert.type === 'danger'
                    ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700'
                    : 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700'
                }`}
              >
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
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

export default DashboardEnhanced;