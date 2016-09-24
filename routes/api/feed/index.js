(function() {
  'use strict';
  require('dotenv').config();
  const express = require('express');
  const router = express.Router();
  const request = require('request');
  const RSS_URL = 'https://api.fantasydata.net/nfl/v2/json/News';
  var cheerio = require('cheerio');

  let cache = {};
  let cacheTime = 600000;

  // Return cached response
  router.get('/rssroto', (req, res) => {
    if (cache.rotoFeed && (Date.now() - cache.rotoFeed.time < cacheTime )) {
      res.send(cache.rotoFeed.content);
    } else {
      getRotoFeed(res);
    }
  });

  router.get('/rssnfl', (req, res) => {
    if (cache.nflFeed && (Date.now() - cache.nflFeed.time < cacheTime )) {
      res.send(cache.nflFeed.content);
    } else {
      getNflFeed(res);
    }
  });

  router.get('/rssespn', (req, res) => {
    if (cache.espnFeed && (Date.now() - cache.espnFeed.time < cacheTime )) {
      res.send(cache.espnFeed.content);
    } else {
      getEspnFeed(res);
    }
  });

  router.get('/rsspros', (req, res) => {
    if (cache.prosFeed && (Date.now() - cache.prosFeed.time < cacheTime )) {
      res.send(cache.prosFeed.content);
    } else {
      getProsFeed(res);
    }
  });

  function getRotoFeed(res) {
    request('http://www.rotoworld.com/headlines/nfl/', function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var rotoFeed = [];
        $('.pb').each(function(i) {
          var $this = $(this);
          var article = {
            Header: 'Rotoworld News',
            Title: $this.find('.headline > .player > a').text(),
            Content: $this.find('.impact').text().trim(),
            Url: 'http://www.rotoworld.com/headlines/nfl' + $this.find('a').attr('href')
          };
          if (i < 20) {
            rotoFeed.push(article);
          }
        });
        cache.rotoFeed = {
          content: rotoFeed,
          time: Date.now()
        };
        return res.send(rotoFeed);
      }
    });
  }

  function getNflFeed(res) {
    request('http://www.nfl.com/fantasyfootball', function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var nflFeed = [];
        $('#news-stream li').each(function(i) {
          var $this = $(this);
          var article = {
            Header: 'NFL News',
            Title: $this.find('h3').text().trim(),
            Content: $this.find('p').text().replace('Read', '').trim(),
            Url: 'http://www.nfl.com' + $this.find('a').attr('href')
          };
          if (i < 20) {
            nflFeed.push(article);
          }
        });
        cache.nflFeed = {
          content: nflFeed,
          time: Date.now()
        };
        return res.send(nflFeed);
      }
    });
  }

  function getEspnFeed(res) {
    request('http://www.espn.com/fantasy/football/', function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var espnFeed = [];
        $('.news-feed-item').each(function(i) {
          var $this = $(this);
          var article = {
            Header: 'ESPN News',
            Title: $this.find('h1').text(),
            Content: $this.find('p').text(),
            Url: 'http://espn.com' + $this.find('a').attr('href')
          };
          if (i < 20) {
            if (article.Title) {
              espnFeed.push(article);
            }
          }
        });
        cache.espnFeed = {
          content: espnFeed,
          time: Date.now()
        };
        return res.send(espnFeed);
      }
    });
  }

  function getProsFeed(res) {
    request('https://www.fantasypros.com/', function(error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var prosFeed = [];
        $('.article').each(function(i) {
          var $this = $(this);
          var article = {
            Header: 'Fantasy Pros News',
            Title: $this.find('.title').text(),
            Content: $this.find('.subtitle').text(),
            Url: $this.find('a').attr('href')
          };
          if (i < 10) {
            prosFeed.push(article);
          }
        });
        cache.prosFeed = {
          content: prosFeed,
          time: Date.now()
        };
        return res.send(prosFeed);
      }
    });
  }

  module.exports = router;
}());
