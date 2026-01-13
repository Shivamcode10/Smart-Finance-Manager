import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiX, FiCalendar, FiDollarSign, FiTag } from 'react-icons/fi';

const SmartSearch = ({ transactions, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    dateRange: 'all',
    amountRange: 'all',
    emotion: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Generate smart suggestions
  useEffect(() => {
    if (searchTerm.length > 2) {
      const filtered = transactions.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, transactions]);

  // Apply filters
  useEffect(() => {
    let filtered = transactions;

    // Search term
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (filters.dateRange) {
        case 'today':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'year':
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
      }
      
      filtered = filtered.filter(t => new Date(t.date) >= startDate);
    }

    // Amount range filter
    if (filters.amountRange !== 'all') {
      filtered = filtered.filter(t => {
        switch (filters.amountRange) {
          case 'small':
            return t.amount < 50;
          case 'medium':
            return t.amount >= 50 && t.amount < 200;
          case 'large':
            return t.amount >= 200;
          default:
            return true;
        }
      });
    }

    // Emotion filter
    if (filters.emotion !== 'all') {
      filtered = filtered.filter(t => t.emotion === filters.emotion);
    }

    onFilter(filtered);
  }, [searchTerm, filters, transactions, onFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      type: 'all',
      category: 'all',
      dateRange: 'all',
      amountRange: 'all',
      emotion: 'all'
    });
  };

  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
            placeholder="Search transactions..."
          />
          
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setSearchTerm(suggestion.description)}
                >
                  <div className="flex items-center">
                    <span className="ml-3 block truncate font-normal">
                      {suggestion.description}
                    </span>
                    <span className="ml-2 text-gray-500 text-sm">
                      ${suggestion.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            <FiFilter className="h-4 w-4" />
            <span>Advanced Filters</span>
            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs">
              {Object.values(filters).filter(f => f !== 'all').length}
            </span>
          </button>
          
          {(searchTerm || Object.values(filters).some(f => f !== 'all')) && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
            >
              <FiX className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FiDollarSign className="inline h-4 w-4 mr-1" />
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FiTag className="inline h-4 w-4 mr-1" />
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FiCalendar className="inline h-4 w-4 mr-1" />
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Amount Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount Range
              </label>
              <select
                value={filters.amountRange}
                onChange={(e) => setFilters({...filters, amountRange: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Amounts</option>
                <option value="small">Small (&lt;$50)</option>
                <option value="medium">Medium ($50-$200)</option>
                <option value="large">Large (&gt;$200)</option>
              </select>
            </div>

            {/* Emotion Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood
              </label>
              <select
                value={filters.emotion}
                onChange={(e) => setFilters({...filters, emotion: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Moods</option>
                <option value="happy">😊 Happy</option>
                <option value="neutral">😐 Neutral</option>
                <option value="sad">😢 Sad</option>
                <option value="angry">😠 Angry</option>
                <option value="surprised">😲 Surprised</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSearch;