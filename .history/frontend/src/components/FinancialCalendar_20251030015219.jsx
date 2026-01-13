import React, { useState, useEffect, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FinancialCalendar = () => {
  const { transactions } = useContext(FinanceContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [calendarTransactions, setCalendarTransactions] = useState([]);

  useEffect(() => {
    setCalendarTransactions(transactions);
  }, [transactions]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return daysInMonth;
  };

  const getTransactionsForDate = (date) => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.toDateString() === date.toDateString()
      );
    });
  };

  const getCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i + 1);
      days.push(date);
    }
    return days;
  };

  const getTransactionsForMonth = (month, year) => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });
  };

  const getCalendarData = () => {
    const days = getCalendarDays();
    const calendarData = {};
    
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      if (!calendarData[dateStr]) {
        calendarData[dateStr] = {
          transactions: [],
          income: 0,
          expenses: 0,
        };
      }
      
      const dayTransactions = getTransactionsForDate(dateStr);
      dayTransactions.forEach(t => {
        if (t.type === 'income') {
          calendarData[dateStr].income += t.amount;
        } else {
          calendarData[dateStr].expenses += t.amount;
        }
      });
    });

    return calendarData;
  };

  const getHeatmapData = () => {
    const days = getCalendarDays();
    const heatmapData = {};
    
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      const dayTransactions = getTransactionsForDate(dateStr);
      heatmapData[dateStr] = {
        income: dayTransactions.reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum, 0),
        expenses: dayTransactions.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0),
        count: dayTransactions.length
      };
    });

    return heatmapData;
  </div>

  const getMonthlyData = () => {
    const days = getCalendarDays();
    const monthlyData = {};
    
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      if (!monthlyData[dateStr]) {
        monthlyData[dateStr] = {
          transactions: [],
          income: 0,
          expenses: 0,
        };
      }
      
      const dayTransactions = getTransactionsForDate(dateStr);
      dayTransactions.forEach(t => {
        if (t.type === 'income') {
          monthlyData[dateStr].income += t.amount;
        } else {
          monthlyData[dateStr].expenses += t.amount;
        }
      });
    });

    return monthlyData;
  };

  return {
    calendarData,
    heatmapData,
    monthlyData
  };
};

const FinancialCalendar = () => {
  const { transactions } = useContext(FinanceContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [calendarData, heatmapData, monthlyData] = getCalendarData();
  const [selectedDateTransactions, setSelectedDateTransactions] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedDateTransactions(getTransactionsForDate(selectedDate.toISOString().split('T')[0]);
    }
  }, [selectedDate]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getTransactionsForDate = (date) => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.toDateString() === date.toDateString()
      );
    });
  };

  const getCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i + 1);
      days.push(date);
    }
    return days;
  };

  const getCalendarData = () => {
    const days = getCalendarDays();
    const calendarData = {};
    
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      if (!calendarData[dateStr]) {
        calendarData[dateStr] = {
          transactions: [],
          income: 0,
          expenses: 0,
        };
      }
      
      const dayTransactions = getTransactionsForDate(dateStr);
      dayTransactions.forEach(t => {
        if (t.type === 'income') {
          calendarData[dateStr].income += t.amount;
        } else {
          calendarData[dateStr].expenses += t.amount;
        }
      });
    });

    return calendarData;
  };

  const getMonthlyData = () => {
    const days = getCalendarDays();
    const monthlyData = {};
    
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      if (!monthlyData[dateStr]) {
        monthlyData[dateStr] = {
          transactions: [],
          income: 0,
          expenses: 0,
        };
      }
      
      const dayTransactions = getTransactionsForDate(dateStr);
      dayTransactions.forEach(t => {
        if (t.type === 'income') {
          monthlyData[dateStr].income += t.amount;
        } else {
          monthlyData[dateStr].expenses += t.amount;
        }
      });
    });

    return monthlyData;
  };

  const getHeatmapData = () => {
    const days = getCalendarDays();
    const heatmapData = {};
    
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0];
      const dayTransactions = getTransactionsForDate(dateStr);
      heatmapData[dateStr] = {
        income: dayTransactions.reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum, 0),
        expenses: dayTransactions.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0),
        count: dayTransactions.length
      };
    });

    return heatmapData;
  };

  const getMonthlyReport = () => {
    const monthlyData = getMonthlyData();
    const totalIncome = Object.values(monthlyData).reduce((sum, data) => sum + data.income, 0);
    const totalExpenses = Object.values(monthlyData).reduce((sum, data) => sum + data.expenses, 0);
    
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      monthlyData
    };
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const getTransactionsForSelectedDate = () => {
    if (selectedDate) {
      return getTransactionsForDate(selectedDate.toISOString().split('T')[0]);
    }
    return [];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <FiCalendar className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Financial Calendar
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewModeChange('week')}
            className={`px-3 py-2 rounded-md ${
              viewMode === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700'
            }
          >
            Week
          </button>
          <button
            onClick={() => handleViewModeChange('month')}
            className={`px-3 py-2 rounded-md ${
              viewMode === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700'
            }
          >
            Month
          </button>
          <button
            onClick={() => handleViewModeChange('year')}
            className={`px-3 py-2 rounded-md ${
              viewMode === 'year'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700'
            }
          >
            Year
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={() => handleDateClick(new Date(selectedDate.setDate(selectedDate.getDate() - 1))}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <FiChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {selectedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleDateClick(new Date(selectedDate.setDate(selectedDate.getDate() + 1))}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <FiChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {selectedDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {getCalendarDays().map((date, index) => {
            const dateStr = date.toISOString().split('T')[0];
            const transactions = getTransactionsForDate(dateStr);
            const hasTransactions = transactions.length > 0;
            
            return (
              <div
                key={index}
                className={`p-3 border ${
                  dateStr === new Date().toISOString().split('T')[0]
                    ? 'border-indigo-500 dark:border-indigo-500'
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <div className="mt-1">
                    {hasTransactions ? (
                      <div className="flex justify-center space-x-2">
                        <span className="text-green-600 dark:text-green-400">
                          {transactions.filter(t => t.type === 'income').length} Income
                        </span>
                        <span className="text-red-600 dark:text-red-400">
                          {transactions.filter(t => t.type === 'expense').length} Expenses
                        </span>
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No transactions
                      </p>
                    )
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Monthly Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            }}
          </h3>
          
          <div className="grid grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Income</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${getMonthlyReport().income.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expenses</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${getMonthlyReport().expenses.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                ${getMonthlyReport().balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="spending heatmap of this month</h3>
          <div className="mt-4">
            <div className="grid grid grid-cols-7 gap-1">
              {getCalendarDays().slice(0, 7).map((date, index) => {
                const dateStr = date.toISOString().split('T')[0];
                const dayTransactions = getTransactionsForDate(dateStr);
                const dayTotal = dayTransactions.reduce((sum, t) => t.amount, 0);
                
                return (
                  <div
                    key={index}
                    className={`p-2 text-center ${
                      dayTotal > 100
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                        : 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    }`}
                  >
                    <p className="text-xs text-gray-900 dark:text-white">
                      {date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      ${dayTotal.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
  );
};

export default FinancialCalendar;