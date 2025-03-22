// src/server.js
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const { port } = require('./config/config');

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
// Nest the comments route under posts
app.use('/api/posts/:postId/comments', require('./routes/comments'));

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
