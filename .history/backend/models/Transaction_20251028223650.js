// backend/models/Transaction.js
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Please specify transaction type'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      // Expense categories
      'Food',
      'Bills',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Healthcare',
      'Education',
      'Travel',
      'Other',
      // Income categories
      'Salary',
      'Freelance',
      'Investment',
      'Business',
      'Rental',
      'Other Income',
    ],
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  emotion: {
    type: String,
    enum: ['happy', 'neutral', 'sad', 'angry', 'surprised'],
    default: 'neutral',
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);