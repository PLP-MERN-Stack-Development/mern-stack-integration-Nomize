// server/controllers/categoriesController.js
const Category = require('../models/Category');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      const err = new Error('Category name required');
      err.statusCode = 400;
      return next(err);
    }
    const existing = await Category.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existing) {
      const err = new Error('Category already exists');
      err.statusCode = 400;
      return next(err);
    }
    const cat = new Category({ name: name.trim() });
    await cat.save();
    res.status(201).json({ success: true, data: cat });
  } catch (err) {
    next(err);
  }
};
