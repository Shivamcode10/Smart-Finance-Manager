// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const profileController = require('../controllers/profileController');

// GET /api/profile - Get current user profile
router.get('/', auth, profileController.getProfile);

// PUT /api/profile - Update user profile
router.put('/', auth, profileController.updateProfile);

// PUT /api/profile/password - Change password
router.put('/password', auth, profileController.changePassword);

// DELETE /api/profile - Delete user account
router.delete('/', auth, profileController.deleteAccount);

module.exports = router;