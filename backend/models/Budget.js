// backend/models/Budget.js
const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Food',
      'Bills',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Healthcare',
      'Education',
      'Travel',
      'Other',
    ],
  },
  amount: {
    type: Number,
    required: [true, 'Please add a budget amount'],
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly'],
    default: 'monthly',
  },
  spent: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);