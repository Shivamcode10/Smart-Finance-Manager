// backend/controllers/budgetController.js
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

// @desc    Get all budgets
// @route   GET /api/budgets
// @access  Private
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({ createdAt: -1 });

    // Calculate spent amount for each budget
    for (const budget of budgets) {
      const transactions = await Transaction.find({
        user: req.user.id,
        category: budget.category,
        type: 'expense',
        date: {
          $gte: budget.startDate,
          $lte: budget.endDate,
        },
      });

      budget.spent = transactions.reduce((sum, t) => sum + t.amount, 0);
      await budget.save();
    }

    res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single budget
// @route   GET /api/budgets/:id
// @access  Private
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    // Make sure user owns budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this budget',
      });
    }

    // Calculate spent amount
    const transactions = await Transaction.find({
      user: req.user.id,
      category: budget.category,
      type: 'expense',
      date: {
        $gte: budget.startDate,
        $lte: budget.endDate,
      },
    });

    budget.spent = transactions.reduce((sum, t) => sum + t.amount, 0);
    await budget.save();

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new budget
// @route   POST /api/budgets
// @access  Private
exports.createBudget = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const budget = await Budget.create(req.body);

    res.status(201).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
exports.updateBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    // Make sure user owns budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this budget',
      });
    }

    budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    // Make sure user owns budget
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this budget',
      });
    }

    // Use deleteOne instead of remove
    await Budget.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get budget alerts
// @route   GET /api/budgets/alerts
// @access  Private
exports.getBudgetAlerts = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    const alerts = [];

    for (const budget of budgets) {
      // Calculate spent amount
      const transactions = await Transaction.find({
        user: req.user.id,
        category: budget.category,
        type: 'expense',
        date: {
          $gte: budget.startDate,
          $lte: budget.endDate,
        },
      });

      const spent = transactions.reduce((sum, t) => sum + t.amount, 0);
      const percentage = (spent / budget.amount) * 100;

      // Check if budget is exceeded or close to exceeding
      if (percentage >= 100) {
        alerts.push({
          budgetId: budget._id,
          category: budget.category,
          message: `You have exceeded your ${budget.category} budget!`,
          type: 'danger',
          percentage,
        });
      } else if (percentage >= 80) {
        alerts.push({
          budgetId: budget._id,
          category: budget.category,
          message: `You have used ${percentage.toFixed(0)}% of your ${budget.category} budget`,
          type: 'warning',
          percentage,
        });
      }
    }

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};