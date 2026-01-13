import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FinanceContext } from '../context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';

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
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background with blur and gradient overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://picsum.photos/seed/finance-login/1920/1080.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-pink-900/30 backdrop-blur-sm" />
      
      {/* Main content */}
      <motion.div 
        className="relative z-20 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-3xl font-bold text-white"
              variants={itemVariants}
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </motion.h2>
            <motion.p 
              className="mt-2 text-white/70"
              variants={itemVariants}
            >
              {isLogin 
                ? 'Sign in to access your financial dashboard' 
                : 'Join us to take control of your finances'}
            </motion.p>
          </div>

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
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-white/50" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={onChange}
                        className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 placeholder-white/50 text-white bg-white/10 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm transition-all"
                        placeholder="Your name"
                      />
                    </div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={onChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 placeholder-white/50 text-white bg-white/10 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-white/50" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={onChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-white/20 placeholder-white/50 text-white bg-white/10 backdrop-blur-md rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all"
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
                  className="font-medium text-white/80 hover:text-white transition-colors"
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