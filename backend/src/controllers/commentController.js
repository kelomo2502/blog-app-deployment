// src/controllers/commentController.js
const Comment = require('../models/Comment');

exports.createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = new Comment({
      content,
      post: req.params.postId,
      author: req.user._id,
    });
    await comment.save();
    res.status(201).json({ message: 'Comment added', comment });
  } catch (err) {
    next(err);
  }
};
