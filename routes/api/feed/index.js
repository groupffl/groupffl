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
  router.get('/rssroto', (req, res) => {
    if (cache) {
      return res.send(cache);
    } else {
      getApiReponse();
    }
  });

  router.get('/rssnfl', (req, res) => {
    request('http://www.nfl.com/fantasyfootball', function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var nflFeed = [];
        $('#news-stream li').each(function(i) {
          var $this = $(this);
          var article = {
            Title: $this.find('h3').text().trim(),
            Content: $this.find('p').text().replace('Read', '').trim(),
            Url: 'http://www.nfl.com' + $this.find('a').attr('href')
          };
          if (i < 20) {
            nflFeed.push(article);
          }
        });
        return res.send(nflFeed);
      }
    });
  });

  router.get('/rssespn', (req, res) => {
    request('http://www.espn.com/fantasy/football/', function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var espnFeed = [];
        $('.news-feed-item').each(function(i) {
          var $this = $(this);
          var article = {
            Title: $this.find('h1').text(),
            Content: $this.find('p').text(),
            Url: 'http://espn.com' + $this.find('a').attr('href')
          };
          if (i < 20) {
            espnFeed.push(article);
          }
        });
        return res.send(espnFeed);
      }
    });
  });
  router.get('/rsspros', (req, res) => {
    request('https://www.fantasypros.com/', function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var prosFeed = [];
        $('.article').each(function(i) {
          var $this = $(this);
          var article = {
            Title: $this.find('.title').text(),
            Content: $this.find('.subtitle').text(),
            Url: $this.find('a').attr('href')
          };
          if (i < 10) {
            prosFeed.push(article);
          }
        });
        return res.send(prosFeed);
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
