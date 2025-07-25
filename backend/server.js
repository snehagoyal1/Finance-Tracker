const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


// Load environment variables
dotenv.config();

// Import local modules
const { sequelize } = require('./src/config/db.config');
const apiRouter = require('./src/api');
const errorHandler = require('./src/middleware/errorHandler.middleware');
const swaggerDocs = require('./src/docs/swagger');

const app = express();
app.set('trust proxy', true);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// API Routes
app.use('/api', apiRouter);

// Swagger API Documentation
swaggerDocs(app, PORT);

// Global Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

startServer();