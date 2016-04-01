(function() {
  'use strict';
  require('dotenv').config();
  const express = require('express');
  const router = express.Router();
  const request = require('request');
  const RSS_URL = 'https://api.fantasydata.net/nfl/v2/json/News';

  router.get('/rss', (req, res) => {
    request(RSS_URL, {
      // headers: { 'Ocp-Apim-Subscription-Key': process.env.FANTASYDATA_API_KEY }
    }, function(err, response) {
      if (err) { return res.status(400).send(err); }
      res.send(response.body);
    });
  });
  
  module.exports = router;
}());
