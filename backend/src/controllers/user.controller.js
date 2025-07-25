const User = require('../models/User.model');
const Transaction = require('../models/Transaction.model');

// @desc    Get all users (admin only)
exports.getUsers = async (req, res, next) => {
    console.log('--- Inside getUsers controller ---');
    try {
        console.log('Attempting to fetch all users from database...');
        const users = await User.findAll({
            attributes: { exclude: ['password'] }, // Never send passwords
        });
        console.log('Successfully fetched users from database.');
        res.json(users);
    } catch (error) {
        console.error('Error in getUsers controller:', error);
        next(error);
    }
};

// @desc    Update user role (admin only)
exports.updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin', 'read-only'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.json({ message: `User role updated successfully to '${role}'` });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all transactions for a specific user (admin only)
exports.getUserTransactions = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const transactions = await Transaction.findAll({
            where: { userId: userId },
            order: [['date', 'DESC']],
        });

        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
