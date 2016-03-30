(function() {
  'use strict';
  const mongoose = require('mongoose');

  let commentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    text: { type: String, maxlength: 30000, required: true },
    date: { type: Date, default: Date.now() }
  });

  commentSchema.statics.createMW = (req, res, next) => {
    mongoose.model('Post').findById(req.body.postId, (err, post) => {
      if (err) { return res.status(400).send(err); }
      if (!post) { return res.status(400).send('There is no Post with this ID'); }
      mongoose.model('Team').findOne({ owner: req.user, league: post.league }, (err, team) => {
        if (err) { return res.status(400).send(err); }
        if (!team) { return res.status(400).send('You do not have a Team in this League'); }

        let comment = new Comment();
        comment.author = team._id;
        comment.post = post._id;
        comment.text = req.body.text;

        post.comments.push(comment);
        team.comments.push(comment);

        comment.save(err => {
          if (err) { return res.status(400).send(err); }
          post.save(err => {
            if (err) { return res.status(400).send(err); }
            team.save(err => {
              if (err) { return res.status(400).send(err); }
              next();
            });
          });
        });
      });
    });
  };

  const Comment = mongoose.model('Comment', commentSchema);

  module.exports = Comment;
}());
