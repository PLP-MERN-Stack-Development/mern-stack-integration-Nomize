// server/controllers/postsController.js
const Post = require('../models/Post');

// GET /api/posts
exports.getAll = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author category', 'name email');
    res.json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:id
exports.getOne = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author category', 'name email');
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// POST /api/posts
exports.create = async (req, res, next) => {
  try {
    console.log('Creating post with body:', req.body);
    console.log('File uploaded:', req.file);
    
    // Validate required fields
    if (!req.body.title) {
      const err = new Error('Title is required');
      err.statusCode = 400;
      return next(err);
    }
    if (!req.body.content) {
      const err = new Error('Content is required');
      err.statusCode = 400;
      return next(err);
    }
    if (!req.body.category) {
      const err = new Error('Category is required');
      err.statusCode = 400;
      return next(err);
    }
    if (!req.body.author) {
      const err = new Error('Author is required');
      err.statusCode = 400;
      return next(err);
    }
    
    // Add featured image filename if uploaded
    const postData = {
      ...req.body,
      featuredImage: req.file ? req.file.filename : 'default-post.jpg'
    };
    
    console.log('Post data to save:', postData);
    const newPost = await Post.create(postData);
    console.log('Post created successfully:', newPost._id);
    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    console.error('Post creation error:', err.message);
    console.error('Full error:', err);
    next(err);
  }
};

// PUT /api/posts/:id
exports.update = async (req, res, next) => {
  try {
    // If a new file is uploaded, add it to the update data
    if (req.file) {
      req.body.featuredImage = req.file.filename;
    }
    
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// POST /api/posts/:id/comments
exports.addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    const comment = { user: req.user?.id || null, content: req.body.content };
    post.comments.push(comment);
    await post.save();

    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};
