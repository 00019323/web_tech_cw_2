const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Import your User model

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        if (req.originalUrl === '/auth/login') {
            return res.render('auth/login/index');
        } else {
            return res.redirect('/auth/login');
        }
    }

    console.log("HERE")

    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);

        // Check if token version or timestamp matches the current user version or timestamp
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        if (
            decoded.id !== user.dataValues.id ||
            decoded.username !== user.dataValues.username ||
            decoded.email !== user.dataValues.email ||
            decoded.fullname !== user.dataValues.fullname
        ) {
            // Generate a new token with updated user information
            const newToken = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                version: user.version
            }, process.env.AUTH_SECRET_KEY, {expiresIn: '1h'});

            console.log("UPDATING THE COOKIS VALUE")
            // Set the new token as a cookie
            res.cookie('token', newToken, {httpOnly: true});
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/auth/login');
    }
};

module.exports = authMiddleware;
