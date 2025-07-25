const redisClient = require('../config/redis.config');

const getOrSetCache = async (key, cb) => {
    try {
        const data = await redisClient.get(key);
        if (data != null) {
            console.log('Cache HIT');
            return JSON.parse(data);
        }

        console.log('Cache MISS');
        const freshData = await cb();
        await redisClient.set(key, JSON.stringify(freshData));
        return freshData;
    } catch (error) {
        console.error("Cache service error:", error);
        return cb();
    }
};

const setWithExpiry = async (key, data, expiryInSeconds) => {
    try {
        await redisClient.setEx(key, expiryInSeconds, JSON.stringify(data));
    } catch (error) {
        console.error("Cache set error:", error);
    }
}

const invalidateCache = async (key) => {
    try {
        await redisClient.del(key);
        console.log(`Cache invalidated for key: ${key}`);
    } catch (error) {
        console.error("Cache invalidation error:", error);
    }
}

module.exports = { getOrSetCache, setWithExpiry, invalidateCache };