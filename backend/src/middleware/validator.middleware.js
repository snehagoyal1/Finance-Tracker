const { check, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateRegistration = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    handleValidationErrors,
];

const validateLogin = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    handleValidationErrors,
];

const validateTransaction = [
    check('description', 'Description is required').not().isEmpty(),
    check('amount', 'Amount must be a number').isNumeric(),
    check('type', 'Type must be income or expense').isIn(['income', 'expense']),
    check('date', 'Date is required').isISO8601().toDate(),
    check('categoryId', 'Category is required').isInt(),
    handleValidationErrors,
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateTransaction,
};