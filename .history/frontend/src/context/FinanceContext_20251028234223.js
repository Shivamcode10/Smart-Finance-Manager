// frontend/src/context/FinanceContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  transactions: [],
  goals: [],
  budgets: [],
  incomeStreams: [],
  stats: {
    income: 0,
    expenses: 0,
    balance: 0,
    categoryData: {},
    dailyData: {},
  },
  alerts: [],
  theme: 'light',
  error: null,
};

// Create context
export const FinanceContext = createContext(initialState);

// Reducer
const financeReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        loading: false,
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
        loading: false,
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.payload
        ),
        loading: false,
      };
    case 'GET_STATS':
      return {
        ...state,
        stats: action.payload,
        loading: false,
      };
    case 'GET_GOALS':
      return {
        ...state,
        goals: action.payload,
        loading: false,
      };
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [action.payload, ...state.goals],
        loading: false,
      };
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map(goal =>
          goal._id === action.payload._id ? action.payload : goal
        ),
        loading: false,
      };
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter(goal => goal._id !== action.payload),
        loading: false,
      };
    case 'GET_BUDGETS':
      return {
        ...state,
        budgets: action.payload,
        loading: false,
      };
    case 'ADD_BUDGET':
      return {
        ...state,
        budgets: [action.payload, ...state.budgets],
        loading: false,
      };
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(budget =>
          budget._id === action.payload._id ? action.payload : budget
        ),
        loading: false,
      };
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(budget => budget._id !== action.payload),
        loading: false,
      };
    case 'GET_INCOME_STREAMS':
      return {
        ...state,
        incomeStreams: action.payload,
        loading: false,
      };
    case 'ADD_INCOME_STREAM':
      return {
        ...state,
        incomeStreams: [action.payload, ...state.incomeStreams],
        loading: false,
      };
    case 'UPDATE_INCOME_STREAM':
      return {
        ...state,
        incomeStreams: state.incomeStreams.map(stream =>
          stream._id === action.payload._id ? action.payload : stream
        ),
        loading: false,
      };
    case 'DELETE_INCOME_STREAM':
      return {
        ...state,
        incomeStreams: state.incomeStreams.filter(
          stream => stream._id !== action.payload
        ),
        loading: false,
      };
    case 'GET_ALERTS':
      return {
        ...state,
        alerts: action.payload,
        loading: false,
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

// Create provider
export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // Set base URL for axios
  axios.defaults.baseURL = 'http://localhost:5000/api';

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/auth/me');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });lo
    }
  };

  // Set auth token header
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Register user
  const register = async formData => {
    try {
      const res = await axios.post('/auth/register', formData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Login user
  const login = async formData => {
    try {
      const res = await axios.post('/auth/login', formData);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: 'LOGOUT' });

  // Get transactions
  const getTransactions = async () => {
    try {
      const res = await axios.get('/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Add transaction
  const addTransaction = async formData => {
    try {
      const res = await axios.post('/transactions', formData);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Update transaction
  const updateTransaction = async (id, formData) => {
    try {
      const res = await axios.put(`/transactions/${id}`, formData);
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Delete transaction
  const deleteTransaction = async id => {
    try {
      await axios.delete(`/transactions/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Get stats
  const getStats = async (period = 'month') => {
    try {
      const res = await axios.get(`/transactions/stats?period=${period}`);
      dispatch({
        type: 'GET_STATS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Get goals
  const getGoals = async () => {
    try {
      const res = await axios.get('/goals');
      dispatch({
        type: 'GET_GOALS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Add goal
  const addGoal = async formData => {
    try {
      const res = await axios.post('/goals', formData);
      dispatch({
        type: 'ADD_GOAL',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Update goal
  const updateGoal = async (id, formData) => {
    try {
      const res = await axios.put(`/goals/${id}`, formData);
      dispatch({
        type: 'UPDATE_GOAL',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Update goal progress
  const updateGoalProgress = async (id, amount) => {
    try {
      const res = await axios.put(`/goals/${id}/progress`, { amount });
      dispatch({
        type: 'UPDATE_GOAL',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Delete goal
  const deleteGoal = async id => {
    try {
      await axios.delete(`/goals/${id}`);
      dispatch({
        type: 'DELETE_GOAL',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Get budgets
  const getBudgets = async () => {
    try {
      const res = await axios.get('/budgets');
      dispatch({
        type: 'GET_BUDGETS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Add budget
  const addBudget = async formData => {
    try {
      const res = await axios.post('/budgets', formData);
      dispatch({
        type: 'ADD_BUDGET',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Update budget
  const updateBudget = async (id, formData) => {
    try {
      const res = await axios.put(`/budgets/${id}`, formData);
      dispatch({
        type: 'UPDATE_BUDGET',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Delete budget
  const deleteBudget = async id => {
    try {
      await axios.delete(`/budgets/${id}`);
      dispatch({
        type: 'DELETE_BUDGET',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Get income streams
  const getIncomeStreams = async () => {
    try {
      const res = await axios.get('/income-streams');
      dispatch({
        type: 'GET_INCOME_STREAMS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Add income stream
  const addIncomeStream = async formData => {
    try {
      const res = await axios.post('/income-streams', formData);
      dispatch({
        type: 'ADD_INCOME_STREAM',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Update income stream
  const updateIncomeStream = async (id, formData) => {
    try {
      const res = await axios.put(`/income-streams/${id}`, formData);
      dispatch({
        type: 'UPDATE_INCOME_STREAM',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Delete income stream
  const deleteIncomeStream = async id => {
    try {
      await axios.delete(`/income-streams/${id}`);
      dispatch({
        type: 'DELETE_INCOME_STREAM',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Get alerts
  const getAlerts = async () => {
    try {
      const res = await axios.get('/budgets/alerts');
      dispatch({
        type: 'GET_ALERTS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Set theme
  const setTheme = theme => {
    dispatch({
      type: 'SET_THEME',
      payload: theme,
    });
  };

  // Update user details
  const updateUserDetails = async formData => {
    try {
      const res = await axios.put('/auth/updatedetails', formData);
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response.data.message,
      });
    }
  };

  // Initialize
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        getTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getStats,
        getGoals,
        addGoal,
        updateGoal,
        updateGoalProgress,
        deleteGoal,
        getBudgets,
        addBudget,
        updateBudget,
        deleteBudget,
        getIncomeStreams,
        addIncomeStream,
        updateIncomeStream,
        deleteIncomeStream,
        getAlerts,
        setTheme,
        updateUserDetails,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};