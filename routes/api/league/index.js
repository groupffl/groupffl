(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const League = require(global.models + '/League');
  const Post = require(global.models + '/Post');
  const Team = require(global.models + '/Team');
  const User = require(global.models + '/User');

  router.get('/:leagueId', User.isLoggedIn, (req, res) => {
    console.log('req.params', req.params);
    User.findById(req.user, (err, user) => {
      if (err) { return res.status(400).send(err); }
      if (user.leagues.indexOf(req.params.leagueId) === -1) { return res.status(400).send('You do not belong to this league'); }
      League.findById(req.params.leagueId, (err, league) => {
        if (err) { return res.status(400).send(err); }
        if (!league) { return res.status(400).send('There is no league with this id'); }
      })
      .exec((err, league) => { // TODO: Change to promises and .then()
        if (err) { return res.status(400).send(err); }
        Team.populate(league, { path: 'teams' }, (err, league) => {
          if (err) { return res.status(400).send(err); }
          Post.populate(league, { path: 'posts teams.posts' }, (err, league) => {
            if (err) { return res.status(400).send(err); }
            User.populate(league, { path: 'posts.author teams.owner', model: 'User', select: 'email' }, (err, league) => {
              if (err) { return res.status(400).send(err); }
              res.send(league);
            });
          });
        });
      });
    });
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
