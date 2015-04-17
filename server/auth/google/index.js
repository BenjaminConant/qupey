'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email', 
      // 'https://www.googleapis.com/auth/plus.circles.read',
      'https://www.google.com/m8/feeds'
      // 'https://www.googleapis.com/auth/contacts.readonly' 
    ],
    session: false
  }))

  .get('/oauth2callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = router;