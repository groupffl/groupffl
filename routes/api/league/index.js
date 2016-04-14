(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();

  const League = require(global.models + '/League');
  const Post = require(global.models + '/Post');
  const User = require(global.models + '/User');

  var mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN });

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
    console.log('req.body in invite route: ', req.body);
    const senderEmail = 'groupfflj@gmail.com'; // Will be: req.body.senderEmail;
    const recipientsEmails = ['groupfflj@gmail.com']; // Will be: req.body.recipientsEmails;
    var data = {
      from: senderEmail,
      to: recipientsEmails,
      subject: 'Join My League at GroupFFL!',
      text: 'http://www.groupffl.com/'
    };
    mailgun.messages().send(data, function(error, body) {
      console.log('error is: ', error);
      console.log('mailgun data:', body);
      if (error) { res.status(400).send(error); }
      console.log('mailgun data:', body);
      res.send('Mailgun TEST: Email successfully sent to groupfflj@gmail.com');
    });
  });

  module.exports = router;
}());
