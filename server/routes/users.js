const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, gradeLevel, subjects, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (gradeLevel) user.gradeLevel = gradeLevel;
    if (subjects) user.subjects = subjects;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gradeLevel: user.gradeLevel,
      role: user.role,
      subjects: user.subjects,
      avatar: user.avatar
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
