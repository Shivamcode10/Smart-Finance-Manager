import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// --- CHANGE 1: USE RELATIVE PATH FOR API ---
// We use '/api' because the _redirects file will handle the forwarding
// This solves CORS for Login/Register/Transactions automatically
const API_URL = '/api'; 

// --- CHANGE 2: KEEP SOCKET URL ABSOLUTE ---
// WebSockets cannot use the simple proxy. They need the direct address.
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

console.log('API URL (Proxy):', API_URL);
console.log('Socket URL (Direct):', SOCKET_URL);

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

export const FinanceContext = createContext(initialState);

const financeReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return { ...state, isAuthenticated: true, loading: false, user: action.payload };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return { ...state, ...action.payload, isAuthenticated: true, loading: false };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'GET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions], loading: false };
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
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload),
        loading: false,
      };
    case 'GET_STATS':
      return { ...state, stats: action.payload, loading: false };
    case 'GET_GOALS':
      return { ...state, goals: action.payload, loading: false };
    case 'ADD_GOAL':
      return { ...state, goals: [action.payload, ...state.goals], loading: false };
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map(goal => goal._id === action.payload._id ? action.payload : goal),
        loading: false,
      };
    case 'DELETE_GOAL':
      return { ...state, goals: state.goals.filter(goal => goal._id !== action.payload), loading: false };
    case 'GET_BUDGETS':
      return { ...state, budgets: action.payload, loading: false };
    case 'ADD_BUDGET':
      return { ...state, budgets: [action.payload, ...state.budgets], loading: false };
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(budget => budget._id === action.payload._id ? action.payload : budget),
        loading: false,
      };
    case 'DELETE_BUDGET':
      return { ...state, budgets: state.budgets.filter(budget => budget._id !== action.payload), loading: false };
    case 'GET_INCOME_STREAMS':
      return { ...state, incomeStreams: action.payload, loading: false };
    case 'ADD_INCOME_STREAM':
      return { ...state, incomeStreams: [action.payload, ...state.incomeStreams], loading: false };
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
        incomeStreams: state.incomeStreams.filter(stream => stream._id !== action.payload),
        loading: false,
      };
    case 'GET_ALERTS':
      return { ...state, alerts: action.payload, loading: false };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  const [socket, setSocket] = useState(null);

  axios.defaults.baseURL = API_URL; 

  useEffect(() => {
    if (!state.user) return;

    // Websockets require the absolute URL
    const newSocket = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);
    newSocket.emit('join', state.user._id);

    newSocket.on('newTransaction', (transaction) => {
      dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
      getStats();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [state.user]);

  const loadUser = async () => {
    const token = localStorage.token;
    if (token) {
      setAuthToken(token);
      try {
        const res = await axios.get('/auth/me');
        dispatch({ type: 'USER_LOADED', payload: res.data.data });
      } catch (err) {
        dispatch({ type: 'AUTH_ERROR' });
      }
    } else {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  const register = async formData => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post('/auth/register', formData, config);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.response?.data?.message || 'Registration failed' });
    }
  };

  const login = async formData => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await axios.post('/auth/login', formData, config);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      loadUser();
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR', payload: err.response?.data?.message || 'Login failed' });
    }
  };

  const logout = () => {
    if (socket) socket.disconnect();
    dispatch({ type: 'LOGOUT' });
  };

  const getTransactions = async () => {
    try {
      const res = await axios.get('/transactions');
      dispatch({ type: 'GET_TRANSACTIONS', payload: res.data.data });
    } catch (err) {}
  };

  const addTransaction = async formData => {
    try {
      const res = await axios.post('/transactions', formData);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data.data });
      return res.data.data;
    } catch (err) {
      throw err;
    }
  };

  const updateTransaction = async (id, formData) => {
    try {
      const res = await axios.put(`/transactions/${id}`, formData);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: res.data.data });
    } catch (err) {}
  };

  const deleteTransaction = async id => {
    try {
      await axios.delete(`/transactions/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {}
  };

  const getStats = async (period = 'month') => {
    try {
      const res = await axios.get(`/transactions/stats?period=${period}`);
      dispatch({ type: 'GET_STATS', payload: res.data.data });
    } catch (err) {}
  };

  const getGoals = async () => {
    try {
      const res = await axios.get('/goals');
      dispatch({ type: 'GET_GOALS', payload: res.data.data });
    } catch (err) {}
  };

  const addGoal = async formData => {
    try {
      const res = await axios.post('/goals', formData);
      dispatch({ type: 'ADD_GOAL', payload: res.data.data });
    } catch (err) {}
  };

  const updateGoal = async (id, formData) => {
    try {
      const res = await axios.put(`/goals/${id}`, formData);
      dispatch({ type: 'UPDATE_GOAL', payload: res.data.data });
    } catch (err) {}
  };

  const deleteGoal = async id => {
    try {
      await axios.delete(`/goals/${id}`);
      dispatch({ type: 'DELETE_GOAL', payload: id });
    } catch (err) {}
  };

  const getBudgets = async () => {
    try {
      const res = await axios.get('/budgets');
      dispatch({ type: 'GET_BUDGETS', payload: res.data.data });
    } catch (err) {}
  };

  const addBudget = async formData => {
    try {
      const res = await axios.post('/budgets', formData);
      dispatch({ type: 'ADD_BUDGET', payload: res.data.data });
    } catch (err) {}
  };

  const updateBudget = async (id, formData) => {
    try {
      const res = await axios.put(`/budgets/${id}`, formData);
      dispatch({ type: 'UPDATE_BUDGET', payload: res.data.data });
    } catch (err) {}
  };

  const deleteBudget = async id => {
    try {
      await axios.delete(`/budgets/${id}`);
      dispatch({ type: 'DELETE_BUDGET', payload: id });
    } catch (err) {}
  };

  const getIncomeStreams = async () => {
    try {
      const res = await axios.get('/income-streams');
      dispatch({ type: 'GET_INCOME_STREAMS', payload: res.data.data });
    } catch (err) {}
  };

  const addIncomeStream = async formData => {
    try {
      const res = await axios.post('/income-streams', formData);
      dispatch({ type: 'ADD_INCOME_STREAM', payload: res.data.data });
    } catch (err) {}
  };

  const updateIncomeStream = async (id, formData) => {
    try {
      const res = await axios.put(`/income-streams/${id}`, formData);
      dispatch({ type: 'UPDATE_INCOME_STREAM', payload: res.data.data });
    } catch (err) {}
  };

  const deleteIncomeStream = async id => {
    try {
      await axios.delete(`/income-streams/${id}`);
      dispatch({ type: 'DELETE_INCOME_STREAM', payload: id });
    } catch (err) {}
  };

  const getAlerts = async () => {
    try {
      const res = await axios.get('/budgets/alerts');
      dispatch({ type: 'GET_ALERTS', payload: res.data.data });
    } catch (err) {}
  };

  const setTheme = theme => dispatch({ type: 'SET_THEME', payload: theme });

  const updateUserDetails = async formData => {
    try {
      const res = await axios.put('/auth/updatedetails', formData);
      dispatch({ type: 'USER_LOADED', payload: res.data.data });
    } catch (err) {}
  };

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