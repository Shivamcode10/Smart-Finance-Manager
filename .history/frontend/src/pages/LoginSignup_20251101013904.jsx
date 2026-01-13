import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiCpu, FiTrendingUp, FiDollarSign, FiShield, FiActivity, FiZap, FiDatabase, FiCode } from 'react-icons/fi';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [focusedInput, setFocusedInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const { login, register, isAuthenticated, error } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  // 3D tilt effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        login({ email, password });
      } else {
        register({ name, email, password });
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -100, rotateY: -90 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      rotateY: 90,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 35px rgba(139, 92, 246, 0.6)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 },
    loading: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity
      }
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 5,
    color: ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
  }));

  // Floating tech icons
  const techIcons = [
    { icon: FiCpu, color: 'text-violet-400', size: 'h-8 w-8', delay: 0 },
    { icon: FiDatabase, color: 'text-blue-400', size: 'h-10 w-10', delay: 0.5 },
    { icon: FiCode, color: 'text-cyan-400', size: 'h-9 w-9', delay: 1 },
    { icon: FiZap, color: 'text-emerald-400', size: 'h-7 w-7', delay: 1.5 },
    { icon: FiShield, color: 'text-purple-400', size: 'h-11 w-11', delay: 2 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      {/* Multi-layer animated dark gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/50 to-black animate-gradientShift" />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/30 via-transparent to-blue-900/30 animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/20 via-transparent to-cyan-900/20 animate-pulse" style={{ animationDelay: '4s', animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-purple-900/20" />
      </div>
      
      {/* Animated grid pattern overlay */}
      <div className="fixed inset-0 z-10 opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gradient)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Floating glowing particles */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, 100, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Floating tech icons */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        {techIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className={`absolute ${item.color} opacity-40`}
              style={{
                top: `${Math.random() * 70 + 15}%`,
                left: `${Math.random() * 70 + 15}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
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
      
      {/* Main content container */}
      <motion.div 
        className="relative z-20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          ref={cardRef}
          className="bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-violet-500/30 animate-float"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          variants={itemVariants}
        >
          {/* Animated background pattern inside card */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500" />
          </div>

          {/* Logo with enhanced animation */}
          <motion.div 
            className="flex justify-center mb-6 relative z-10"
            variants={itemVariants}
          >
            <motion.div 
              className="p-4 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 rounded-full shadow-lg"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 30px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(6, 182, 212, 0.5)"
                ]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear",
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <FiCpu className="h-10 w-10 text-white" />
            </motion.div>
          </motion.div>
          
          {/* Enhanced title with gradient animation */}
          <motion.div 
            className="text-center mb-8 relative z-10"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 mb-2"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              {isLogin ? 'NEXUS AI' : 'EVOLVE'}
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-sm"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {isLogin 
                ? 'Neural Finance Intelligence' 
                : 'Initialize Your Quantum Journey'}
            </motion.p>
          </motion.div>

          {/* Mode toggle with enhanced animation */}
          <motion.div 
            className="flex p-1 bg-gray-800/50 rounded-2xl mb-6 relative z-10 backdrop-blur-md border border-gray-700/50"
            variants={itemVariants}
          >
            <motion.div
              className="absolute top-1 bottom-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl"
              animate={{ 
                x: isLogin ? 0 : '50%',
                width: '50%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <motion.button
              className="flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative z-10"
              animate={{ color: isLogin ? '#ffffff' : '#9ca3af' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(true)}
            >
              ACCESS
            </motion.button>
            <motion.button
              className="flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all relative z-10"
              animate={{ color: !isLogin ? '#ffffff' : '#9ca3af' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(false)}
            >
              CREATE
            </motion.button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'signup'}
              className="space-y-5 relative z-10" 
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {error && (
                <motion.div 
                  className="bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-300 px-4 py-3 rounded-xl"
                  variants={itemVariants}
                  animate={{ 
                    x: [0, -10, 10, 0],
                    backgroundColor: ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.2)']
                  }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-4">
                {!isLogin && (
                  <motion.div variants={itemVariants} className="relative group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />
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
                      className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'name' || name ? 'border-violet-400 bg-violet-400/10' : 'border-gray-700 bg-gray-800/50'} placeholder-transparent text-gray-100 backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-transparent transition-all z-10`}
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-4 transition-all ${focusedInput === 'name' || name ? 'text-xs top-2 text-violet-400' : 'text-sm top-4 text-gray-500'} pointer-events-none z-10`}
                    >
                      IDENTITY
                    </label>
                    <motion.div 
                      className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10"
                      animate={{ 
                        rotate: focusedInput === 'name' ? 360 : 0,
                        scale: focusedInput === 'name' ? 1.2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiUser className={`h-5 w-5 transition-colors ${focusedInput === 'name' || name ? 'text-violet-400' : 'text-gray-600'}`} />
                    </motion.div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants} className="relative group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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
                    className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'email' || email ? 'border-blue-400 bg-blue-400/10' : 'border-gray-700 bg-gray-800/50'} placeholder-transparent text-gray-100 backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all z-10`}
                    placeholder="Email address"
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 transition-all ${focusedInput === 'email' || email ? 'text-xs top-2 text-blue-400' : 'text-sm top-4 text-gray-500'} pointer-events-none z-10`}
                  >
                    NEXUS ID
                  </label>
                  <motion.div 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10"
                    animate={{ 
                      rotate: focusedInput === 'email' ? 360 : 0,
                      scale: focusedInput === 'email' ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiMail className={`h-5 w-5 transition-colors ${focusedInput === 'email' || email ? 'text-blue-400' : 'text-gray-600'}`} />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="relative group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-emerald-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
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
                    className={`peer appearance-none relative block w-full px-4 py-4 pt-6 border ${focusedInput === 'password' || password ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-700 bg-gray-800/50'} placeholder-transparent text-gray-100 backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all z-10`}
                    placeholder="Password"
                  />
                  <label 
                    htmlFor="password" 
                    className={`absolute left-4 transition-all ${focusedInput === 'password' || password ? 'text-xs top-2 text-cyan-400' : 'text-sm top-4 text-gray-500'} pointer-events-none z-10`}
                  >
                      QUANTUM KEY
                    </label>
                    <motion.div 
                      className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10"
                      animate={{ 
                        rotate: focusedInput === 'password' ? 360 : 0,
                        scale: focusedInput === 'password' ? 1.2 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiLock className={`h-5 w-5 transition-colors ${focusedInput === 'password' || password ? 'text-cyan-400' : 'text-gray-600'}`} />
                    </motion.div>
                  </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-bold rounded-2xl text-gray-900 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 hover:from-violet-600 hover:via-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500/50 transition-all shadow-lg"
                  variants={buttonVariants}
                  animate={isLoading ? "loading" : "visible"}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FiCpu className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <>
                      <span className="mr-2">{isLogin ? 'INITIALIZE' : 'MANIFEST'}</span>
                      <FiTrendingUp className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </motion.button>
              </motion.div>

              <motion.div 
                className="text-center pt-4 relative z-10"
                variants={itemVariants}
              >
                {isLogin && (
                  <motion.button
                    type="button"
                    className="block w-full text-sm text-gray-500 hover:text-gray-300 transition-colors mb-2"
                    whileHover={{ 
                      scale: 1.05, 
                      x: 10,
                      color: '#d1d5db'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← RECOVER ACCESS
                  </motion.button>
                )}
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-gray-400 hover:text-gray-200 transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    color: '#e5e7eb'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin
                    ? "NEW TO NEXUS? → CREATE IDENTITY"
                    : 'EXISTING USER? → ACCESS PORTAL'}
                </motion.button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center text-gray-600 text-xs"
          variants={itemVariants}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p>QUANTUM ENCRYPTION • NEURAL SECURITY • TERMS • PRIVACY</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;