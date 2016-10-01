const express = require('express');
const router = express.Router();

const Ranking = require(global.models + '/Ranking');

router.get('/:leagueId', (req, res) => {
  Ranking.find({ leagueId: req.params.leagueId }, (err, rankings) => {
    if (err) {
      console.log(err);
      return res.status(400).send([]);
    }
    res.send(rankings);
  });
});

router.post('/:leagueId', (req, res) => {
  var ranking = new Ranking();
  ranking.author = req.body.author;
  ranking.date = req.body.date;
  ranking.week = req.body.week;
  ranking.leagueId = req.body.leagueId;
  ranking.rankingList = req.body.rankingList;
  ranking.save(err => {
    if (err) { return res.status(400).send(err); }
    Ranking.find({ leagueId: req.params.leagueId }, (err, rankings) => {
      if (err) {
        return res.status(400).send([]);
      }
      res.send(rankings);
    });
  });
});

module.exports = router;