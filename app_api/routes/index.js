var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

var authMiddleware = function (jwt) {
    return jwt({ secret: 'MY_SECRET', userProperty: 'payload' })
};

// profile
router.get('/profile', authMiddleware(jwt), ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
