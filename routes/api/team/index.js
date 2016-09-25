(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();
  var multer = require('multer');
  var upload = multer({ storage: multer.memoryStorage() });

  const Team = require(global.models + '/Team');
  const User = require(global.models + '/User');

  router.get('/', User.isLoggedIn, (req, res) => {
    Team.find({ owner: req.user }, (err, teams) => {
      if (err) { return res.status(400).send(err); }
      res.send(teams);
    });
  });

  router.get('/team/:leagueId', User.isLoggedIn, Team.getMyTeam, (req, res) => {
    res.send(req.myTeam);
  });

  router.post('/image/:leagueId', User.isLoggedIn, upload.single('file'), Team.updateImage, (req, res) => {
    res.send(req.myTeam);
  });

  router.post('/', User.isLoggedIn, Team.createMW, User.getUserLeaguesMW, (req, res) => {
    res.send(req.userLeagues);
  });

  module.exports = router;
}());
