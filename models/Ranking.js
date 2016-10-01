(function() {
  'use strict';
  const mongoose = require('mongoose');

  let rankingSchema = new mongoose.Schema({
    author: { type: String, required: true },
    date: { type: Number, required: true },
    week: { type: String },
    leagueId: { type: String, required: true },
    rankingList: { type: Array, required: true }
  });

  rankingSchema.statics.getRankings = (req, res) => {
    console.log(req.params);
    mongoose.Model('Ranking').find({ leagueId: req.params.leagueId }, (err, rankings) => {
      console.log(rankings);
      if (err) { res.status(400).send(err); }
      return req.rankings = rankings;
    });
  };

  const Ranking = mongoose.model('League', rankingSchema);

  module.exports = Ranking;
}());