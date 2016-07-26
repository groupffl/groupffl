import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyLogin } from '../../actions/UserActions';

import Hero from 'components/App/Hero/Hero';
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
          <div className="col-xs-6">
            <LeaguesPanel />
          </div>
          <div className="col-xs-6">
          {this.props.children}
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.isLoggedIn;
}

export default connect(mapStateToProps, { verifyLogin })(App);
