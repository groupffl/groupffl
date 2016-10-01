const express = require('express');
const router = express.Router();

const Ranking = require(global.models + '/Ranking');

router.get('/:leagueId', Ranking.getRankings, (req, res) => {
  console.log(req.rankings);
});

module.exports = router;