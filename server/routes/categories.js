const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');

// GET /api/categories - Get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
});

// POST /api/categories - Create a new category
router.post('/', protect, async (req, res, next) => {
  try {
    console.log('Creating category with:', req.body);
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Category name is required' });

    const existing = await Category.findOne({ name: name.toLowerCase().trim() });
    if (existing) return res.status(400).json({ success: false, error: 'Category already exists' });

    const category = await Category.create({ name });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    console.error('Category creation error:', err);
    next(err);
  }
});

// Optional: DELETE /api/categories/:id - Delete a category
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, error: 'Category not found' });
    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
});

// Optional: PUT /api/categories/:id - Update a category
router.put('/:id', protect, async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, error: 'Category name is required' });

    const existing = await Category.findOne({ name: name.toLowerCase().trim() });
    if (existing && existing.id !== req.params.id)
      return res.status(400).json({ success: false, error: 'Category already exists' });

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
