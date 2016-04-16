import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagueInfo, inviteLeagueMembers } from '../../../actions/LeagueActions';
import RelatedLinks from './RelatedLinks';
import InviteMembersModal from './InviteMembersModal';

class LeagueInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentWillMount() {
    this.props.fetchLeagueInfo(this.props.leagueId)
      .then(() => {});
  }

  sendInvitations(emails) {
    this.setState({ show: false });

    const recipientsEmails = emails.replace(/\s+/g, '').split(',');
    const emailsObj = {
      senderEmail: this.props.leagueInfo.commissioner.email,
      recipientsEmails: recipientsEmails
    };
    this.props.inviteLeagueMembers(emailsObj)
      .then(response => {
        console.log('response: ', response);
      });
  }

  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
  }

  render() {
    if (!this.props.leagueInfo) {
      return (
        <div>loading league data...</div>
      );
    }
    const { leagueInfo } = this.props;
    // const subject = `Join%20My%20League%20On%20GFFL!`;
    // const title = `I just created a league on Group Fantasy Football League!`;
    // const subtitle = `Use this ID to join my league: ${leagueInfo._id}`;
    // const body = `Get started!  `;
    // const gffl = `http://www.groupffl.com/join`;
    // const enter = `%0D%0A%0D%0A`;
    // const mailto =`mailto:?to=&subject=${subject}&body=${title}${enter}${subtitle}${enter}${body}${gffl}`;

    return (
      <div>
        <h3>{leagueInfo.name}</h3>
        <div className="league-info-details">
          {/*<a href={mailto} >Invite Members</a>*/}
          {/*<a className="invite-members" onClick={this.inviteMembers.bind(this)}>Invite Members</a>*/}
          <a className="invite-members" onClick={this.openModal.bind(this)}>Invite Members</a>
          <h4>FFL URL</h4>
          <a href="#">{leagueInfo.fflUrl}</a>
          <h4>Commissioner</h4>
          <p>Team Name:<br />{leagueInfo.commissionerTeamName}</p>
          <p>Email:<br />{leagueInfo.commissioner.email}</p>
          <RelatedLinks />
        </div>
        <InviteMembersModal
          show={this.state.show}
          close={this.closeModal.bind(this)}
          sendInvitations={this.sendInvitations.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leagueInfo;
}

export default connect(mapStateToProps, { fetchLeagueInfo, inviteLeagueMembers })(LeagueInfo);
