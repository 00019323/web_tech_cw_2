const express = require('express');
const profileController = require('../../controllers/profileController');

const router = express.Router();

router.get('/view/', profileController.getProfilePage);
router.put('/edit/', profileController.updateUser);

module.exports = router;