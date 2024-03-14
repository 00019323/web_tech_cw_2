// database.js
const Sequelize = require('sequelize');
const path = require('path');

// Create a new Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'), // Specify the path to your SQLite database file
});

module.exports = sequelize;