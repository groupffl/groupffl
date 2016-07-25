import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyLogin } from '../../actions/UserActions';

import Hero from './Hero/Hero';
import JoinPanel from './JoinPanel';
import LeaguesPanel from './LeaguesPanel';
import Navbar from '../Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.verifyLogin();
  }

  render() {
    let path = this.props.location.pathname.slice(1);

    return (
      <div>
        <Navbar />
          <Hero
            path={path}
          />
          <div className="col-xs-8">
            {this.props.children}
          </div>
          <div className="col-xs-4">
            <JoinPanel />
            <LeaguesPanel />
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.isLoggedIn;
}

export default connect(mapStateToProps, { verifyLogin })(App);
