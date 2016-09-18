var request = require('request');
var cheerio = require('cheerio');


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
    console.log(prosFeed);
  }
});

request('http://www.rotoworld.com/playernews/nfl/football-player-news', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    // Rotoworld player news
    console.log('--------------------------------');
    $('.RW_pn .pb').each(function(i, element){
      var player = $(element).find('.player').text().split('-')[0].trim();
      var position = $(element).find('.player').text().split('-')[1].trim();
      var team = $(element).find('.player').text().split('-')[2].trim();
      var report = $(element).find('.report').text().trim();
      var impact = $(element).find('.impact').text().trim();
      var source = $(element).find('.source').text().trim();
      var date = $(element).find('.date').text().trim();
      console.log(player);
      console.log(position);
      console.log(team);
      console.log(report);
      console.log(impact);
      console.log(source);
      console.log(date + '\n');
    });
    console.log('--------------------------------');
  }
});