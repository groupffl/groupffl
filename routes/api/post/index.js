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

module.exports = router;
