const { getCacheStats, resetCacheStats } = require('../services/cache.service');

// @desc    Get cache performance statistics (admin only)
exports.getCacheStatistics = async (req, res, next) => {
    try {
        const stats = await getCacheStats();
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

// @desc    Reset cache performance statistics (admin only)
exports.resetCacheStatistics = async (req, res, next) => {
    try {
        const result = await resetCacheStats();
        res.json(result);
    } catch (error) {
        next(error);
    }
};