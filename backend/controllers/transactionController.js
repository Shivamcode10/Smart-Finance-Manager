// backend/controllers/transactionController.js
const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this transaction',
      });
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Private
exports.addTransaction = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const transaction = await Transaction.create(req.body);
    
    // Get Socket.IO instance from app and emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(req.user.id).emit('newTransaction', transaction);
    }

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
exports.updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this transaction',
      });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    // Get Socket.IO instance from app and emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(req.user.id).emit('updatedTransaction', transaction);
    }

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this transaction',
      });
    }

    // Use deleteOne instead of remove
    await Transaction.deleteOne({ _id: req.params.id });
    
    // Get Socket.IO instance from app and emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(req.user.id).emit('deletedTransaction', req.params.id);
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get transaction statistics
// @route   GET /api/transactions/stats
// @access  Private
exports.getTransactionStats = async (req, res) => {
  try {
    const { period } = req.query;
    let startDate = new Date();
    
    // Set start date based on period
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      // Default to current month
      startDate.setDate(1);
    }

    const transactions = await Transaction.find({
      user: req.user.id,
      date: { $gte: startDate },
    });

    // Calculate totals
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    // Group by category
    const categoryData = {};
    transactions.forEach(t => {
      if (!categoryData[t.category]) {
        categoryData[t.category] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        categoryData[t.category].income += t.amount;
      } else {
        categoryData[t.category].expense += t.amount;
      }
    });

    // Group by date
    const dailyData = {};
    transactions.forEach(t => {
      const date = t.date.toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        dailyData[date].income += t.amount;
      } else {
        dailyData[date].expense += t.amount;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        income,
        expenses,
        balance: income - expenses,
        categoryData,
        dailyData,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};