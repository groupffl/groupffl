(function() {
  'use strict';
  const mongoose = require('mongoose');

  let postSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    league: { type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true },
    // title: { type: String, required: true },
    description: { type: String, maxlength: 30000, required: true },
    date: { type: Date, default: Date.now() }
  });

  postSchema.statics.createMW = (req, res, next) => {
    console.log('req.body', req.body);
    console.log('req.user', req.user);


    mongoose.model('Team').findOne({owner:req.user, league:req.body.leagueId}, (err, team) => {
      if(err) { res.status(400).send(err); }
      console.log('team in Post model', team);
      req.body.teamId = team._id;

    if (!req.body.leagueId || !req.body.description || !req.body.teamId) {
      return res.status(400).send('League Id, Team Id, and Post Description are all required');
    }
    let newPost = new Post();
    mongoose.model('League').findById(req.body.leagueId).exec()
    .then(league => {
      if (!league) { throw new Error('There is no League with this ID'); }
      if (!league.teams.indexOf(req.body.teamId) === -1) { return res.status(400).send('This Team does not belong to this League'); }
      newPost.league = league.id;
      mongoose.model('Team').findOne({ _id: req.body.teamId, owner: req.user }).exec()
      .then(team => {
        if (!team) { throw new Error('You do not own a Team with this ID'); }
        newPost.author = team._id;
        team.posts.push(newPost);
        return team.save();
      })
      .then(() => league.save())
      .then(() => {
        newPost.title = req.body.title;
        newPost.description = req.body.description;
        return newPost.save();
      })
      .then(() => {
        next();
      })
      .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err.message));
    });
  };
  const Post = mongoose.model('Post', postSchema);
  module.exports = Post;
}());
