const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const utils = require('../services/utils');

router.get('/', utils.isLoggedIn, (req, res, next) => res.sendFile('secret.html', { root: path.join(__dirname, '../public/views/') }));

router.get('/login', (req, res, next) => res.sendFile('login.html', { root: path.join(__dirname, '../public/views/') }));

router.get('/secret', utils.isLoggedIn, (req, res, next) => res.sendFile('secret.html', { root: path.join(__dirname, '../public/views/') }));

router.post('/register', 
    passport.authenticate('local.register', {
        successRedirect: '/login',
        failureRedirect: '/login'
    }), (req, res, next) => {}
);

router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/secret',
        failureRedirect: 'login'
    }), (req, res, next) => {}
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
