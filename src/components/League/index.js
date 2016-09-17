import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import LeagueInfo from './Info';
import MediaFeeds from './Media';
import styles from './index.scss';

import { fetchLeagueData } from '../../actions/LeagueActions';
import { verifyLogin } from '../../actions/UserActions';

class League extends Component {
  constructor(props) {
    super(props);
    this.props.verifyLogin();
    console.log(this.props.routes[2].path);
  }

  render() {
    return (
      <div>
        <Helmet
          title="GroupFFL - League" />
        <Navbar />
        <div className="container" styleName="container">
          <div className="row">
            <div className="col-xs-3">
              <div styleName="league-info">
                <LeagueInfo
                  leagueId={this.props.params.id}
                  path={this.props.routes[2].path} />
              </div>
            </div>
            <div className="col-xs-6"
              leagueId={this.props.params.id}>
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
    isLoggedIn: state.isLoggedIn.isLoggedIn,
    leagueInfo: state.leagueInfo.leagueInfo
  };
}

export default connect(mapStateToProps, { fetchLeagueData, verifyLogin })(CSSModules(League, styles));
