// frontend/src/pages/Goals.jsx
import React, { useEffect, useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import GoalProgressBar from '../components/GoalProgressBar';
import { FiPlus, FiEdit2, FiTrash2, FiDollarSign } from 'react-icons/fi';

const Goals = () => {
  const {
    getGoals,
    addGoal,
    updateGoal,
    updateGoalProgress,
    deleteGoal,
    goals,
  } = useContext(FinanceContext);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [progressAmount, setProgressAmount] = useState('');

  useEffect(() => {
    getGoals();
  }, []);

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(id);
    }
  };

  const handleAddProgress = (goal) => {
    setSelectedGoal(goal);
    setShowProgressForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingGoal(null);
  };

  const closeProgressForm = () => {
    setShowProgressForm(false);
    setSelectedGoal(null);
    setProgressAmount('');
  };

  const submitProgress = async (e) => {
    e.preventDefault();
    if (selectedGoal && progressAmount) {
      await updateGoalProgress(selectedGoal._id, parseFloat(progressAmount));
      closeProgressForm();
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Financial Goals
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
        >
          <FiPlus className="mr-2 h-4 w-4" />
          Add Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <div key={goal._id} className="relative">
              <GoalProgressBar goal={goal} />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleAddProgress(goal)}
                  className="p-1 rounded-full text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20"
                  title="Add Progress"
                >
                  <FiDollarSign className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEdit(goal)}
                  className="p-1 rounded-full text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20"
                  title="Edit"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(goal._id)}
                  className="p-1 rounded-full text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20"
                  title="Delete"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't set any financial goals yet.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Goal Form */}
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
                    {editingGoal ? 'Edit Goal' : 'Add New Goal'}
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
                    title: e.target.title.value,
                    description: e.target.description.value,
                    targetAmount: parseFloat(e.target.targetAmount.value),
                    deadline: e.target.deadline.value,
                    category: e.target.category.value,
                  };
                  
                  if (editingGoal) {
                    await updateGoal(editingGoal._id, formData);
                  } else {
                    await addGoal(formData);
                  }
                  closeForm();
                }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingGoal?.title}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={editingGoal?.description}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Target Amount
                    </label>
                    <input
                      type="number"
                      name="targetAmount"
                      defaultValue={editingGoal?.targetAmount}
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      defaultValue={editingGoal?.deadline ? new Date(editingGoal.deadline).toISOString().split('T')[0] : ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={editingGoal?.category}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Emergency Fund">Emergency Fund</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Home Purchase">Home Purchase</option>
                      <option value="Car Purchase">Car Purchase</option>
                      <option value="Education">Education</option>
                      <option value="Retirement">Retirement</option>
                      <option value="Other">Other</option>
                    </select>
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
                      {editingGoal ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Progress Form */}
      {showProgressForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Add Progress to {selectedGoal?.title}
                  </h3>
                  <button
                    onClick={closeProgressForm}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <form onSubmit={submitProgress}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={progressAmount}
                      onChange={(e) => setProgressAmount(e.target.value)}
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closeProgressForm}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Progress
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

export default Goals;