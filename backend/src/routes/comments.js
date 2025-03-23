// src/routes/comments.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middlewares/authMiddleware');
const { createComment } = require('../controllers/commentController');

// Only authenticated users can add comments
router.post('/', authMiddleware, createComment);

module.exports = router;
