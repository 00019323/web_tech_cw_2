const User = require('./user');
const Event = require('./event');

Event.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    hooks: true
});

module.exports = {
    User,
    Event
};