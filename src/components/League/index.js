import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import LeagueInfo from './Info';
import MediaFeeds from './Media';
import LeagueMembers from './Members';

import { fetchLeagueData } from '../../actions/LeagueActions';
import { verifyLogin } from '../../actions/UserActions';

class League extends Component {
  constructor(props) {
    super(props);
    this.props.verifyLogin();
  }

  // componentWillMount() {
  //   this.props.verifyLogin();
  // }

  render() {
    return (
      <div>
        <Helmet
          title="League" />
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-xs-3">
              <div className="league-info">
                <LeagueInfo leagueId={this.props.params.id} />
                <LeagueMembers leagueId={this.props.params.id} />
              </div>
            </div>
            <div className="col-xs-6" leagueId={this.props.params.id}>
              {this.props.children}
            </div>
            <div className="col-xs-3">
              <MediaFeeds />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn.isLoggedIn
  };
}

export default connect(mapStateToProps, { fetchLeagueData, verifyLogin })(League);
