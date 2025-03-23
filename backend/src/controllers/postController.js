// src/controllers/postController.js
const Post = require('../models/Post');
const redisClient = require('../config/redis');

// Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const { title, description, content } = req.body;
    const post = new Post({
      title,
      description,
      content,
      author: req.user._id,
    });
    await post.save();
    // Invalidate cache for posts listing
    await redisClient.del('posts');
    res.status(201).json({ message: 'Post created', post });
  } catch (err) {
    next(err);
  }
};

// Get all posts (with caching)
exports.getPosts = async (req, res, next) => {
  try {
    // Try to get posts from Redis cache
    const cachedPosts = await redisClient.get('posts');
    if (cachedPosts) {
      return res.json({ posts: JSON.parse(cachedPosts), source: 'cache' });
    }
    // If not in cache, query database
    const posts = await Post.find()
      .populate('author', 'username image')
      .sort({ createdAt: -1 });
    // Cache the result (set expiry of e.g., 60 seconds)
    await redisClient.setEx('posts', 60, JSON.stringify(posts));
    res.json({ posts, source: 'db' });
  } catch (err) {
    next(err);
  }
};

// Get a single post
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username image');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post });
  } catch (err) {
    next(err);
  }
};

// Update a post (only if the authenticated user is the owner)
exports.updatePost = async (req, res, next) => {
  try {
    const { title, description, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    post.title = title || post.title;
    post.description = description || post.description;
    post.content = content || post.content;
    await post.save();
    await redisClient.del('posts');
    res.json({ message: 'Post updated', post });
  } catch (err) {
    next(err);
  }
};

// Delete a post (only if the authenticated user is the owner)
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await post.remove();
    await redisClient.del('posts');
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};
