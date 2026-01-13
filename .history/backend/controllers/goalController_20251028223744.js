// backend/controllers/goalController.js
const Goal = require('../models/Goal');

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
exports.getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this goal',
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new goal
// @route   POST /api/goals
// @access  Private
exports.createGoal = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const goal = await Goal.create(req.body);

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
exports.updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this goal',
      });
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this goal',
      });
    }

    await goal.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update goal progress
// @route   PUT /api/goals/:id/progress
// @access  Private
exports.updateGoalProgress = async (req, res) => {
  try {
    const { amount } = req.body;
    
    let goal = await Goal.findById(req.params.id);

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this goal',
      });
    }

    goal.currentAmount += amount;
    await goal.save();

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};