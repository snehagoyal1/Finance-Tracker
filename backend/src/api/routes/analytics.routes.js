const express = require('express');
const { getAnalytics } = require('../../controllers/analytics.controller');
const { protect } = require('../../middleware/auth.middleware');
const { analyticsLimiter } = require('../../middleware/rateLimiter.middleware');
const cacheService = require('../../services/cache.service');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Financial analytics
 */

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get financial analytics data
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [30days, monthly, yearly]
 *         description: The time period for the analytics.
 *     responses:
 *       200:
 *         description: Analytics data fetched successfully
 */
router.get('/', protect, analyticsLimiter, (req, res, next) => {
    const period = req.query.period || '30days';
    const key = `analytics:${req.user.id}:${period}`;
    cacheService.getOrSetCache(key, () => getAnalytics(req, res, next))
        .then(data => { if (data) res.json(data); })
        .catch(next);
});

module.exports = router;
