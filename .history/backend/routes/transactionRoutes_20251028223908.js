// backend/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes in this file will use the protect middleware

router.route('/').get(getTransactions).post(addTransaction);
router.route('/stats').get(getTransactionStats);
router
  .route('/:id')
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;