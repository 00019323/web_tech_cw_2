const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Event = sequelize.define('Event', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
    },
});

// Set up a beforeCreate hook to ensure that Event is created with User
Event.beforeCreate(async (event, options) => {
    if (!event.userId) {
        throw new Error('Event must be associated with a User');
    }
});

// Set up a beforeUpdate hook to ensure that Event is updated with User
Event.beforeUpdate(async (event, options) => {
    if (!event.userId) {
        throw new Error('Event must be associated with a User');
    }
});

module.exports = Event;