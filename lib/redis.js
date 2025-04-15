import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const saveUserSession = async (userId, sessionData, expiryInSeconds = 86400) => {
  try {
    const sessionKey = `user:session:${userId}`;
    await redis.set(sessionKey, JSON.stringify(sessionData), { ex: expiryInSeconds });
    return true;
  } catch (error) {
    console.error('Failed to save user session to Redis:', error);
    return false;
  }
};

export const getUserSession = async (userId) => {
  try {
    const sessionKey = `user:session:${userId}`;
    const sessionData = await redis.get(sessionKey);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Failed to get user session from Redis:', error);
    return null;
  }
};

export const deleteUserSession = async (userId) => {
  try {
    const sessionKey = `user:session:${userId}`;
    await redis.del(sessionKey);
    return true;
  } catch (error) {
    console.error('Failed to delete user session from Redis:', error);
    return false;
  }
};

export const cacheUserData = async (userId, userData, expiryInSeconds = 3600) => {
  try {
    const userKey = `user:data:${userId}`;
    await redis.set(userKey, JSON.stringify(userData), { ex: expiryInSeconds });
    return true;
  } catch (error) {
    console.error('Failed to cache user data in Redis:', error);
    return false;
  }
};

export const getCachedUserData = async (userId) => {
  try {
    const userKey = `user:data:${userId}`;
    const userData = await redis.get(userKey);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to get cached user data from Redis:', error);
    return null;
  }
};