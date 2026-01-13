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
  // ... (rest of the initial state)
};

// Create context
export const FinanceContext = createContext(initialState);

// Reducer
const financeReducer = (state, action) => {
  switch (action.type) {
    // ... (all your existing cases)
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    // ... (all your existing cases)
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
    dispatch({ type: 'clearError' });
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
        type: 'LOGIN_SUCCESS',
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
        payload: {
          message: err.response?.data?.message || 'Login failed',
        },
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
      if (err.response?.status ===  {
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
          type: 'GET_STATS_ERROR',
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
          type: 'GET_GOALS_ERROR',
          payload: err.response?.data?.message,
        });
      } else {
        dispatch({
          type: 'GET_GOALS_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch goals',
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
          type: 'GET_BUDGETS_ERROR',
          payload: err.response?.data?.message,
        });
      } else {
        dispatch({
          type: 'GET_BUDGETS_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch budgets',
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
          type: 'GET_INCOME_STREAMS_ERROR',
          payload: err.response?.data?.message,
        });
      } else {
        dispatch({
          type: 'GET_INCOME_STREAMS_ERROR',
          payload: err.response?.data?.message || 'Failed to fetch income streams',
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
          type: 'GET_ALERTS_ERROR',
          payload: err.response?.data?.message,
        });
      } else {
        dispatch({
          type: 'GET_ALERTS_ERROR',
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
  const updateUserDetails = async formData => {
    try {
      const res = await axios.put('/auth/updatedetails', formData);
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      // Only log out if it's an auth error (401)
      if (err.response?.status === 401) {
        dispatch({
          type: 'AUTH_ERROR',
          payload: err.response?.data?.message,
        });
      } else {
        dispatch({
          type: 'USER_LOADED',
          payload: err.response?.data?.message || 'Failed to update user details',
        });
      }
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
        // ADD THE MISSING FUNCTIONS HERE
        updateProfile: async (profileData) => {
          try {
            const res = await axios.put('/auth/profile', profileData);
            dispatch({
              type: 'USER_LOADED',
              payload: res.data.user,
            });
            return res.data.user;
          } catch (err) {
            console.error('Error updating profile:', err);
            dispatch({
              type: 'AUTH_ERROR',
              payload: err.response?.data?.message || 'Failed to update profile',
            });
          }
        },
        changePassword: async (passwordData) => {
          try {
            const res = await axios.put('/auth/change-password', passwordData);
            dispatch({
              type: 'PASSWORD_CHANGED',
              payload: res.data.message,
            });
            return res.data.message;
          } catch (err) {
            console.error('Error changing password:', err);
            dispatch({
              type: 'PASSWORD_ERROR',
              payload: err.response?.data?.message || 'Failed to change password',
            });
          }
        },
        // ... (other existing functions)
      }}
    }}>
      {children}
    </FinanceContext.Provider>
  );
};