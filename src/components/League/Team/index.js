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
    var oppTeam = teams.filter(team => team._id == this.props.params.teamID);

    return (
      <div styleName="main">
        <div styleName="team-wrapper">
          <div styleName="image-wrapper">
            <img src={oppTeam[0].imgUrl} width="100%" alt=""/>
          </div>
          <div styleName="bio-wrapper">
            <h3>{oppTeam[0].name}</h3>
            <h5>Total posts: {oppTeam[0].posts.length}</h5>
            <h5>Total comments: {oppTeam[0].comments.length}</h5>
          </div>
        </div>
        <p>About Me: {oppTeam[0].bio}</p>
      </div>
    );
  }

  render() {
    return (
      <div styleName="contain">
        <h2>Opposing Team</h2>
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