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

  //TODO: Move route logic to model
  // rankingSchema.statics.getRankings = (req, res) => {
  //
  // };

  // rankingSchema.statics.saveRankings = (req, res) => {
  //
  // };

  const Ranking = mongoose.model('Ranking', rankingSchema);

  module.exports = Ranking;
}());