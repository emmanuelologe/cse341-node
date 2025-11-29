const express = require('express');
const router = express.Router();
const passport = require('passport');

// Swagger
router.use('/', require('./swagger'));

// Collections
router.use('/contacts', require('./contacts'));
router.use('/cars', require('./cars'));

// GitHub login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;