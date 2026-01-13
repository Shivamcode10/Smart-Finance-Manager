// backend/controllers/incomeStreamController.js
const IncomeStream = require('../models/IncomeStream');

// @desc    Get all income streams
// @route   GET /api/income-streams
// @access  Private
exports.getIncomeStreams = async (req, res) => {
  try {
    const incomeStreams = await IncomeStream.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: incomeStreams.length,
      data: incomeStreams,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single income stream
// @route   GET /api/income-streams/:id
// @access  Private
exports.getIncomeStream = async (req, res) => {
  try {
    const incomeStream = await IncomeStream.findById(req.params.id);

    // Make sure user owns income stream
    if (incomeStream.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this income stream',
      });
    }

    res.status(200).json({
      success: true,
      data: incomeStream,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create new income stream
// @route   POST /api/income-streams
// @access  Private
exports.createIncomeStream = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const incomeStream = await IncomeStream.create(req.body);

    res.status(201).json({
      success: true,
      data: incomeStream,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update income stream
// @route   PUT /api/income-streams/:id
// @access  Private
exports.updateIncomeStream = async (req, res) => {
  try {
    let incomeStream = await IncomeStream.findById(req.params.id);

    // Make sure user owns income stream
    if (incomeStream.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this income stream',
      });
    }

    incomeStream = await IncomeStream.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: incomeStream,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete income stream
// @route   DELETE /api/income-streams/:id
// @access  Private
exports.deleteIncomeStream = async (req, res) => {
  try {
    const incomeStream = await IncomeStream.findById(req.params.id);

    // Make sure user owns income stream
    if (incomeStream.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this income stream',
      });
    }

    // Use deleteOne instead of remove
    await IncomeStream.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get monthly income estimate
// @route   GET /api/income-streams/estimate
// @access  Private
exports.getMonthlyIncomeEstimate = async (req, res) => {
  try {
    const incomeStreams = await IncomeStream.find({ 
      user: req.user.id,
      isActive: true 
    });

    let monthlyIncome = 0;
    const breakdown = {};

    incomeStreams.forEach(stream => {
      let monthlyAmount = 0;
      
      switch (stream.frequency) {
        case 'one-time':
          // For one-time, we don't include in monthly estimate
          break;
        case 'weekly':
          monthlyAmount = stream.amount * 4.33; // Average weeks in a month
          break;
        case 'bi-weekly':
          monthlyAmount = stream.amount * 2.17; // Average bi-weekly periods in a month
          break;
        case 'monthly':
          monthlyAmount = stream.amount;
          break;
        case 'quarterly':
          monthlyAmount = stream.amount / 3;
          break;
        case 'yearly':
          monthlyAmount = stream.amount / 12;
          break;
      }
      
      monthlyIncome += monthlyAmount;
      
      if (!breakdown[stream.category]) {
        breakdown[stream.category] = 0;
      }
      breakdown[stream.category] += monthlyAmount;
    });

    res.status(200).json({
      success: true,
      data: {
        monthlyIncome,
        breakdown,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};