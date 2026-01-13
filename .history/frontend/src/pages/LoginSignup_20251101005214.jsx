import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight, FiDollarSign, FiTrendingUp, FiShield } from 'react-icons/fi';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [focusedInput, setFocusedInput] = useState('');
  const { login, register, isAuthenticated, error } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isLogin) {
      login({ email, password });
    } else {
      register({ name, email, password });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const tabVariants = {
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#ffffff',
      y: 0,
    },
    inactive: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'rgba(255, 255, 255, 0.7)',
      y: 0,
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-teal-800 to-purple-900 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-800/20 to-purple-800/20 animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />
      </div>
      
      {/* Financial-themed floating elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 text-blue-300/20"
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiDollarSign className="h-16 w-16" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-teal-300/20"
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiTrendingUp className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-40 text-purple-300/20"
          animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiShield className="h-14 w-14" />
        </motion.div>
      </div>
      
      {/* Main content */}
      <motion.div 
        className="relative z-20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-float"
          variants={itemVariants}
        >
          {/* Logo/Icon */}
          <motion.div 
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full">
              <FiDollarSign className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          {/* Tab Toggle */}
          <motion.div 
            className="flex p-1 bg-white/5 rounded-lg mb-6"
            variants={itemVariants}
          >
            <motion.button
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"
              variants={tabVariants}
              animate={isLogin ? 'active' : 'inactive'}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </motion.button>
            <motion.button
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"
              variants={tabVariants}
              animate={!isLogin ? 'active' : 'inactive'}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'signup'}
              className="space-y-6" 
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {error && (
                <motion.div 
                  className="bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-200 px-4 py-3 rounded-lg"
                  variants={itemVariants}
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-4">
                {!isLogin && (
                  <motion.div variants={itemVariants} className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={onChange}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput('')}
                      className={`peer appearance-none relative block w-full px-3 py-3 pt-5 border ${focusedInput === 'name' || name ? 'border-blue-400' : 'border-white/20'} placeholder-transparent text-white bg-white/10 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent sm:text-sm transition-all`}
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-3 transition-all ${focusedInput === 'name' || name ? 'text-xs top-1 text-blue-400' : 'text-sm top-3.5 text-white/60'} pointer-events-none`}
                    >
                      Name
                    </label>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiUser className={`h-5 w-5 ${focusedInput === 'name' || name ? 'text-blue-400' : 'text-white/40'}`} />
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={onChange}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput('')}
                    className={`peer appearance-none relative block w-full px-3 py-3 pt-5 border ${focusedInput === 'email' || email ? 'border-blue-400' : 'border-white/20'} placeholder-transparent text-white bg-white/10 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent sm:text-sm transition-all`}
                    placeholder="Email address"
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-3 transition-all ${focusedInput === 'email' || email ? 'text-xs top-1 text-blue-400' : 'text-sm top-3.5 text-white/60'} pointer-events-none`}
                  >
                    Email address
                  </label>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiMail className={`h-5 w-5 ${focusedInput === 'email' || email ? 'text-blue-400' : 'text-white/40'}`} />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={onChange}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput('')}
                    className={`peer appearance-none relative block w-full px-3 py-3 pt-5 border ${focusedInput === 'password' || password ? 'border-blue-400' : 'border-white/20'} placeholder-transparent text-white bg-white/10 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent sm:text-sm transition-all`}
                    placeholder="Password"
                  />
                  <label 
                    htmlFor="password" 
                    className={`absolute left-3 transition-all ${focusedInput === 'password' || password ? 'text-xs top-1 text-blue-400' : 'text-sm top-3.5 text-white/60'} pointer-events-none`}
                  >
                    Password
                  </label>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiLock className={`h-5 w-5 ${focusedInput === 'password' || password ? 'text-blue-400' : 'text-white/40'}`} />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 transition-all animate-glowPulse"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                  <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>

              <motion.div 
                className="text-center pt-4"
                variants={itemVariants}
              >
                {isLogin && (
                  <motion.button
                    type="button"
                    className="block w-full text-sm text-white/60 hover:text-white/80 transition-colors mb-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Forgot your password?
                  </motion.button>
                )}
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-white/80 hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </motion.button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center text-white/60 text-sm"
          variants={itemVariants}
        >
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;