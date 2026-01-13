// backend/routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalProgress,
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes in this file will use the protect middleware

router.route('/').get(getGoals).post(createGoal);
router
  .route('/:id')
  .get(getGoal)
  .put(updateGoal)
  .delete(deleteGoal);
router.put('/:id/progress', updateGoalProgress);

module.exports = router;