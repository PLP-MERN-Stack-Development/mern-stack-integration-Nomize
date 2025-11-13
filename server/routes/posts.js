const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed: ' + errors.array().map(e => e.msg).join(', '));
    err.statusCode = 422;
    return next(err);
  }
  next();
};

// list + filters + pagination
router.get('/', postsController.getAll);

// get single by id or slug
router.get('/:id', postsController.getOne);

// create - with file upload middleware
router.post(
  '/',
  auth.protect,
  upload.single('featuredImage'), // Handle single file upload
  [
    body('title').notEmpty().withMessage('Title required'),
    body('content').notEmpty().withMessage('Content required'),
    body('category').notEmpty().withMessage('Category required'),
  ],
  handleValidationErrors,
  postsController.create
);

// update
router.put('/:id', auth.protect, upload.single('featuredImage'), postsController.update);

// delete
router.delete('/:id', auth.protect, postsController.remove);

// comments
router.post('/:id/comments', auth.protect, postsController.addComment);

module.exports = router;
