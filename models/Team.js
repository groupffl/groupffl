(function() {
  'use strict';
  const mongoose = require('mongoose');
  var uuid = require('node-uuid');
  var AWS = require('aws-sdk');
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = process.env.AWSAccessKeyId;
  AWS.config.secretAccessKey = process.env.AWSSecretKey;
  var s3 = new AWS.S3();
  // var upload = multer({ storage: multer.memoryStorage() });

  let teamSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    league: { type: mongoose.Schema.Types.ObjectId, ref: 'League', required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    name: { type: String, required: true },
    imgUrl: { type: String },
    bio: { type: String },
    trashTalkRating: { type: Number, default: 0 },
    description: { type: String }
  });

  teamSchema.statics.createMW = (req, res, next) => {
    if (!req.body.team || !req.body.leagueId) { return res.status(400).send('Both Team name & League ID are required to create a new Team'); }
    let title = req.body.team.trim();
    let titleReg = new RegExp(`^${title}$`, 'i');

    mongoose.model('Team').findOne({ name: titleReg, league: req.body.leagueId }, (err, foundTeam) => {
      if (err) { return res.status(400).send(err); }
      if (foundTeam) { return res.status(400).send('A Team with this name already exists in this League – Please try again with a different Team name'); }
      mongoose.model('League').findById(req.body.leagueId, (err, foundLeague) => {
        if (err) { return res.status(400).send(err); }
        if (!foundLeague) { return res.status(400).send('League not found – Please double check that the League ID is correct'); }
        mongoose.model('Team').findOne({ owner: req.user, league: foundLeague.id }, (err, foundTeam) => {
          if (err) { return res.status(400).send(err); }
          if (foundTeam) {
            return res.status(400).send({
              message: 'You already have a Team in this League',
              data: foundTeam
            });
          }
          mongoose.model('User').findById(req.user)
          .then(foundUser => {
            let newTeam = new Team();
            newTeam.name = req.body.team.trim();
            newTeam.owner = foundUser._id;
            newTeam.league = foundLeague._id;
            newTeam.imgUrl = 'https://s3-us-west-1.amazonaws.com/groupffl/default_image.png';
            newTeam.bio = 'I am the owner of ' + newTeam.name;

            foundLeague.teams.push(newTeam._id);
            foundUser.teams.push(newTeam._id);
            foundUser.leagues.push(foundLeague._id);

            newTeam.save()
            .then(() => foundLeague.save())
            .then(() => foundUser.save())
            .then(() => {
              req.resData = {
                message: 'Team created',
                team: newTeam
              };
              req.resData.team.owner = foundUser;
              req.resData.team.league.name = foundLeague.name;
              next();
            })
            .catch(err => res.status(400).send(err.message));
          })
          .catch(err => res.status(400).send(err.message));
        });
      });
    });
  };

  teamSchema.statics.getMyTeam = (req, res) => {
    mongoose.model('Team').findOne({ owner: req.user, league: req.params.leagueId }, (err, myTeam) => {
      if (err) { return res.status(400).send(err); }
      return res.send(myTeam);
    });
  };

  teamSchema.statics.updateImage = (req, res) => {
    var filename = req.file.originalname;
    var ext = filename.match(/\.\w+$/)[0] || '';
    var key = uuid.v1() + ext;
    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: key,
      Body: req.file.buffer
    };

    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      mongoose.model('Team').findOne({ owner: req.user, league: req.params.leagueId }, (err, myTeam) => {
        if (err) { return res.status(400).send(err); }
        myTeam.imgUrl = process.env.AWS_URL + "/" + process.env.AWS_BUCKET + "/" + key;
        myTeam.save((err, team) => {
          return res.send(team);
        });
      });
    });
  };

  const Team = mongoose.model('Team', teamSchema);

  module.exports = Team;
}());
