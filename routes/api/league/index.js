(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const League = require(global.models + '/League');
  const User = require(global.models + '/User');


  router.get('/:leagueId', User.isLoggedIn, League.detailsMW, (req, res) => {
    res.send(req.details);
  });

  router.get('/', User.isLoggedIn, User.getUserLeaguesMW, (req, res) => {
    console.log('userLeagues', req.userLeagues);
    res.send(req.userLeagues);
  });

  router.post('/', User.isLoggedIn, League.createMW, User.getUserLeaguesMW, (req, res) => {
    console.log('newLeague', req.userLeagues);
    res.send(req.userLeagues);
  });

  module.exports = router;
}());
