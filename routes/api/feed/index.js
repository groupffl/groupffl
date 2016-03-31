(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();
  const request = require('request');
  const RSS_URL = 'https://api.fantasydata.net/nfl/v2/json/News';

  router.get('/rss', (req, res) => {
    console.log('in rss');
    request(RSS_URL, {
      headers: { 'Ocp-Apim-Subscription-Key': 'ff77733713e9497a8156473c5683ccfd' }
    }, function(err, response) {
      if (err) { return res.status(400).send(err); }
      res.send(response.body);
    });
  });

  module.exports = router;
}());
