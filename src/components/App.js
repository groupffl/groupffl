import React, { Component } from 'react';

import Navbar from './Navbar';
import JoinPanel from './JoinPanel';
import LeaguesPanel from './LeaguesPanel';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <JoinPanel />
        <LeaguesPanel />
        {this.props.children}
      </div>
    )
  }
}
