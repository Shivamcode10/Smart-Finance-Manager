import React, { useState, useEffect, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const FinancialCalendar = () => {
  const { transactions } = useContext(FinanceContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDateTransactions, setSelectedDateTransactions] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      setSelectedDateTransactions(getTransactionsForDate(selectedDate));
    }
  }, [selectedDate, transactions]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
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
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }
    
    return days;
  };

  const getCalendarData = () => {
    const days = getCalendarDays();
    const calendarData = {};
    
    days.forEach(day => {
      if (!day) return;
      
      const dateStr = day.toISOString().split('T')[0];
      if (!calendarData[dateStr]) {
        calendarData[dateStr] = {
          transactions: [],
          income: 0,
          expenses: 0,
        };
      }
      
      const dayTransactions = getTransactionsForDate(day);
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
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });
  };

  const getHeatmapData = () => {
    const days = getCalendarDays();
    const heatmapData = {};
    
    days.forEach(day => {
      if (!day) return;
      
      const dateStr = day.toISOString().split('T')[0];
      const dayTransactions = getTransactionsForDate(day);
      heatmapData[dateStr] = {
        income: dayTransactions.reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum, 0),
        expenses: dayTransactions.reduce((sum, t) => t.type === 'expense' ? sum + t.amount : sum, 0),
        count: dayTransactions.length
      };
    });

    return heatmapData;
  };

  const getMonthlyReport = () => {
    const monthlyTransactions = getMonthlyData();
    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses
    };
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handlePreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const getTransactionsForSelectedDate = () => {
    if (selectedDate) {
      return getTransactionsForDate(selectedDate);
    }
    return [];
  };

  const getHeatmapColor = (amount) => {
    if (amount === 0) return 'bg-gray-100 dark:bg-gray-700';
    if (amount < 50) return 'bg-green-100 dark:bg-green-900/20';
    if (amount < 100) return 'bg-yellow-100 dark:bg-yellow-900/20';
    if (amount < 200) return 'bg-orange-100 dark:bg-orange-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
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
            }`}
          >
            Week
          </button>
          <button
            onClick={() => handleViewModeChange('month')}
            className={`px-3 py-2 rounded-md ${
              viewMode === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => handleViewModeChange('year')}
            className={`px-3 py-2 rounded-md ${
              viewMode === 'year'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FiChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <span className="text-lg font-medium text-gray-900 dark:text-white">
            {selectedDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FiChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {getCalendarDays().map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="p-3"></div>;
            }
            
            const dateStr = date.toISOString().split('T')[0];
            const dayTransactions = getTransactionsForDate(date);
            const hasTransactions = dayTransactions.length > 0;
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const isSelected = dateStr === selectedDate.toISOString().split('T')[0];
            
            return (
              <div
                key={index}
                onClick={() => handleDateClick(date)}
                className={`p-2 border cursor-pointer transition-colors ${
                  isToday
                    ? 'border-indigo-500 dark:border-indigo-500'
                    : 'border-gray-200 dark:border-gray-600'
                } ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-center">
                  <p className={`text-sm ${isToday ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}`}>
                    {date.getDate()}
                  </p>
                  <div className="mt-1">
                    {hasTransactions ? (
                      <div className="flex justify-center space-x-1">
                        <span className="text-xs text-green-600 dark:text-green-400">
                          {dayTransactions.filter(t => t.type === 'income').length}
                        </span>
                        <span className="text-xs text-red-600 dark:text-red-400">
                          {dayTransactions.filter(t => t.type === 'expense').length}
                        </span>
                      </div>
                    ) : (
                      <div className="h-4"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Monthly Summary */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Summary
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Income</p>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
                ${getMonthlyReport().totalIncome.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expenses</p>
              <p className="text-2xl font-semibold text-red-600 dark:text-red-400">
                ${getMonthlyReport().totalExpenses.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
              <p className={`text-2xl font-semibold ${
                getMonthlyReport().balance >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                ${getMonthlyReport().balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Selected Date Transactions */}
        {selectedDateTransactions.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Transactions for {selectedDate.toLocaleDateString()}
            </h3>
            <div className="space-y-2">
              {selectedDateTransactions.map(transaction => (
                <div key={transaction._id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.category}
                    </p>
                  </div>
                  <div className={`text-sm font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Heatmap */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Spending Heatmap
          </h3>
          <div className="grid grid-cols-7 gap-1">
            {getCalendarDays().map((date, index) => {
              if (!date) {
                return <div key={`heatmap-empty-${index}`} className="p-2"></div>;
              }
              
              const dateStr = date.toISOString().split('T')[0];
              const dayTransactions = getTransactionsForDate(date);
              const dayTotal = dayTransactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0);
              
              return (
                <div
                  key={index}
                  className={`p-2 text-center rounded ${getHeatmapColor(dayTotal)}`}
                  title={`${date.toLocaleDateString()}: $${dayTotal}`}
                >
                  <p className="text-xs text-gray-900 dark:text-white">
                    {date.getDate()}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center mt-4 space-x-2 text-xs">
            <span className="text-gray-600 dark:text-gray-400">Less</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-gray-100 dark:bg-gray-700 rounded"></div>
              <div className="w-4 h-4 bg-green-100 dark:bg-green-900/20 rounded"></div>
              <div className="w-4 h-4 bg-yellow-100 dark:bg-yellow-900/20 rounded"></div>
              <div className="w-4 h-4 bg-orange-100 dark:bg-orange-900/20 rounded"></div>
              <div className="w-4 h-4 bg-red-100 dark:bg-red-900/20 rounded"></div>
            </div>
            <span className="text-gray-600 dark:text-gray-400">More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalendar;