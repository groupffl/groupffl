(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const League = require(global.models + '/League');
  const Post = require(global.models + '/Post');
  const User = require(global.models + '/User');

  var mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});


  router.get('/:leagueId/posts', User.isLoggedIn, (req, res) => {
    Post.
      find({ league: req.params.leagueId }).
      populate('author comments').
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

  router.post('/invite', User.isLoggedIn, (req, res) => {
    console.log('in leagues/invite route');
    // var data = {
    //   from: 'Autovision <mdeggies@sandbox19714487a4e84db7abe48144d77098b7.mailgun.org>', //sent from here
    //   to: user.email,
    //   subject: 'Thanks for Registering at AutoVision!',
    //   text: 'https://autovision.herokuapp.com/#/'
    // };
    /*
    var data = {
      from: '<GroupFFL> admin@groupffl.com',
      to: 'groupfflj@gmail.com',
      subject: 'Join My League at GroupFFL!',
      text: 'http://www.groupffl.com/'
    };
    mailgun.messages().send(data, function (error, body) {
      console.log('mailgun data:',body);
      // res.send(user);
      res.send('PLACEHOLDER TEST: Successfully sent email to groupfflj@gmail.com');
    });
    */
  });

  module.exports = router;
}());
