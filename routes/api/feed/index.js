(function() {
  'use strict';
  require('dotenv').config();
  const express = require('express');
  const router = express.Router();
  const request = require('request');
  const RSS_URL = 'https://api.fantasydata.net/nfl/v2/json/News';

  let cache = {};

  // Initiate Api Call
  getApiReponse();

  // Get new live updates every 6 hours
  // Limit 1000 uses per API Key
  setInterval(function() {
    getApiReponse();
  }, 21600000);

  // Return cached response
  router.get('/rss', (req, res) => {
    if (cache) {
      return res.send(cache);
    } else {
      getApiReponse();
    }
  });

  // Make Api Call
  function getApiReponse() {
    request(RSS_URL, {
      headers: { 'Ocp-Apim-Subscription-Key': process.env.FANTASYDATA_API_KEY }
    }, function(err, response) {
      if (err) { return console.log(err); }
      cache = response.body;
    });
  }

  module.exports = router;
}());
