
const express = require('express');
const router = express.Router();
const {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetAlerts,
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); 

router.route('/').get(getBudgets).post(createBudget);
router.route('/alerts').get(getBudgetAlerts);
router
  .route('/:id')
  .get(getBudget)
  .put(updateBudget)
  .delete(deleteBudget);

module.exports = router;