import React from 'react';

const ESPN_FANTASY_URL = 'http://games.espn.go.com/frontpage/football';
const YAHOO_FANTASY_URL = 'http://football.fantasysports.yahoo.com';
const NFL_FANTASY_URL = 'http://www.nfl.com/fantasyfootball';
const ROTO_FANTASY_URL = 'http://www.rotoworld.com/playernews/nfl/football';

export default function() {
  return (
    <div>
      <h4>Related Links</h4>
      <a className="related-links" href={ESPN_FANTASY_URL} target="_blank">ESPN Fantasy News</a>
      <a className="related-links" href={YAHOO_FANTASY_URL} target="_blank">Yahoo Fantasy News</a>
      <a className="related-links" href={NFL_FANTASY_URL} target="_blank">NFL Fantasy News</a>
      <a className="related-links" href={ROTO_FANTASY_URL} target="_blank">Rotoworld Fantasy News</a>
    </div>
  );
}
