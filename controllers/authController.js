const jwt = require('jsonwebtoken');
const {User} = require("../models");

const getLoginPage = async (req, res) => {
    try {
        res.render('auth/login/index');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getRegisterPage = async (req, res) => {
    try {
        res.render('auth/register/index');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/auth/login');
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const tryToLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email: email}});

        if (user) {
            const isValidPassword = await user.validatePassword(password);

            if (isValidPassword) {
                // Generate a JWT token with user data including version/timestamp
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                    // Add version or timestamp here
                    version: user.version // assuming you have a version field in the User model
                }, `${process.env.AUTH_SECRET_KEY}`, {expiresIn: '1h'});

                // Set the token as a cookie
                res.cookie('token', token, {httpOnly: true});

                // Send a success response
                res.json({success: true, access: token});
            } else {
                return res.status(401).json({error: 'Invalid credentials'});
            }
        } else {
            return res.status(401).json({error: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const registerUser = async (req, res) => {
    try {
        const {username, fullname, email, password} = req.body;
        await User.create({
            username: username,
            fullname: fullname,
            email: email,
            password: password,
        })
        res.json({success: true});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({error: 'Unauthorized'});
        }

        const decoded = jwt.verify(token, `${process.env.AUTH_SECRET_KEY}`);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
};

module.exports = {
    getLoginPage,
    tryToLogin,
    logoutUser,
    getRegisterPage,
    registerUser
};