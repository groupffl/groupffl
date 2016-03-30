import React, { Component } from 'react';
import { fetchLeagueData, verifyLogin } from '../actions/index';
import { connect } from 'react-redux';


import Navbar from './Navbar';
import LeagueInfo from './LeagueInfo';
import MediaFeeds from './MediaFeeds';

class League extends Component {
  componentWillMount() {
    // console.log(this.props.params.id);
    this.props.verifyLogin();

    this.props.fetchLeagueData(this.props.params.id)
      .then(response => {
        console.log('fetched league data in league');
      })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <LeagueInfo />
            {this.props.children}
            <MediaFeeds />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn.isLoggedIn
  }
}

export default connect(mapStateToProps, { fetchLeagueData, verifyLogin })(League);
