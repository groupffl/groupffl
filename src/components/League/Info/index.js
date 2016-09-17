import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchLeagueInfo } from '../../../actions/LeagueActions';
import RelatedLinks from './RelatedLinks';
import styles from './index.scss';

class LeagueInfo extends Component {
  constructor(props) {
    super(props);
    this.props.fetchLeagueInfo(this.props.leagueId)
      .then(() => {});
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
    console.log(leagueInfo);

    return (
      <div>
        <h4>{leagueInfo.name}</h4>
        <ul styleName="league-info-list">
          <Link to="/" styleName="league-info-list-item active" href="#">
            <li>Timeline</li>
          </Link>
          <Link to="/" styleName="league-info-list-item" href="#">
            <li>Power Rankings</li>
          </Link>
          <Link to="/" styleName="league-info-list-item" href="#">
            <li>Rules</li>
          </Link>
          <Link to="/" styleName="league-info-list-item" href="#">
            <li>Side Bets</li>
          </Link>
          <Link to="/" styleName="league-info-list-item" href="#">
            <li>Keepers</li>
          </Link>
          <Link to="/" styleName="league-info-list-item" href="#">
            <li>Fantasy Help</li>
          </Link>
          <Link to="/" styleName="league-info-list-item" href="#">
            <li>Teams</li>
          </Link>

          {/*<a href={mailto} >Invite Members</a>*/}
          {/*<a href="#">{leagueInfo.fflUrl}</a>*/}
          <RelatedLinks />
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leagueInfo;
}

export default connect(mapStateToProps, { fetchLeagueInfo })(CSSModules(LeagueInfo, styles, {allowMultiple: true}));
