// frontend/src/components/LoginSignup.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiLock,
  FiUser,
  FiTrendingUp,
  FiDollarSign,
  FiCreditCard,
  FiPieChart,
  FiShield,
  FiActivity,
  FiBarChart2,
} from 'react-icons/fi';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [focusedInput, setFocusedInput] = useState('');
  const { login, register, isAuthenticated, error } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLogin) login({ email, password });
    else register({ name, email, password });
  };

  // Animations
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.06 } } };
  const item = { hidden: { y: 14, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 110, damping: 14 } } };
  const formVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 110, damping: 16 } }, exit: { opacity: 0, x: 20, transition: { duration: 0.25 } } };

  // Floating/Decor
  const currencySymbols = ['$', '€', '£', '¥', '₹', '₽', '₩', '₺'];
  const floating = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    dur: Math.random() * 12 + 8,
    symbol: currencySymbols[Math.floor(Math.random() * currencySymbols.length)],
  }));

  const financeIcons = [
    { icon: FiDollarSign, color: 'text-cyan-400', size: 'h-7 w-7', delay: 0 },
    { icon: FiTrendingUp, color: 'text-blue-400', size: 'h-9 w-9', delay: 0.5 },
    { icon: FiCreditCard, color: 'text-indigo-400', size: 'h-8 w-8', delay: 1 },
    { icon: FiPieChart, color: 'text-teal-400', size: 'h-7 w-7', delay: 1.5 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-indigo-900 dark:to-slate-800 transition-colors duration-500 relative overflow-hidden py-10 px-4">
      {/* Floating gradient bubbles */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-20 -top-10 w-96 h-96 bg-gradient-to-tr from-cyan-300 to-blue-400 rounded-full opacity-20 blur-3xl mix-blend-overlay" />
        <div className="absolute right-0 -bottom-20 w-80 h-80 bg-gradient-to-br from-indigo-500 to-emerald-400 rounded-full opacity-12 blur-2xl mix-blend-overlay" />
      </div>

      {/* Floating currency symbols */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {floating.map((f) => (
          <motion.span
            key={f.id}
            className="absolute text-xl font-semibold text-cyan-500/30 dark:text-blue-200/20"
            style={{ left: `${f.left}%`, top: `${f.top}%`, textShadow: '0 6px 20px rgba(0,0,0,0.12)' }}
            animate={{ y: [0, -20, 0], opacity: [0.25, 0.6, 0.25], rotate: [0, 6, 0] }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: f.dur, delay: f.delay, ease: 'easeInOut' }}
          >
            {f.symbol}
          </motion.span>
        ))}

        {financeIcons.map((it, idx) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={idx}
              className={`absolute ${it.color} opacity-30`}
              style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))' }}
              animate={{ y: [0, -22, 0], rotate: [0, 12, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 8 + idx, delay: it.delay, repeat: Infinity, repeatType: 'reverse' }}
            >
              <Icon className={`${it.size}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Card */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full max-w-md"
      >
        <motion.div
          variants={item}
          className="bg-white/70 dark:bg-gray-900/65 backdrop-blur-xl border border-white/10 dark:border-gray-700 rounded-2xl shadow-2xl p-8 sm:p-10"
          style={{ boxShadow: '0 20px 50px rgba(2,6,23,0.45)' }}
        >
          {/* Logo */}
          <motion.div variants={item} className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
              <FiDollarSign className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          <motion.div variants={item} className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {isLogin ? 'Sign in to manage your finances' : 'Start your journey to smarter finances'}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              {error && (
                <motion.div variants={item} className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 px-4 py-3">
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                {!isLogin && (
                  <motion.div variants={item}>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-slate-400 dark:text-slate-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={onChange}
                        onFocus={() => setFocusedInput('name')}
                        onBlur={() => setFocusedInput('')}
                        className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                          focusedInput === 'name' ? 'border-cyan-400 ring-1 ring-cyan-400 bg-cyan-50/10' : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/50'
                        } placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none transition-all duration-200`}
                        placeholder="John Doe"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div variants={item}>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-slate-400 dark:text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={onChange}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput('')}
                      className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                        focusedInput === 'email' ? 'border-cyan-400 ring-1 ring-cyan-400 bg-cyan-50/10' : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/50'
                      } placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none transition-all duration-200`}
                      placeholder="you@example.com"
                    />
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-slate-400 dark:text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={onChange}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput('')}
                      className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                        focusedInput === 'password' ? 'border-cyan-400 ring-1 ring-cyan-400 bg-cyan-50/10' : 'border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/50'
                      } placeholder-slate-400 text-slate-900 dark:text-slate-100 focus:outline-none transition-all duration-200`}
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={item} className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 transition-all duration-200"
                >
                  {isLogin ? 'Sign in' : 'Create account'}
                </motion.button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </motion.div>

        {/* subtle footer / small legal */}
        <motion.p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          By continuing you agree to our Terms & Privacy.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginSignup;