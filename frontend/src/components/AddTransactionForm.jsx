
import React, { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiX } from 'react-icons/fi';

const AddTransactionForm = ({ onClose, transaction = null }) => {
  const { addTransaction, updateTransaction } = useContext(FinanceContext);
  const [formData, setFormData] = useState({
    type: transaction?.type || 'expense',
    category: transaction?.category || 'Food',
    amount: transaction?.amount || '',
    description: transaction?.description || '',
    date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    emotion: transaction?.emotion || 'neutral',
    isPrivate: transaction?.isPrivate || false,
  });
  const [loading, setLoading] = useState(false);

  const { type, category, amount, description, date, emotion, isPrivate } = formData;

  const onChange = e => {
    if (e.target.name === 'isPrivate') {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (transaction) {
        await updateTransaction(transaction._id, formData);
      } else {
        await addTransaction(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const expenseCategories = [
    'Food',
    'Bills',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Healthcare',
    'Education',
    'Travel',
    'Other',
  ];

  const incomeCategories = [
    'Salary',
    'Freelance',
    'Investment',
    'Business',
    'Rental',
    'Other Income',
  ];

  const emotions = [
    { value: 'happy', emoji: '😊' },
    { value: 'neutral', emoji: '😐' },
    { value: 'sad', emoji: '😢' },
    { value: 'angry', emoji: '😠' },
    { value: 'surprised', emoji: '😲' },
  ];

  return (
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
                {transaction ? 'Edit Transaction' : 'Add New Transaction'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="expense"
                      checked={type === 'expense'}
                      onChange={onChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Expense</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="income"
                      checked={type === 'income'}
                      onChange={onChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Income</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={category}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {(type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={onChange}
                  step="0.01"
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  How do you feel about this transaction?
                </label>
                <div className="flex space-x-2">
                  {emotions.map(em => (
                    <button
                      key={em.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, emotion: em.value })}
                      className={`p-2 rounded-md text-2xl ${
                        emotion === em.value
                          ? 'bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      {em.emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    checked={isPrivate}
                    onChange={onChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Mark as private</span>
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (transaction ? 'Update' : 'Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionForm;