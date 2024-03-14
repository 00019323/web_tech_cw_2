const express = require('express');
const authController = require('../../controllers/authController');

const router = express.Router();

router.post('/login/', authController.tryToLogin);
router.post('/register/', authController.registerUser);
router.get('/login/', authController.getLoginPage);
router.get('/register/', authController.getRegisterPage);
router.get('/logout/', authController.logoutUser);

module.exports = router;