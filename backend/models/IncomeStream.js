
const mongoose = require('mongoose');

const IncomeStreamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add an income stream name'],
  },
  category: {
    type: String,
    enum: ['Salary', 'Freelance', 'Investment', 'Business', 'Rental', 'Other Income'],
    required: [true, 'Please select a category'],
  },
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  frequency: {
    type: String,
    enum: ['one-time', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'yearly'],
    default: 'monthly',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('IncomeStream', IncomeStreamSchema);