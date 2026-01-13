import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiCreditCard, FiPieChart, FiLock, FiMail, FiUser, FiArrowRight } from 'react-icons/fi';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background with finance-themed image and gradient overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://picsum.photos/seed/finance-digital-charts/1920/1080.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/70 backdrop-blur-sm" />
      
      {/* Floating financial icons */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-blue-400/30"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiDollarSign className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-32 text-teal-400/30"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiTrendingUp className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-40 text-purple-400/30"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiCreditCard className="h-11 w-11" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-indigo-400/30"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FiPieChart className="h-9 w-9" />
        </motion.div>
      </div>
      
      {/* Main content container */}
      <motion.div 
        className="relative z-20 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="bg-white/10 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 animate-glowPulse"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo and title */}
          <motion.div 
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full shadow-lg">
              <FiDollarSign className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-300 dark:text-gray-400">
              {isLogin 
                ? 'Sign in to access your financial dashboard' 
                : 'Join us to take control of your finances'}
            </p>
          </motion.div>

          {/* Form with animated transitions */}
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
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 dark:text-gray-400 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={onChange}
                        className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 dark:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white/20 dark:bg-gray-800/40 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                        placeholder="Your name"
                      />
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 dark:text-gray-400 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={onChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 dark:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white/20 dark:bg-gray-800/40 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 dark:text-gray-400 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={onChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 dark:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white/20 dark:bg-gray-800/40 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
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
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-blue-400 dark:text-blue-300 hover:text-blue-300 dark:hover:text-blue-200 transition-colors"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center text-gray-400 dark:text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;