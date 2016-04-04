(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const League = require(global.models + '/League');
  const Post = require(global.models + '/Post');
  const User = require(global.models + '/User');

  router.get('/:leagueId/posts', User.isLoggedIn, (req, res) => {
    Post.
      find({ league: req.params.leagueId }).
      populate('author').
      exec((err, posts) => {
        if (err) { return res.status(400).send(err); }
        res.send(posts.reverse());
      });
  });

  router.get('/:leagueId', User.isLoggedIn, League.detailsMW, (req, res) => {
    res.send(req.details);
  });

  router.get('/', User.isLoggedIn, User.getUserLeaguesMW, (req, res) => {
    res.send(req.userLeagues);
  });

  router.post('/', User.isLoggedIn, League.createMW, User.getUserLeaguesMW, (req, res) => {
    res.send(req.userLeagues);
  });

  module.exports = router;
}());
