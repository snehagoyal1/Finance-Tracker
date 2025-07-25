const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');
const { hashPassword, comparePassword } = require('../utils/hash.utils');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'read-only'),
        defaultValue: 'user',
        allowNull: false,
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await hashPassword(user.password);
            }
        },
    },
});

User.prototype.comparePassword = async function (enteredPassword) {
    return await comparePassword(enteredPassword, this.password);
};

module.exports = User;