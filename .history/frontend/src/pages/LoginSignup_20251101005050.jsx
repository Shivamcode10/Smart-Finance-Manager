import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FinanceContext } from "../context/FinanceContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login, register, isAuthenticated, error } = useContext(FinanceContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login({ email, password });
    } else {
      register({ name, email, password });
    }
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.12 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 20px #60a5fa" },
    tap: { scale: 0.95 },
    pulse: {
      boxShadow: ["0 0 5px #38bdf8", "0 0 20px #60a5fa", "0 0 5px #38bdf8"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const cardFloat = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12 overflow-hidden bg-gradient-to-br from-blue-900 via-teal-900 to-purple-900 dark:bg-gray-900">
      {/* Animated gradient background overlay */}
      <motion.div
        className="fixed inset-0 -z-10 bg-gradient-to-tr from-blue-700 via-teal-600 to-purple-800 opacity-60"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Blur + gradient tint overlay */}
      <div className="fixed inset-0 -z-5 bg-gradient-to-br from-blue-900/70 via-teal-900/60 to-purple-900/50 backdrop-blur-lg" />

      {/* Centered glassmorphism card */}
      <motion.div
        className="relative z-20 w-full max-w-md bg-white/10 dark:bg-gray-900/60 border border-white/30 rounded-3xl shadow-xl backdrop-blur-[30px] p-10 flex flex-col"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        {...cardFloat}
      >
        {/* Tabs */}
        <div className="flex mb-8 bg-white/20 rounded-full p-1 text-sm font-semibold text-white/80">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-full transition-colors duration-300 ${
              isLogin
                ? "bg-gradient-to-r from-blue-400 to-teal-400 text-white shadow-glowPulse"
                : "hover:bg-white/10"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-full transition-colors duration-300 ${
              !isLogin
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glowPulse"
                : "hover:bg-white/10"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mb-6">
          <motion.h2
            key={isLogin ? "login-title" : "signup-title"}
            className="text-3xl font-extrabold text-white tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </motion.h2>
          <motion.p
            key={isLogin ? "login-subtitle" : "signup-subtitle"}
            className="mt-2 text-white/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {isLogin
              ? "Sign in to manage your finances effortlessly"
              : "Join us and take control of your financial future"}
          </motion.p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.form
            key={isLogin ? "login-form" : "signup-form"}
            onSubmit={onSubmit}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.12 } },
            }}
          >
            {error && (
              <motion.div
                className="rounded-lg bg-red-600/30 border border-red-500/50 px-4 py-3 text-red-100 text-sm backdrop-blur-md"
                variants={inputVariants}
                role="alert"
              >
                {error}
              </motion.div>
            )}

            {!isLogin && (
              <motion.div variants={inputVariants} className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={onChange}
                  placeholder="Your Name"
                  autoComplete="name"
                  className="peer w-full rounded-lg bg-white/10 backdrop-blur-md border border-white/30 py-3 pl-12 pr-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
                <label
                  htmlFor="name"
                  className="absolute left-12 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-0 peer-focus:text-xs peer-focus:text-teal-300"
                >
                  Name
                </label>
                <FiUser className="absolute left-4 top-3.5 text-white/50 pointer-events-none" />
              </motion.div>
            )}

            <motion.div variants={inputVariants} className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={onChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="peer w-full rounded-lg bg-white/10 backdrop-blur-md border border-white/30 py-3 pl-12 pr-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              />
              <label
                htmlFor="email"
                className="absolute left-12 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-300"
              >
                Email Address
              </label>
              <FiMail className="absolute left-4 top-3.5 text-white/50 pointer-events-none" />
            </motion.div>

            <motion.div variants={inputVariants} className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={onChange}
                placeholder="••••••••"
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="peer w-full rounded-lg bg-white/10 backdrop-blur-md border border-white/30 py-3 pl-12 pr-3 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
              <label
                htmlFor="password"
                className="absolute left-12 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-0 peer-focus:text-xs peer-focus:text-purple-300"
              >
                Password
              </label>
              <FiLock className="absolute left-4 top-3.5 text-white/50 pointer-events-none" />
            </motion.div>

            {isLogin && (
              <motion.div
                variants={inputVariants}
                className="text-right text-xs text-white/60 hover:text-white cursor-pointer transition-colors select-none"
              >
                <button type="button" className="underline">
                  Forgot Password?
                </button>
              </motion.div>
            )}

            <motion.div variants={inputVariants}>
              <motion.button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-teal-400 to-purple-600 text-white font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-white/40 relative overflow-hidden"
                variants={buttonVariants}
                initial="pulse"
                animate="pulse"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="flex justify-center items-center gap-2">
                  {isLogin ? "Sign In" : "Sign Up"}
                  <FiArrowRight className="inline-block" />
                </span>
                {/* Ripple effect */}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 bg-white/20 animate-pulse"></span>
              </motion.button>
            </motion.div>

            <motion.div
              variants={inputVariants}
              className="text-center text-sm text-white/70 select-none"
            >
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="underline hover:text-white transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </motion.div>
          </motion.form>
        </AnimatePresence>

        <motion.p
          className="mt-8 text-center text-xs text-white/50 select-none"
          variants={inputVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.5 } }}
        >
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-white">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </a>
          .
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginSignup;