// server/middleware/validate.js
const { body, validationResult } = require('express-validator');

exports.validatePost = [
  body('title').isString().trim().isLength({ min: 3, max: 100 }).withMessage('Title length 3-100'),
  body('content').isString().trim().isLength({ min: 20 }).withMessage('Content too short'),
  body('excerpt').optional().isString().isLength({ max: 200 }),
  // category required as string or id
  body('category').notEmpty().withMessage('Category is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error('Validation failed');
      err.statusCode = 422;
      err.details = errors.array();
      return next(err);
    }
    next();
  }
];
