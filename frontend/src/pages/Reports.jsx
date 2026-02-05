
import React, { useEffect, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import FinancialReports from '../components/FinancialReports';

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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Financial Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Comprehensive insights into your financial health
        </p>
      </div>

      <FinancialReports 
        transactions={transactions}
        goals={goals}
      />
    </div>
  );
};

export default Reports;