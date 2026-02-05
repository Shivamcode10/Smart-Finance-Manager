
const express = require('express');
const router = express.Router();
const {
  getIncomeStreams,
  getIncomeStream,
  createIncomeStream,
  updateIncomeStream,
  deleteIncomeStream,
  getMonthlyIncomeEstimate,
} = require('../controllers/incomeStreamController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); 

router.route('/').get(getIncomeStreams).post(createIncomeStream);
router.route('/estimate').get(getMonthlyIncomeEstimate);
router
  .route('/:id')
  .get(getIncomeStream)
  .put(updateIncomeStream)
  .delete(deleteIncomeStream);

module.exports = router;