const express = require('express');
const router = express.Router();

const Comment = require(global.models + "/Comment");
const User = require(global.models + "/User");

router.get('/', User.isLoggedIn, (req, res) => {
  Comment.find({ author: req.user }, (err, comments) => {
    if (err) return res.status(400).send(err);
    res.send(comments);
  });
});

module.exports = router;
