// src/routes/posts.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// Public endpoint to view posts
router.get('/', getPosts);
router.get('/:id', getPostById);

// Authenticated endpoints for post creation/updation/deletion
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
