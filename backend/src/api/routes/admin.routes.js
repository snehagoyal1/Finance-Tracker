const express = require('express');
const { getCacheStatistics, resetCacheStatistics } = require('../../controllers/admin.controller');
const { protect } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/rbac.middleware');

const router = express.Router();

// Protect all routes in this file and restrict to admins
router.use(protect, authorize('admin'));

router.route('/cache-stats')
    .get(getCacheStatistics)
    .delete(resetCacheStatistics);

module.exports = router;