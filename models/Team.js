(function() {
  'use strict';
  const mongoose = require('mongoose');

  const League = require(global.models + '/League');
  const User = require(global.models + '/User');

  let teamSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    league: { type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    name: { type: String, required: true },
    imgUrl: { type: String },
    trashTalkRating: { type: Number, default: 0 },
    description: { type: String }
  });

  teamSchema.statics.createMW = (req, res, next) => {
    if (!req.body.team || !req.body.leagueId) { return res.status(400).send('Both Team name & League ID are required to create a new Team'); }
    let title = req.body.team.trim();
    let titleReg = new RegExp(`^${title}$`, 'i');
    Team.findOne({ name: titleReg }, (err, foundTeam) => {
      if (err) { return res.status(400).send(err); }
      if (foundTeam) { return res.status(400).send('A Team with this name already exists in this League – Please try again with a different Team name'); }
      console.log('foundTeam:', foundTeam);
      League.findById(req.body.leagueId, (err, foundLeague) => {
        if (err) { return res.status(400).send(err); }
        if (!foundLeague) { return res.status(400).send('League not found – Please double check that the League ID is correct'); }
        Team.findOne({ owner: req.user }, (err, foundTeam) => {
          if (err) { return res.status(400).send(err); }
          if (foundTeam) {
            return res.status(400).send({
              message: 'You already have a Team in this League',
              data: foundTeam
            });
          }

          User.findById(req.user, (err, foundUser) => {
            if (err) { return res.status(400).send(err); }
            let newTeam = new Team();
            newTeam.name = req.body.team.trim();
            newTeam.owner = foundUser._id;
            newTeam.league = foundLeague._id;

            foundLeague.teams.push(newTeam._id);
            foundUser.teams.push(newTeam._id);
            foundUser.leagues.push(foundLeague._id);

            newTeam.save(err => {
              if (err) { return res.status(400).send(err); }
              foundLeague.save(err => {
                if (err) { return res.status(400).send(err); }
                foundUser.save(err => {
                  if (err) { return res.status(400).send(err); }
                  req.resData = {
                    message: 'Team created',
                    team: newTeam
                  };
                  next();
                });
              });
            });
          });
        });
      });
    });
  };

  const Team = mongoose.model('Team', teamSchema);

  module.exports = Team;
}());
