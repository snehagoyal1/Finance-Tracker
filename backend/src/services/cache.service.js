const redisClient = require('../config/redis.config');

const getOrSetCache = async (key, cb) => {
    try {
        const data = await redisClient.get(key);
        if (data != null) {
            console.log('Cache HIT');
            await redisClient.incr('cache:hits'); // Increment hits counter
            return JSON.parse(data);
        }

        console.log('Cache MISS');
        await redisClient.incr('cache:misses'); // Increment misses counter
        const freshData = await cb();
        await redisClient.set(key, JSON.stringify(freshData));
        return freshData;
    } catch (error) {
        console.error("Cache service error:", error);
        return cb(); // Fallback to callback on error
    }
};

const setWithExpiry = async (key, data, expiryInSeconds) => {
    try {
        await redisClient.setEx(key, expiryInSeconds, JSON.stringify(data));
    } catch (error) {
        console.error("Cache set error:", error);
    }
};

const invalidateCache = async (key) => {
    try {
        await redisClient.del(key);
        console.log(`Cache invalidated for key: ${key}`);
    } catch (error) {
        console.error("Cache invalidation error:", error);
    }
};

// --- NEW FUNCTIONS ---
const getCacheStats = async () => {
    const hits = parseInt(await redisClient.get('cache:hits') || '0', 10);
    const misses = parseInt(await redisClient.get('cache:misses') || '0', 10);
    return { hits, misses };
};

const resetCacheStats = async () => {
    // Atomically set both counters to 0
    await redisClient.mSet(['cache:hits', '0', 'cache:misses', '0']);
    return { message: 'Cache stats reset successfully.' };
};

module.exports = {
    getOrSetCache,
    setWithExpiry,
    invalidateCache,
    getCacheStats,
    resetCacheStats,
};