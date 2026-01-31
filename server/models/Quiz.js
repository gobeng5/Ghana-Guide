const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer'],
    required: [true, 'Question type is required']
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required']
  },
  explanation: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  points: {
    type: Number,
    default: 1
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  gradeLevel: {
    type: String,
    required: [true, 'Grade level is required'],
    enum: ['Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 
           'Basic 7', 'Basic 8', 'Basic 9', 'SHS 1', 'SHS 2', 'SHS 3']
  },
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true
  },
  questions: [questionSchema],
  duration: {
    type: Number, // in minutes
    default: 30
  },
  passingScore: {
    type: Number,
    default: 50 // percentage
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
quizSchema.index({ gradeLevel: 1, subject: 1, topic: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
