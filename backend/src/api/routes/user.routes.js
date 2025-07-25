const express = require('express');
const { getUsers, updateUserRole, getUserTransactions } = require('../../controllers/user.controller');
const { protect } = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/rbac.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only user management
 */

router.use(protect);
router.use(authorize('admin'));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users
 */
router.route('/').get(getUsers);

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Update a user's role (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRole'
 *     responses:
 *       200:
 *         description: User role updated successfully
 */
router.route('/:id/role').put(updateUserRole);

/**
 * @swagger
 * /users/{id}/transactions:
 *   get:
 *     summary: Get all transactions for a specific user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of the user's transactions
 */
router.route('/:id/transactions').get(getUserTransactions);

module.exports = router;
