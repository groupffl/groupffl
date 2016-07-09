import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

const ESPN_FANTASY_URL = 'http://games.espn.go.com/frontpage/football';
const YAHOO_FANTASY_URL = 'http://football.fantasysports.yahoo.com';
const NFL_FANTASY_URL = 'http://www.nfl.com/fantasyfootball';
const ROTO_FANTASY_URL = 'http://www.rotoworld.com/playernews/nfl/football';

function RelatedLinks() {
  return (
    <div>
      <h4>Related Links</h4>
      <a styleName="related-links" href={ESPN_FANTASY_URL} target="_blank">ESPN Fantasy News</a>
      <a styleName="related-links" href={YAHOO_FANTASY_URL} target="_blank">Yahoo Fantasy News</a>
      <a styleName="related-links" href={NFL_FANTASY_URL} target="_blank">NFL Fantasy News</a>
      <a styleName="related-links" href={ROTO_FANTASY_URL} target="_blank">Rotoworld Fantasy News</a>
    </div>
  );
}

export default CSSModules(RelatedLinks, styles);
