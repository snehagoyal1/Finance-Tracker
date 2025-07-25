// src/config/db.config.js

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();


// console.log('--- Checking Environment Variables ---');
// console.log('DATABASE_URL:', process.env.DATABASE_URL);
// console.log('------------------------------------');


// Use the single DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Required for many cloud providers
        }
    },
    logging: false,
});

module.exports = { sequelize };