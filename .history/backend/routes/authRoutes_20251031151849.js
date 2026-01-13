// backend/routes/authRoutes.js
const express = require('express');
const {
  register,
  login,
  getMe,
  updateDetails,
  updateProfile,
  changePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

// Get Current User Data (Profile)
router.get('/me', protect, getMe);

// Update User Profile Details
router.put('/profile', protect, updateProfile);

// Change User Password
router.put('/change-password', protect, changePassword);

module.exports = router;