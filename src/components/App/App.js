import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyLogin } from '../../actions/index';

import JoinPanel from './JoinPanel/index';
import LeaguesPanel from './LeaguesPanel/LeaguesPanel';
import Navbar from '../Navbar';

class App extends Component {
  componentWillMount() {
    this.props.verifyLogin();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-xs-8">
              {this.props.children}
            </div>
            <div className="col-xs-4">
              <JoinPanel />
              <LeaguesPanel />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.isLoggedIn;
}

export default connect(mapStateToProps, { verifyLogin })(App);
