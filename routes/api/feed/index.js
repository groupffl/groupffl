(function() {
  'use strict';
  require('dotenv').config();
  const express = require('express');
  const router = express.Router();
  const request = require('request');
  const RSS_URL = 'https://api.fantasydata.net/nfl/v2/json/News';
  var cheerio = require('cheerio');

  let cache = {};

  // Initiate Api Call
  getApiReponse();

  // Get new live updates every 6 hours
  // Limit 1000 uses per API Key
  setInterval(function() {
    getApiReponse();
  }, 21600000);

  // Return cached response
  // router.get('/rss', (req, res) => {
  //   if (cache) {
  //     return res.send(cache);
  //   } else {
  //     getApiReponse();
  //   }
  // });

  router.get('/rss', (req, res) => {
    request('http://www.nfl.com/fantasyfootball', function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var nflFeed = [];
        $('#news-stream li').each(function(i) {
          var $this = $(this);
          var article = {
            Title: $this.find('h3').text().trim(),
            Content: $this.find('p').text().replace('Read', '').trim(),
            Url: 'www.nfl.com' + $this.find('a').attr('href')
          };
          if (i < 20) {
            nflFeed.push(article);
          }
        });
        return res.send(nflFeed);
      }
    });
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
