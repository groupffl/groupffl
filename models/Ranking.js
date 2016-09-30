(function() {
  'use strict';
  const mongoose = require('mongoose');

  let RankingSchema = new mongoose.Schema({
    author: { type: String, required: true },
    date: { type: Number, required: true },
    week: { type: String },
    rankingList: { type: Array, required: true }
  });

  const Ranking = mongoose.model('League', RankingSchema);

  module.exports = Ranking;
}());
