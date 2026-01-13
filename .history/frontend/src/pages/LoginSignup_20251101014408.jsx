import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiTrendingUp, FiDollarSign, FiCreditCard, FiPieChart, FiShield, FiActivity, FiBarChart2 } from 'react-icons/fi';

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
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  // Currency symbols for floating animation
  const currencySymbols = ['$', '€', '£', '¥', '₹', '₽', '₩', '₺', '₴', '₦'];
  
  // Generate random positions for floating elements
  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    symbol: currencySymbols[Math.floor(Math.random() * currencySymbols.length)]
  }));

  // Finance icons for floating animation
  const financeIcons = [
    { icon: FiDollarSign, color: 'text-cyan-400', size: 'h-8 w-8', delay: 0 },
    { icon: FiTrendingUp, color: 'text-blue-400', size: 'h-10 w-10', delay: 0.5 },
    { icon: FiCreditCard, color: 'text-indigo-400', size: 'h-9 w-9', delay: 1 },
    { icon: FiPieChart, color: 'text-teal-400', size: 'h-7 w-7', delay: 1.5 },
    { icon: FiShield, color: 'text-emerald-400', size: 'h-11 w-11', delay: 2 },
    { icon: FiActivity, color: 'text-purple-400', size: 'h-8 w-8', delay: 2.5 },
    { icon: FiBarChart2, color: 'text-pink-400', size: 'h-9 w-9', delay: 3 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      {/* Dark multi-layer finance background */}
      <div className="fixed inset-0 z-0">
        {/* Dark base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/50 to-black" />
        
        {/* Finance-themed dark background image */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://picsum.photos/seed/dark-financial-dashboard/1920/1080.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-cyan-900/40" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/30 via-transparent to-purple-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-900/20" />
      </div>
      
      {/* Animated financial chart pattern overlay */}
      <div className="fixed inset-0 z-10 opacity-10">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chartPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Mini bar chart */}
              <rect x="10" y="60" width="8" height="30" fill="currentColor" className="text-cyan-400" />
              <rect x="25" y="40" width="8" height="50" fill="currentColor" className="text-blue-400" />
              <rect x="40" y="50" width="8" height="40" fill="currentColor" className="text-indigo-400" />
              <rect x="55" y="30" width="8" height="60" fill="currentColor" className="text-teal-400" />
              <rect x="70" y="45" width="8" height="45" fill="currentColor" className="text-emerald-400" />
              
              {/* Mini line chart */}
              <polyline points="10,80 25,70 40,75 55,60 70,65 85,55" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-purple-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chartPattern)" />
        </svg>
      </div>
      
      {/* Animated grid pattern for tech feel */}
      <div className="fixed inset-0 z-10 opacity-5">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Floating currency symbols with glow effect */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute ${isLogin ? 'text-cyan-400' : 'text-blue-400'} opacity-30 text-2xl font-bold`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              textShadow: '0 0 10px currentColor',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {element.symbol}
          </motion.div>
        ))}
      </div>
      
      {/* Floating finance icons with enhanced glow */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        {financeIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className={`absolute ${item.color} opacity-40`}
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                filter: 'drop-shadow(0 0 8px currentColor)',
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + index,
                delay: item.delay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Icon className={`${item.size}`} />
            </motion.div>
          );
        })}
      </div>
      
      {/* Enhanced glowing particles */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              boxShadow: '0 0 6px currentColor',
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Main content container */}
      <motion.div 
        className="relative z-20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50"
          variants={itemVariants}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)'
          }}
        >
          {/* Logo and title with enhanced glow */}
          <motion.div 
            className="flex justify-center mb-6"
            variants={itemVariants}
          >
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg" 
                 style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}>
              <FiDollarSign className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400">
              {isLogin 
                ? 'Sign in to access your Smart Finance Manager' 
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
                  className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg backdrop-blur-sm"
                  variants={itemVariants}
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-4">
                {!isLogin && (
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-500" />
                      </div>
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
                        className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${focusedInput === 'name' ? 'border-cyan-500 ring-1 ring-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-gray-800/50'} placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all backdrop-blur-sm`}
                        placeholder="John Doe"
                      />
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-500" />
                    </div>
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
                      className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${focusedInput === 'email' ? 'border-cyan-500 ring-1 ring-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-gray-800/50'} placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all backdrop-blur-sm`}
                      placeholder="name@example.com"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-500" />
                    </div>
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
                      className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${focusedInput === 'password' ? 'border-cyan-500 ring-1 ring-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-gray-800/50'} placeholder-gray-500 text-white rounded-lg focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all backdrop-blur-sm`}
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)' }}
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                  <FiTrendingUp className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>

              <motion.div 
                className="text-center pt-4"
                variants={itemVariants}
              >
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
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
          className="mt-6 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;