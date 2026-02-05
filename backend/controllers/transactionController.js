// backend/controllers/transactionController.js
const Transaction = require('../models/Transaction');


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


exports.addTransaction = async (req, res) => {
  try {
   
    req.body.user = req.user.id;

    const transaction = await Transaction.create(req.body);
    
    
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


exports.updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    
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


exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this transaction',
      });
    }

    
    await Transaction.deleteOne({ _id: req.params.id });
    
    
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


exports.getTransactionStats = async (req, res) => {
  try {
    const { period } = req.query;
    let startDate = new Date();
    
    
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    } else {
      
      startDate.setDate(1);
    }

    const transactions = await Transaction.find({
      user: req.user.id,
      date: { $gte: startDate },
    });

    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

   
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