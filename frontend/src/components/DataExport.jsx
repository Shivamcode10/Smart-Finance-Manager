import React, { useState } from 'react';
import { FiDownload, FiFileText, FiDatabase, FiCalendar } from 'react-icons/fi';

const DataExport = ({ transactions, goals, budgets, incomeStreams }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportType, setExportType] = useState('transactions');
  const [dateRange, setDateRange] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0] || {});
    const csvHeaders = headers.join(',');
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    );
    
    const csvContent = [csvHeaders, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const exportToJSON = (data, filename) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const exportToPDF = async (data, filename) => {
   
    const htmlContent = `
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${filename}</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                ${Object.keys(data[0] || {}).map(key => `<th>${key}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(row => 
                `<tr>${Object.values(row).map(value => `<td>${value}</td>`).join('')}</tr>`
              ).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.html`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const filterDataByDateRange = (data) => {
    if (dateRange === 'all') return data;
    
    const now = new Date();
    let startDate = new Date();
    
    switch (dateRange) {
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return data.filter(item => {
      const itemDate = new Date(item.date || item.createdAt);
      return itemDate >= startDate;
    });
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      let dataToExport = [];
      let filename = '';
      
      switch (exportType) {
        case 'transactions':
          dataToExport = filterDataByDateRange(transactions);
          filename = `transactions-${dateRange}-${new Date().toISOString().split('T')[0]}`;
          break;
        case 'goals':
          dataToExport = goals;
          filename = `goals-${new Date().toISOString().split('T')[0]}`;
          break;
        case 'budgets':
          dataToExport = budgets;
          filename = `budgets-${new Date().toISOString().split('T')[0]}`;
          break;
        case 'incomeStreams':
          dataToExport = incomeStreams;
          filename = `income-streams-${new Date().toISOString().split('T')[0]}`;
          break;
        case 'all':
          dataToExport = {
            transactions: filterDataByDateRange(transactions),
            goals,
            budgets,
            incomeStreams
          };
          filename = `complete-backup-${new Date().toISOString().split('T')[0]}`;
          break;
      }
      
      switch (exportFormat) {
        case 'csv':
          if (exportType === 'all') {
            // Export each type separately for CSV
            Object.entries(dataToExport).forEach(([key, data]) => {
              if (Array.isArray(data) && data.length > 0) {
                exportToCSV(data, `${filename}-${key}`);
              }
            });
          } else {
            exportToCSV(dataToExport, filename);
          }
          break;
        case 'json':
          exportToJSON(dataToExport, filename);
          break;
        case 'pdf':
          if (exportType === 'all') {
            // For PDF, we'll create a summary
            const summaryData = {
              exportDate: new Date().toISOString(),
              summary: {
                totalTransactions: transactions.length,
                totalGoals: goals.length,
                totalBudgets: budgets.length,
                totalIncomeStreams: incomeStreams.length
              }
            };
            exportToPDF([summaryData], filename);
          } else {
            exportToPDF(dataToExport, filename);
          }
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Export Your Data
      </h2>
      
      <div className="space-y-6">
        {/* Export Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What would you like to export?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { value: 'transactions', label: 'Transactions', icon: FiFileText },
              { value: 'goals', label: 'Goals', icon: FiFileText },
              { value: 'budgets', label: 'Budgets', icon: FiFileText },
              { value: 'incomeStreams', label: 'Income Streams', icon: FiFileText },
              { value: 'all', label: 'Complete Backup', icon: FiDatabase }
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setExportType(type.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  exportType === type.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <type.icon className="h-5 w-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        {exportType === 'transactions' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiCalendar className="inline h-4 w-4 mr-1" />
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Time</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        )}

        {/* Export Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Export Format
          </label>
          <div className="flex space-x-4">
            {[
              { value: 'csv', label: 'CSV', description: 'Best for spreadsheets' },
              { value: 'json', label: 'JSON', description: 'Best for developers' },
              { value: 'pdf', label: 'PDF', description: 'Best for printing' }
            ].map((format) => (
              <label key={format.value} className="flex items-center">
                <input
                  type="radio"
                  value={format.value}
                  checked={exportFormat === format.value}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="mr-2"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{format.label}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{format.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiDownload className="h-4 w-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataExport;