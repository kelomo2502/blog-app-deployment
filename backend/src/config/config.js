// src/config/config.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT || 6379,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
