// backend/models/Goal.js
const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a goal title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a goal description'],
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please add a target amount'],
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline'],
  },
  category: {
    type: String,
    enum: [
      'Emergency Fund',
      'Vacation',
      'Home Purchase',
      'Car Purchase',
      'Education',
      'Retirement',
      'Other',
    ],
    required: [true, 'Please select a category'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Goal', GoalSchema);