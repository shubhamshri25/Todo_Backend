const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/user-controller');

// route for signUp
router.post('/register', registerUser);

// route for logging the user
router.post('/login', loginUser);

module.exports = router