const express = require('express');
const router = express.Router();
const {signup, login, user} = require('../controllers/auth.controller')

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

router.get('/users', user);
  
module.exports = router;