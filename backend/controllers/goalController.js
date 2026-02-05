
const Goal = require('../models/Goal');


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


exports.getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    
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


exports.createGoal = async (req, res) => {
  try {
    
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


exports.updateGoal = async (req, res) => {
  try {
    let goal = await Goal.findById(req.params.id);

   
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


exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this goal',
      });
    }

    
    await Goal.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


exports.updateGoalProgress = async (req, res) => {
  try {
    const { amount } = req.body;
    
    let goal = await Goal.findById(req.params.id);

    
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