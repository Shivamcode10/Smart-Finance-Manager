// frontend/src/context/FinanceContext.js
import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

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
    case 'DELETE_TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload,
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
    case 'DELETE_GOAL_ERROR':
      return {
        ...state,
        error: action.payload,
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
    case 'DELETE_BUDGET_ERROR':
      return {
        ...state,
        error: action.payload,
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
    case 'DELETE_INCOME_STREAM_ERROR':
      return {
        ...state,
        error: action.payload,
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
  const [socket, setSocket] = useState(null);

  // Set base URL for axios
  axios.defaults.baseURL = 'http://localhost:5000/api';

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, []);

  // Join user room when authenticated and listen for real-time updates
  useEffect(() => {
    if (socket && state.user) {
      // Join user's personal room
      socket.emit('join', state.user._id);
      
      // Listen for real-time transaction updates
      socket.on('newTransaction', (transaction) => {
        dispatch({
          type: 'ADD_TRANSACTION',
          payload: transaction,
        });
        // Refresh stats to reflect the new transaction
        getStats();
      });
      
      socket.on('updatedTransaction', (transaction) => {
        dispatch({
          type: 'UPDATE_TRANSACTION',
          payload: transaction,
        });
        // Refresh stats to reflect the updated transaction
        getStats();
      });
      
      socket.on('deletedTransaction', (transactionId) => {
        dispatch({
          type: 'DELETE_TRANSACTION',
          payload: transactionId,
        });
        // Refresh stats to reflect the deleted transaction
        getStats();
      });
    }
  }, [socket, state.user]);

  // Load user
  const loadUser = async () => {
    const token = localStorage.token;
    
    if (token) {
      // Set the token in axios headers BEFORE making the request
      setAuthToken(token);
      
      try {
        const res = await axios.get('/auth/me');
        dispatch({
          type: 'USER_LOADED',
          payload: res.data.data,
        });
      } catch (err) {
        console.error('Error loading user:', err);
        dispatch({ type: 'AUTH_ERROR' });
      }
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Set auth token header
  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Token set in headers:', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      console.log('Token removed from headers');
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Register user
  const register = async formData => {
    try {
      const res = await axios.post('/auth/register', formData);
      
      // Store token
      localStorage.setItem('token', res.data.token);
      
      // Set token in headers
      setAuthToken(res.data.token);
      
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      
      // Load user data immediately after successful registration
      await loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response?.data?.message || 'Registration failed',
      });
    }
  };

  // Login user
  const login = async formData => {
    try {
      const res = await axios.post('/auth/login', formData);
      
      // Store token
      localStorage.setItem('token', res.data.token);
      
      // Set token in headers
      setAuthToken(res.data.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      
      // Load user data immediately after successful login
      await loadUser();
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: err.response?.data?.message || 'Login failed',
      });
    }
  };

  // Logout
  const logout = () => {
    // Disconnect socket when logging out
    if (socket) {
      socket.disconnect();
    }
    dispatch({ type: 'LOGOUT' });
  };

  // Get transactions
  const getTransactions = async () => {
    try {
      const res = await axios.get('/transactions');
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      });
    } catch (err) {
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch transactions',
        });
      }
    }
  };

  // Add transaction - Updated to immediately update state
  const addTransaction = async formData => {
    try {
      const res = await axios.post('/transactions', formData);
      
      // Immediately update the state with the new transaction
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      });
      
      // Return the transaction data
      return res.data.data;
    } catch (err) {
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        // Create a proper error object to throw
        const error = new Error(err.response?.data?.message || 'Failed to add transaction');
        error.status = err.response?.status;
        throw error;
      }
    }
  };

  // Update transaction
  const updateTransaction = async (id, formData) => {
    try {
      const res = await axios.put(`/transactions/${id}`, formData);
      
      // Immediately update the state with the updated transaction
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: res.data.data,
      });
      
      // Return the transaction data
      return res.data.data;
    } catch (err) {
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        // Create a proper error object to throw
        const error = new Error(err.response?.data?.message || 'Failed to update transaction');
        error.status = err.response?.status;
        throw error;
      }
    }
  };

  // Delete transaction
  const deleteTransaction = async id => {
    try {
      await axios.delete(`/transactions/${id}`);
      
      // Immediately update the state by removing the transaction
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      });
    } catch (err) {
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        // Create a proper error object to throw
        const error = new Error(err.response?.data?.message || 'Failed to delete transaction');
        error.status = err.response?.status;
        throw error;
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch stats',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch goals',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to add goal',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to update goal',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to update goal progress',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'DELETE_GOAL_ERROR',
          payload: err.response?.data?.message || 'Failed to delete goal',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch budgets',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to add budget',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to update budget',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'DELETE_BUDGET_ERROR',
          payload: err.response?.data?.message || 'Failed to delete budget',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch income streams',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to add income stream',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to update income stream',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'DELETE_INCOME_STREAM_ERROR',
          payload: err.response?.data?.message || 'Failed to delete income stream',
        });
      }
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
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: 'CLEAR_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch alerts',
        });
      }
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
  const updateUserDetails = async (formData) => {
  try {
    const response = await axios.put('/api/profile', formData);
    // Update the user in the global state immediately
    dispatch({
      type: 'USER_UPDATED',
      payload: response.data.data,
    });
    
    // Also update the local storage to keep the session fresh
    const updatedUser = response.data;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    // Use toast for user feedback
    toast.error(error.response?.data?.message || 'Failed to update profile');
    throw error;
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
        clearError,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};