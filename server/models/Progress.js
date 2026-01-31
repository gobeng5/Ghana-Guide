const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    userAnswer: String,
    isCorrect: Boolean
  }],
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
progressSchema.index({ user: 1, subject: 1 });
progressSchema.index({ user: 1, quizId: 1 });

// Virtual for pass/fail status
progressSchema.virtual('isPassed').get(function() {
  return this.score >= 50; // 50% is passing
});

module.exports = mongoose.model('Progress', progressSchema);
