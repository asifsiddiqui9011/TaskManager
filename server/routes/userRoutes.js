// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/userController');

// API endpoint constants
const SIGNUP_API = '/signup';
const LOGIN_API = '/login';

// Map routes to controller methods
router.post(SIGNUP_API, authController.signup);
router.post(LOGIN_API, authController.login);

module.exports = router;