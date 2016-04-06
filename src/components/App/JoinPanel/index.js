import React from 'react';
import JoinLeagueButton from './JoinLeagueButton';
import CreateLeagueButton from './CreateLeagueButton';

export default function() {
  return (
    <div className="join-panel">
      <JoinLeagueButton />
      <CreateLeagueButton />
    </div>
  );
}
