// src/services/analytics.service.js
const { Op, fn, col, literal } = require('sequelize');
const Transaction = require('../models/Transaction.model');
const Category = require('../models/Category.model');

const getAnalyticsData = async (userId, period = '30days') => {
    let startDate;
    const endDate = new Date();

    if (period === 'yearly') {
        startDate = new Date(endDate.getFullYear(), 0, 1); // Start of the current year
    } else if (period === 'monthly') {
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1); // Start of the current month
    } else { // Default to last 30 days
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
    }

    const whereClause = {
        userId,
        date: {
            [Op.between]: [startDate, endDate],
        },
    };

    // 1. Calculate Totals and Category Breakdown
    const [totalIncome, totalExpense, categoryBreakdown] = await Promise.all([
        Transaction.sum('amount', { where: { ...whereClause, type: 'income' } }),
        Transaction.sum('amount', { where: { ...whereClause, type: 'expense' } }),
        Transaction.findAll({
            attributes: [
                'categoryId',
                [fn('SUM', col('amount')), 'total'],
            ],
            where: { ...whereClause, type: 'expense' },
            group: ['categoryId', 'Category.id'],
            include: [{ model: Category, attributes: ['name'] }]
        }),
    ]);

    // 2. Calculate Income vs Expense Trends for the Line Chart
    const trends = await Transaction.findAll({
        attributes: [
            [fn('DATE_TRUNC', 'day', col('date')), 'day'],
            [fn('SUM', literal(`CASE WHEN type = 'income' THEN amount ELSE 0 END`)), 'totalIncome'],
            [fn('SUM', literal(`CASE WHEN type = 'expense' THEN amount ELSE 0 END`)), 'totalExpense'],
        ],
        where: whereClause,
        group: ['day'],
        order: [['day', 'ASC']],
        raw: true,
    });
    
    return {
        totalIncome: totalIncome || 0,
        totalExpense: totalExpense || 0,
        netBalance: (totalIncome || 0) - (totalExpense || 0),
        categoryBreakdown: categoryBreakdown.map(item => ({
            name: item.Category.name,
            total: item.get('total')
        })),
        trends: trends.map(t => ({ // Format data for recharts
            date: new Date(t.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            Income: parseFloat(t.totalIncome),
            Expense: parseFloat(t.totalExpense),
        })),
    };
};

module.exports = { getAnalyticsData };