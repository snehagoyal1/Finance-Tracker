const { sequelize } = require('../config/db.config');
require('./User.model');
require('./Category.model');
require('./Transaction.model');
const Category = require('./Category.model');


const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully!');

        await Category.bulkCreate([
            { name: 'Salary' },
            { name: 'Food' },
            { name: 'Transport' },
            { name: 'Entertainment' },
            { name: 'Utilities' },
            { name: 'Health' },
            { name: 'Other' },
        ]);
        console.log('Initial categories seeded.');

    } catch (error) {
        console.error('Error synchronizing database:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase();