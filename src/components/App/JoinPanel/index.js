import React from 'react';
import CSSModules from 'react-css-modules';
import JoinLeagueButton from './JoinLeagueButton';
import CreateLeagueButton from './CreateLeagueButton';
import styles from './index.scss';

function JoinPanel() {
  return (
    <div styleName="join-panel">
      <JoinLeagueButton />
      <CreateLeagueButton />
    </div>
  );
}

export default CSSModules(JoinPanel, styles);
