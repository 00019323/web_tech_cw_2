const express = require('express');
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const eventRoutes = require('./events');
const profileRoutes = require('./profile');

const authMiddleware = require('../auth');

const router = express.Router();

// Apply authMiddleware to homeRoutes
const secureHomeRoutes = express.Router();
secureHomeRoutes.use(authMiddleware);
secureHomeRoutes.use('/', homeRoutes);

router.use('/auth', authRoutes);

// Apply authMiddleware to all other routes
router.use(authMiddleware);

// Mount secureHomeRoutes
router.use('/', secureHomeRoutes);
router.use('/events', eventRoutes);
router.use('/profile', profileRoutes);

router.use('*', (req, res) => {
    res.status(404).send('404 Not Found');
});

module.exports = router;