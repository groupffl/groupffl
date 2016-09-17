import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchLeagueInfo } from '../../../actions/LeagueActions';
import RelatedLinks from './RelatedLinks';
import Teams from './Teams';
import styles from './index.scss';

class LeagueInfo extends Component {
  constructor(props) {
    super(props);
    this.props.fetchLeagueInfo(this.props.leagueId)
      .then(() => {});
    this.handleFantasyHelpClick = this.handleFantasyHelpClick.bind(this);
    this.handleTeamsClick = this.handleTeamsClick.bind(this);
    this.handleHighlightClick = this.handleHighlightClick.bind(this);
    this.state = {
      showFantasyLinks: false,
      showTeams: false,
      active: ''
    };
  }

  handleHighlightClick(active) {
    this.setState({
      active: active
    });
  }
  handleFantasyHelpClick() {
    this.setState({
      showFantasyLinks: !this.state.showFantasyLinks
    });
  }
  handleTeamsClick() {
    this.setState({
      showTeams: !this.state.showTeams
    });
  }

  render() {
    if (!this.props.leagueInfo) {
      return (
        <div>loading league data...</div>
      );
    }

    const { leagueInfo } = this.props;
    const subject = `Join%20My%20League%20On%20GFFL!`;
    const title = `I just created a league on Group Fantasy Football League!`;
    const subtitle = `Use this ID to join my league: ${leagueInfo._id}`;
    const body = `Get started!  `;
    const gffl = `http://www.groupffl.com/join`;
    const enter = `%0D%0A%0D%0A`;
    const mailto =`mailto:?to=&subject=${subject}&body=${title}${enter}${subtitle}${enter}${body}${gffl}`;

    return (
      <div>
        <h4>{leagueInfo.name}</h4>
        <ul styleName="league-info-list">
          <div onClick={() => this.handleHighlightClick('')}
                styleName={
                  this.state.active == ''
                  ?
                  "league-info-list-item active"
                  :
                  "league-info-list-item"
                }
                to="/"
                href="#">
            <li>Timeline</li>
          </div>
          <div onClick={() => this.handleHighlightClick('power-rankings')}
                styleName={
                  this.state.active == 'power-rankings'
                  ?
                  "league-info-list-item active"
                  :
                  "league-info-list-item"
                }
                to="/"
                href="#">
            <li>Power Rankings</li>
          </div>
          <div onClick={() => this.handleHighlightClick('rules')}
                styleName={
                  this.state.active == 'rules'
                  ?
                  "league-info-list-item active"
                  :
                  "league-info-list-item"
                }
                to="/"
                href="#">
            <li>Rules</li>
          </div>
          <div onClick={() => this.handleHighlightClick('side-bets')}
                styleName={
                  this.state.active == 'side-bets'
                  ?
                  "league-info-list-item active"
                  :
                  "league-info-list-item"
                }
                to="/"
                href="#">
            <li>Side Bets</li>
          </div>
          <div onClick={() => this.handleHighlightClick('keepers')}
                styleName={
                  this.state.active == 'keepers'
                  ?
                  "league-info-list-item active"
                  :
                  "league-info-list-item"
                }
                to="/"
                href="#">
            <li>Keepers</li>
          </div>
          <div
            styleName="league-info-list-item"
            onClick={this.handleTeamsClick}>
            <li>Teams</li>
          </div>
          {
            this.state.showTeams
            ?
            <Teams leagueId={this.props.leagueId} />
            :
            null
          }
          <div
            styleName="league-info-list-item"
            onClick={this.handleFantasyHelpClick}>
            <li>Fantasy Help</li>
          </div>
          {
            this.state.showFantasyLinks
            ?
            <RelatedLinks />
            :
            null
          }
          {/*<a href={mailto} >Invite Members</a>*/}
          {/*<a href="#">{leagueInfo.fflUrl}</a>*/}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leagueInfo;
}

export default connect(mapStateToProps, { fetchLeagueInfo })(CSSModules(LeagueInfo, styles, {allowMultiple: true}));
