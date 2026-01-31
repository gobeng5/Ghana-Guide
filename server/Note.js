const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
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
  videoUrl: {
    type: String,
    default: '',
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  orderIndex: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
noteSchema.index({ gradeLevel: 1, subject: 1, topic: 1 });
noteSchema.index({ tags: 1 });

module.exports = mongoose.model('Note', noteSchema);
