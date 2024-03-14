const eventServices = require("../services/eventServices");
const {User} = require("../models");

const getProfilePage = async (req, res) => {
    try {
        res.renderWithUser('profile/index');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const {username, fullname, email} = req.body;
        await User.update({username, fullname, email}, {where: {id: req.user.id}});
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getProfilePage,
    updateUser
};