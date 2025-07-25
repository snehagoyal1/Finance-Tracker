// backend/src/controllers/transaction.controller.js

const Transaction = require('../models/Transaction.model');
const { invalidateCache } = require('../services/cache.service');

// Helper function to invalidate all analytics caches for a user
const invalidateAllAnalyticsCache = async (userId) => {
    const periods = ['30days', 'monthly', 'yearly'];
    console.log(`Invalidating cache for user ${userId} for all periods...`);
    for (const period of periods) {
        await invalidateCache(`analytics:${userId}:${period}`);
    }
};

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({ 
            where: { userId: req.user.id },
            order: [['date', 'DESC']] 
        });
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

exports.addTransaction = async (req, res, next) => {
    try {
        const { description, amount, type, date, categoryId } = req.body;
        const transaction = await Transaction.create({
            description, amount, type, date, categoryId, userId: req.user.id,
        });
        await invalidateAllAnalyticsCache(req.user.id);
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};

exports.updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // --- THIS IS THE FIX ---
        // Allow access if the user is an admin OR if they own the transaction.
        if (req.user.role !== 'admin' && transaction.userId !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }
        
        const updatedTransaction = await transaction.update(req.body);
        
        // Invalidate cache for the user whose transaction was changed
        await invalidateAllAnalyticsCache(transaction.userId);

        res.json(updatedTransaction);
    } catch (error) {
        next(error);
    }
};

exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // --- THIS IS THE FIX ---
        // Allow access if the user is an admin OR if they own the transaction.
        if (req.user.role !== 'admin' && transaction.userId !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        const userId = transaction.userId; // Get userId before destroying
        await transaction.destroy();

        // Invalidate cache for the user whose transaction was deleted
        await invalidateAllAnalyticsCache(userId);
        
        res.json({ message: 'Transaction removed' });
    } catch (error) {
        next(error);
    }
};
