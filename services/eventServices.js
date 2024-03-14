const {Event, User} = require('../models');

// write service method implementations
const eventService = {
    async getAll() {
        try {
            let events = await Event.findAll({
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'fullname', 'username', 'email'],
                    required: false, // Return null if the associated user doesn't exist
                },
            });
            return events.map(event => event.toJSON());
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getAllByUser(userId) {
        try {
            let events = await Event.findAll({
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'fullname', 'username', 'email'],
                    required: false, // Return null if the associated user doesn't exist
                },
                where: userId ? {
                    userId: userId // Assuming you have the user ID in req.user.id
                } : undefined
            });
            return events.map(event => event.toJSON());
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async getById(id) {
        try {
            return await Event.findByPk(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(req, res) {
        try {
            const {title, description, date, location} = req.body;
            const newEvent = await Event.create({
                title,
                description,
                date,
                location,
                userId: req.user.id
            });
            return newEvent;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id, updateData) {
        try {
            const event = await Event.findByPk(id);
            return await event.update(updateData);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async delete(id) {
        try {
            const event = await Event.findByPk(id);
            return await event.destroy();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


module.exports = eventService