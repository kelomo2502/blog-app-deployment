// src/config/redis.js
const redis = require('redis');
const { redisHost, redisPort } = require('./config');

const redisClient = redis.createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
  console.log('Redis connected');
})();

module.exports = redisClient;
