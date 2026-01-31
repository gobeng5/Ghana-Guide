const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/notes
// @desc    Get all notes (with filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { gradeLevel, subject, topic, difficulty, search } = req.query;
    
    let query = {};
    
    if (gradeLevel) query.gradeLevel = gradeLevel;
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;
    
    // Search in title, content, and tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const notes = await Note.find(query)
      .sort({ orderIndex: 1, createdAt: -1 })
      .populate('createdBy', 'name');

    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('createdBy', 'name');
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Error fetching note' });
  }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Error creating note' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Error updating note' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note' });
  }
});

// @route   GET /api/notes/subjects/:gradeLevel
// @desc    Get all subjects for a grade level
// @access  Public
router.get('/subjects/:gradeLevel', async (req, res) => {
  try {
    const subjects = await Note.distinct('subject', { 
      gradeLevel: req.params.gradeLevel 
    });
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Error fetching subjects' });
  }
});

// @route   GET /api/notes/topics/:gradeLevel/:subject
// @desc    Get all topics for a subject in a grade level
// @access  Public
router.get('/topics/:gradeLevel/:subject', async (req, res) => {
  try {
    const topics = await Note.distinct('topic', { 
      gradeLevel: req.params.gradeLevel,
      subject: req.params.subject
    });
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Error fetching topics' });
  }
});

module.exports = router;
