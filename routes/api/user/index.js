(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const User = require(global.models + '/User');

  router.post('/register', User.register, User.login, (req, res) => {
    res.send({ verify: true, message: 'Registered successfully' });
  });

  router.post('/login', User.login, (req, res) => {
    res.send({ verify: true, message: 'Welcome back!' });
  });

  module.exports = router;
}());
