(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const Team = require(global.models + '/Team');
  const User = require(global.models + '/User');

  router.get('/', User.isLoggedIn, (req, res) => {
    Team.find({ owner: req.user }, (err, teams) => {
      if (err) { return res.status(400).send(err); }
      res.send(teams);
    });
  });

  router.post('/', User.isLoggedIn, Team.createMW, User.getUserLeaguesMW, (req, res) => {
    res.send(req.userLeagues);
  });

  module.exports = router;
}());
