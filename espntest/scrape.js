var request = require('request');
var cheerio = require('cheerio');

request('http://games.espn.go.com/frontpage/football', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    console.log('----------------------------------');
    // ESPN Latest content offseason
    $('#accordion5454892 li a').each(function(i, element){
      var a = $(this);
      var b = $(this).attr('href');
      console.log(a.text());
      console.log(b);
    });
    console.log('----------------------------------');


    // ESPN top headlines
    console.log('---------------ESPN Headlines-------------------');
    $('.mod-mem-carousel li a').each(function(i, element){
    	var $this = $(this);
      var topStoryHref = $this.attr('href');
      var topStoryImage = $this.find('img').attr('src');
      var topStoryHeader = $this.find('h3').text();
      console.log(topStoryHref);
      console.log(topStoryImage);
      console.log(topStoryHeader);
    });
    console.log('----------------------------------');

    $('.mod-open-list .alt').each(function(i, element) {
    	var $this = $(this);
    	var mustSeeVidHeader = $this.find('h5').text();
    	console.log(mustSeeVidHeader);
    });
  }
});


request('http://www.nfl.com/fantasyfootball', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);

    console.log('-------------NFL-------------------');
    // NFL news-stream
    var nflFeed = [];
    $('#news-stream li').each(function(i, element){
      var $this = $(this);
      var title = $this.find('h3').text().trim();
      var content = $this.find('p').text().replace("Read", "").trim();
      var url = "www.nfl.com" + $this.find('a').attr('href');
      var article = {};
      article.Title = title;
      article.Content = content;
      article.Url = url;
      if (i < 5) {
        nflFeed.push(article);
      }
    });
    console.log(nflFeed);
    console.log('--------------------------------');
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