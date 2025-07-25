// src/controllers/analytics.controller.js
const analyticsService = require('../services/analytics.service');
const { setWithExpiry } = require('../services/cache.service');

exports.getAnalytics = async (req, res, next) => {
    const period = req.query.period || '30days'; // Get period from query, default to 30days
    try {
        const analyticsData = await analyticsService.getAnalyticsData(req.user.id, period);
        // Update cache key to be period-specific
        await setWithExpiry(`analytics:${req.user.id}:${period}`, analyticsData, 900);
        res.json(analyticsData);
    } catch (error) {
        next(error);
    }
};