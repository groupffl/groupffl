const express = require('express');
const router = express.Router();

const Post = require(global.models + '/Post');
const User = require(global.models + '/User');

router.get('/', User.isLoggedIn, (req, res) => {
  Post.find({ author: req.user }, (err, post) => {
    if (err) { return res.status(400).send(err); }
    res.send(post);
  });
});

router.get('/:leagueId', User.isLoggedIn, (req, res) => {
  Post.find({ league: req.params.leagueId }).populate('author').exec((err, posts) => {
    if (err) { return res.status(400).send(err); }
    console.log('posts: ', posts);
    res.send(posts);
  });
});

router.post('/', User.isLoggedIn, Post.createMW, (req, res) => {
  res.send('Post Created');
});

module.exports = router;
