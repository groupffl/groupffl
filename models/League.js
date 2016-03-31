(function() {
  'use strict';
  const mongoose = require('mongoose');

  let leagueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    commissioner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  });

  leagueSchema.statics.createMW = (req, res, next) => {
    if (!req.body.team || !req.body.name) { return res.status(400).send('Missing League or Team name'); }
    let title = req.body.name.trim();
    let titleReg = new RegExp(`^${title}$`, 'i');

    let newLeague = new League();
    let newTeam = new (mongoose.model('Team'));

    League.findOne({ name: titleReg }).exec()
    .then(league => {
      if (league) { throw new Error('A League with this name already exists'); }

      newLeague.name = req.body.name;
      newLeague.commissioner = req.user;

      newTeam.name = req.body.team;
      newTeam.owner = req.user;
      newTeam.league = newLeague._id;
      mongoose.model('User').findById(req.user).exec()
      .then(user => {
        user.leagues.push(newLeague._id);
        user.teams.push(newTeam._id);

        req.resData = {
          message: 'League created',
          league: newLeague
        };
        req.resData.league.teams[0] = newTeam;
        req.resData.league.commissioner.username = user.username;
        req.resData.league.commissioner.email = user.email;
        return user.save();
      })
      .then(() => {
        newLeague.teams[0] = newTeam._id; //array has all of team data in an object pre-populated (for some reason), overwritten here
        return newLeague.save();
      })
      .then(() => newTeam.save())
      .then(() => next())
      .catch(err => {
        console.log(err);
        res.status(400).send(err.message);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err.message);
    });
  };

  leagueSchema.statics.detailsMW = (req, res, next) => {
    mongoose.model('User').findById(req.user, (err, user) => {
      if (err) { return res.status(400).send(err); }
      if (user.leagues.indexOf(req.params.leagueId) === -1) { return res.status(400).send('You do not belong to this league'); }
      League.findById(req.params.leagueId, (err, league) => {
        if (err) { return res.status(400).send(err); }
        if (!league) { return res.status(400).send('There is no league with this id'); }
        mongoose.model('Team').populate(league, { path: 'teams', model: 'Team' }, (err, league) => {
          if (err) { return res.status(400).send(err); }
          mongoose.model('Post').populate(league, { path: 'posts teams.posts' }, (err, league) => {
            if (err) { return res.status(400).send(err); }
            mongoose.model('Comment').populate(league, { path: 'posts.comments', model: 'Comment' }, (err, league) => {
              if (err) { return res.status(400).send(err); }
              mongoose.model('Team').populate(league, { path: 'posts.author posts.comments.author', model: 'Team' }, (err, league) => {
                if (err) { return res.status(400).send(err); }
                mongoose.model('User').populate(league, { path: 'commissioner teams.owner posts.author.owner', model: 'User', select: 'email' }, (err, league) => {
                  if (err) { return res.status(400).send(err); }
                  req.details = league;
                  next();
                });
              });
            });
          });
        });
      });
    });
  };
  const League = mongoose.model('League', leagueSchema);

  module.exports = League;
}());
