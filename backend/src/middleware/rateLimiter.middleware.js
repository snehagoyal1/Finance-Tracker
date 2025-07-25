const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

const apiLimiter = (maxRequests, windowHours) => {
    return rateLimit({
        windowMs: windowHours * 60 * 60 * 1000,
        max: maxRequests,
        message: `Too many requests, please try again after ${windowHours} hour(s)`,
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: (req, res) => req.user.id,
    });
};

const transactionLimiter = apiLimiter(100, 1);
const analyticsLimiter = apiLimiter(50, 1);

module.exports = { authLimiter, transactionLimiter, analyticsLimiter };