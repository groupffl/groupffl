(function() {
  'use strict';
  const mongoose = require('mongoose');
  const Promise = require('bluebird');
  mongoose.Promise = Promise;
  Promise.promisifyAll(mongoose);

  let commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, maxlength: 30000, required: true },
    date: { type: Date, default: Date.now() }
  });

  // text, postId
  commentSchema.statics.createMW = (req, res, next) => {
    if (!req.body.text || !req.body.postId) { return res.status(400).send('Missing Post ID and/or comment text'); }
    let newComment = new Comment();
    mongoose.model('Post').findById(req.body.postId).exec()
    .then(post => {
      if (!post) { throw new Error('There is no Post with this ID'); }
      console.log('post 1:', post);
      mongoose.model('Team').findOne({ owner: req.user, league: post.league }).exec()
      .then(team => {
        if (!team) { throw new Error('You do not have a team in this League'); }
        newComment.author = team._id;
        team.comments.push(newComment);
        return team.save();
      })
      .then(() => {
        newComment.post = post._id;
        post.comments.push(newComment);
        return post.save();
      })
      .then(() => {
        newComment.text = req.body.text;
        newComment.date = Date.now();
        return newComment.save(err => {
          if (err) { return res.status(400).send(err); }
          req.commentObj = newComment;
        });
      })
      .then(() => {
        next();
      })
      .catch(err => {
        res.status(400).send(err.message);
      });
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
  };

  const Comment = mongoose.model('Comment', commentSchema);

  module.exports = Comment;
}());
