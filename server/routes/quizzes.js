const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/quizzes
// @desc    Get all quizzes (with filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { gradeLevel, subject, topic } = req.query;
    
    let query = {};
    
    if (gradeLevel) query.gradeLevel = gradeLevel;
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;

    const quizzes = await Quiz.find(query)
      .select('-questions.correctAnswer -questions.explanation') // Hide answers for listing
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name');

    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// @route   GET /api/quizzes/:id
// @desc    Get single quiz (without answers for students)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'name');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Remove correct answers and explanations for students
    const quizData = quiz.toObject();
    quizData.questions = quizData.questions.map(q => ({
      _id: q._id,
      question: q.question,
      type: q.type,
      options: q.options,
      difficulty: q.difficulty,
      points: q.points
    }));

    res.json(quizData);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});

// @route   POST /api/quizzes/:id/submit
// @desc    Submit quiz answers and get results
// @access  Private
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers } = req.body; // Array of { questionId, answer }
    
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    
    const results = quiz.questions.map(question => {
      const userAnswer = answers.find(a => a.questionId === question._id.toString());
      const isCorrect = userAnswer && 
        userAnswer.answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
      
      totalPoints += question.points;
      if (isCorrect) {
        correctCount++;
        earnedPoints += question.points;
      }

      return {
        questionId: question._id,
        question: question.question,
        userAnswer: userAnswer ? userAnswer.answer : '',
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        points: question.points,
        earned: isCorrect ? question.points : 0
      };
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);

    res.json({
      quizId: quiz._id,
      score,
      correctCount,
      totalQuestions: quiz.questions.length,
      earnedPoints,
      totalPoints,
      passed: score >= quiz.passingScore,
      results
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Error submitting quiz' });
  }
});

// @route   POST /api/quizzes
// @desc    Create a new quiz
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const quiz = await Quiz.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

// @route   PUT /api/quizzes/:id
// @desc    Update a quiz
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Error updating quiz' });
  }
});

// @route   DELETE /api/quizzes/:id
// @desc    Delete a quiz
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
});

module.exports = router;
