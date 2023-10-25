// utils/redis.js

const Redis = require('ioredis');

class RedisClient {
  constructor(options) {
    this.client = new Redis(options);

    // Handle errors and log them
    this.client.on('error', (error) => {
      console.error('Redis client error:', error);
    });

    this.client.on('ready', () => {
      console.log('Redis client is ready.');
    });

    this.client.on('connect', () => {
      console.log('Redis client is connected.');
    });
  }

  isAlive() {
    return this.client.status === 'ready';
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error('Error getting value from Redis:', error);
      throw error;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
    } catch (error) {
      console.error('Error setting value in Redis:', error);
      throw error;
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting value from Redis:', error);
      throw error;
    }
  }
}

const redisClient = new RedisClient({
  host: 'localhost', // Redis server hostname
  port: 6379, // Redis server port
  // password: 'your_password', // If required
  db: 0, // Database index (default is 0)
});

module.exports = redisClient;
