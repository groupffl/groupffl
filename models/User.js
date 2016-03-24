(function(){
  'use strict';
  const mongoose = require('mongoose');
  require('mongoose-type-email');

  const bcrypt = require('bcrypt');
  const jwt    = require('jwt-simple');
  const JWT_SECRET = process.env.JWT_SECRET;

  let userSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, trim: true, required: true },
    password: { type:String, required: true },
    email: { type: mongoose.Schema.Types.Email, lowercase: true, trim: true, required: true },
    leagues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'League' }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
  });

  userSchema.statics.register = (req, res, next) => {
      if(!req.body.username || !req.body.email || !req.body.password || !req.body.verifyPassword) return res.status(400).send('One or more fields left blank');
      if(req.body.password != req.body.verifyPassword) return res.status(400).send('Passwords must match');
      User.findOne({ username: req.body.username.toLowerCase() }, (err, foundUser) => {
        if (err) return res.status(400).send(err);
        if (foundUser) return res.status(400).send('This username is already taken');
        User.findOne({ email: req.body.email.toLowerCase() }, (err, foundUser) => {
          if (err) return res.status(400).send(err);
          if (foundUser) return res.status(400).send('This e-mail is currently in use');
          let user = new User;
          user.username = req.body.username.toLowerCase();
          user.email = req.body.email.toLowerCase();
          bcrypt.hash(req.body.password, 16, (err, hash) => {
            if (err) return res.status(400).send(err);
            user.password = hash;
            user.save(err => {
              if (err) return res.status(400).send(err);
              next();
            });
          });
        });
      });
  };

  userSchema.statics.login = (req, res, next) => {
    if(!req.body.email || !req.body.password) return res.status(400).send('Missing e-mail or password');
    User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err) return res.status(400).send(err);
      if (!foundUser) return res.status(400).send('No user found with this e-mail address');
      bcrypt.compare(req.body.password, foundUser.password, (err, correct) => {
        if (err) return res.status(400).send(err);
        if (!correct) return res.status(403).send('Incorrect password');
        let authData = {
          username: foundUser.username,
          email: foundUser.email,
          _id: foundUser._id,
          iat: Date.now()
        };
        let authToken = jwt.encode(authData, JWT_SECRET);
        res.cookie('authToken', authToken);
        next();
      });
    });
  };

  userSchema.statics.isLoggedIn = (req, res, next) => {
    if(!req.cookies.authToken) return res.status(403).send('You must be logged in to perform this action (1)');
    try {
      let userData = jwt.decode(req.cookies.authToken, JWT_SECRET);
      User.findById(userData._id, (err, foundUser) => {
        if (err) return res.status(400).send(err);
        if (!foundUser) return res.status(403).send('You must be logged in to perform this action (2)');
        req.user = foundUser._id;
        next();
      })
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  const User = mongoose.model('User', userSchema);

  module.exports = User;
}());
