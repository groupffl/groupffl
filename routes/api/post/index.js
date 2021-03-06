const express = require('express');
const router = express.Router();

const Post = require(global.models + '/Post');
const User = require(global.models + '/User');
const Comment = require(global.models + '/Comment');

router.get('/:postId/comments', (req, res) => {
  Comment.find({ post: req.params.postId }, (err, comments) => {
    if (err) { return res.status(400).send(err); }
    res.send(comments.reverse());
  }).populate('author');
});

router.get('/', User.isLoggedIn, (req, res) => {
  Post.find({ author: req.user }, (err, post) => {
    if (err) { return res.status(400).send(err); }
    res.send(post);
  });
});

router.post('/', User.isLoggedIn, Post.createMW, (req, res) => {
  res.send(req.postObj);
});

router.put('/', User.isLoggedIn, Post.deleteMW, (req, res) => {
  res.send(req.deletePost);
});

module.exports = router;
