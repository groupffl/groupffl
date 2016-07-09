import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { verifyLogin } from '../../actions/UserActions';

import JoinPanel from './JoinPanel';
import LeaguesPanel from './LeaguesPanel';
import Navbar from '../Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.verifyLogin();
    this.state = {
      title1: 'aomething'
    };
  }

  componentDidMount() {
    this.setState({
      title1: 'GroupFFL - Home'
    });
  }

  render() {
    return (
      <div>
        <Helmet
          htmlAttributes={{"lang": "en", "amp": undefined}}
          title={this.state.title1}
          meta={[
              {"name": "description", "content": "Helmet application"},
              {"property": "og:type", "content": "article"}
          ]} />
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
