import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import { connect } from 'react-redux';

class Team extends Component {
  constructor(props){
    super(props);
    this.renderTeam = this.renderTeam.bind(this);
  }

  renderTeam(teams) {
    var oppTeam = null;
    teams.forEach(team => {
      if (team._id == this.props.params.teamID) {
        oppTeam = team;
      }
    });

    return (
      <div styleName="main">
        <div styleName="team-wrapper">
          <div styleName="image-wrapper">
            <img src={oppTeam.imgUrl} width="100%" alt=""/>
          </div>
          <div styleName="bio-wrapper">
            <h3>{oppTeam.name}</h3>
            <h5>Total posts: {oppTeam.posts.length}</h5>
            <h5>Total comments: {oppTeam.comments.length}</h5>
          </div>
        </div>
        <p>About Me: {oppTeam.bio}</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.props.leagueInfo
          ? this.renderTeam(this.props.leagueInfo.teams)
          : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leagueInfo: state.leagueInfo.leagueInfo
  };
}

export default connect(mapStateToProps, null)(CSSModules(Team, styles));