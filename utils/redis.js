// utils/redis.js

import redis from 'redis';

const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

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
    return this.client.connected;
  }

  async get(key) {
    try {
      return await this.getAsync(key);
    } catch (error) {
      console.error('Error getting value from Redis:', error);
      throw error;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.setex(key, duration, value);
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

const redisClient = new RedisClient();

module.exports = redisClient;
