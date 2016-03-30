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
    League.findOne({ name: titleReg }, (err, foundLeague) => {
      if (err) { return res.status(400).send(err); }
      if (foundLeague) { return res.status(400).send('A League with this name already exists'); }

      let newLeague = new League();
      newLeague.name = req.body.name;
      newLeague.commissioner = req.user;

      let newTeam = new (mongoose.model('Team'));
      console.log(newTeam);
      newTeam.name = req.body.team;
      newTeam.owner = req.user;
      newTeam.league = newLeague._id;

      newLeague.teams.push(newTeam._id);

      mongoose.model('User').findById(req.user, (err, foundUser) => {
        if (err) { return res.status(400).send(err); }

        foundUser.leagues.push(newLeague._id);
        foundUser.teams.push(newTeam._id);
        foundUser.save(err => {
          if (err) { return res.status(400).send(err); }
          newLeague.save(err => {
            if (err) { return res.status(400).send(err); }
            newTeam.save(err => {
              if (err) { return res.status(400).send(err); }
              req.resData = {
                message: 'League created',
                league: newLeague
              };
              req.resData.league.teams[0] = newTeam;
              req.resData.league.commissioner.username = foundUser.username;
              req.resData.league.commissioner.email = foundUser.email;
              next();
            });
          });
        });
      });
    });
  };

  leagueSchema.statics.detailsMW = (req, res, next) => {
    mongoose.model('User').findById(req.user, (err, user) => {
      if (err) { return res.status(400).send(err); }
      if (user.leagues.indexOf(req.params.leagueId) === -1) { return res.status(400).send('You do not belong to this league'); }
      League.findById(req.params.leagueId, (err, league) => {
        if (err) { return res.status(400).send(err); }
        if (!league) { return res.status(400).send('There is no league with this id'); }
      })
      .exec((err, league) => { // TODO: Change to promises and .then()
        if (err) { return res.status(400).send(err); }
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
