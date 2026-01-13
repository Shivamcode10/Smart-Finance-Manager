// frontend/src/pages/Budgets.jsx
import React, { useEffect, useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiPlus, FiEdit2, FiTrash2, FiAlertTriangle } from 'react-icons/fi';

const Budgets = () => {
  const {
    getBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
    budgets,
  } = useContext(FinanceContext);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    getBudgets();
  }, []);

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      await deleteBudget(id);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  const getPercentage = (spent, amount) => {
    return Math.min((spent / amount) * 100, 100);
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Budgets
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          Add Budget
        </button>
      </div>

      {/* Budgets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.length > 0 ? (
          budgets.map((budget) => {
            const percentage = getPercentage(budget.spent, budget.amount);
            const isOverBudget = percentage >= 100;
            const isNearLimit = percentage >= 80 && percentage < 100;
            
            return (
              <div key={budget._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {budget.category}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(budget)}
                      className="p-1 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20"
                      title="Edit"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(budget._id)}
                      className="p-1 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">
                      Spent: ${budget.spent.toLocaleString()}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Budget: ${budget.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getStatusColor(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {percentage.toFixed(0)}% used
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                </div>
                
                {(isOverBudget || isNearLimit) && (
                  <div className={`absolute top-2 right-2 p-1 rounded-full ${
                    isOverBudget ? 'bg-red-100 dark:bg-red-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                  }`}>
                    <FiAlertTriangle className={`h-4 w-4 ${
                      isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                    }`} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't set any budgets yet.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Your First Budget
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Budget Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    {editingBudget ? 'Edit Budget' : 'Add New Budget'}
                  </h3>
                  <button
                    onClick={closeForm}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = {
                    category: e.target.category.value,
                    amount: parseFloat(e.target.amount.value),
                    period: e.target.period.value,
                    startDate: e.target.startDate.value,
                    endDate: e.target.endDate.value,
                  };
                  
                  if (editingBudget) {
                    await updateBudget(editingBudget._id, formData);
                  } else {
                    await addBudget(formData);
                  }
                  closeForm();
                }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={editingBudget?.category}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Food">Food</option>
                      <option value="Bills">Bills</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Travel">Travel</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Budget Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      defaultValue={editingBudget?.amount}
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Period
                    </label>
                    <select
                      name="period"
                      defaultValue={editingBudget?.period}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        defaultValue={editingBudget?.startDate ? new Date(editingBudget.startDate).toISOString().split('T')[0] : ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        defaultValue={editingBudget?.endDate ? new Date(editingBudget.endDate).toISOString().split('T')[0] : ''}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {editingBudget ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;