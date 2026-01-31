const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

// @route   GET /api/progress
// @desc    Get user's progress
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { subject, topic } = req.query;
    
    let query = { user: req.user._id };
    
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;

    const progress = await Progress.find(query)
      .sort({ completedAt: -1 })
      .populate('quizId', 'title');

    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

// @route   POST /api/progress
// @desc    Save quiz progress
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const progress = await Progress.create({
      user: req.user._id,
      ...req.body
    });

    res.status(201).json(progress);
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ message: 'Error saving progress' });
  }
});

// @route   GET /api/progress/stats
// @desc    Get user's overall statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const allProgress = await Progress.find({ user: req.user._id });

    const stats = {
      totalQuizzes: allProgress.length,
      averageScore: 0,
      totalTimeSpent: 0,
      subjectStats: {},
      recentActivity: []
    };

    if (allProgress.length > 0) {
      // Calculate average score
      const totalScore = allProgress.reduce((sum, p) => sum + p.score, 0);
      stats.averageScore = Math.round(totalScore / allProgress.length);

      // Calculate total time spent
      stats.totalTimeSpent = allProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);

      // Group by subject
      allProgress.forEach(p => {
        if (!stats.subjectStats[p.subject]) {
          stats.subjectStats[p.subject] = {
            quizzesTaken: 0,
            averageScore: 0,
            totalScore: 0
          };
        }
        stats.subjectStats[p.subject].quizzesTaken++;
        stats.subjectStats[p.subject].totalScore += p.score;
      });

      // Calculate average for each subject
      Object.keys(stats.subjectStats).forEach(subject => {
        const subjectData = stats.subjectStats[subject];
        subjectData.averageScore = Math.round(
          subjectData.totalScore / subjectData.quizzesTaken
        );
        delete subjectData.totalScore;
      });

      // Get recent activity (last 5)
      stats.recentActivity = allProgress
        .sort((a, b) => b.completedAt - a.completedAt)
        .slice(0, 5)
        .map(p => ({
          subject: p.subject,
          topic: p.topic,
          score: p.score,
          completedAt: p.completedAt
        }));
    }

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// @route   GET /api/progress/subject/:subject
// @desc    Get progress for a specific subject
// @access  Private
router.get('/subject/:subject', protect, async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user._id,
      subject: req.params.subject
    }).sort({ completedAt: -1 });

    const stats = {
      totalQuizzes: progress.length,
      averageScore: 0,
      topicProgress: {}
    };

    if (progress.length > 0) {
      const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
      stats.averageScore = Math.round(totalScore / progress.length);

      // Group by topic
      progress.forEach(p => {
        if (!stats.topicProgress[p.topic]) {
          stats.topicProgress[p.topic] = {
            attempts: 0,
            bestScore: 0,
            lastAttempt: null
          };
        }
        stats.topicProgress[p.topic].attempts++;
        stats.topicProgress[p.topic].bestScore = Math.max(
          stats.topicProgress[p.topic].bestScore,
          p.score
        );
        if (!stats.topicProgress[p.topic].lastAttempt || 
            p.completedAt > stats.topicProgress[p.topic].lastAttempt) {
          stats.topicProgress[p.topic].lastAttempt = p.completedAt;
        }
      });
    }

    res.json(stats);
  } catch (error) {
    console.error('Error fetching subject progress:', error);
    res.status(500).json({ message: 'Error fetching subject progress' });
  }
});

module.exports = router;
