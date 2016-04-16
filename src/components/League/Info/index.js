import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagueInfo, inviteLeagueMembers } from '../../../actions/LeagueActions';
import RelatedLinks from './RelatedLinks';
import { Button, Modal } from 'react-bootstrap';
import InviteMembersModal from './InviteMembersModal';

// import InviteMembersForm from './InviteMembersForm';
// import Modal from 'react-modal'; // r-m

// react-modal
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)'
//   }
// };

class LeagueInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false }; // r-b
    // r-m // this.state = { modalIsOpen: false };
  }

  // r-m
  // openModal() {
  //   this.setState({ modalIsOpen: true });
  // }
  //
  // closeModal() {
  //   this.setState({ modalIsOpen: false });
  // }

  componentWillMount() {
    this.props.fetchLeagueInfo(this.props.leagueId)
      .then(() => {});
  }

  // onSubmit(emails) {
  //   const recipientsEmails = emails.replace(/\s+/g, '').split(',');
  //   const emailsObj = {
  //     senderEmail: this.props.leagueInfo.commissioner.email,
  //     recipientsEmails: recipientsEmails
  //   };
  //   this.props.inviteLeagueMembers(emailsObj)
  //     .then(response => {
  //       console.log('response: ', response);
  //     });
  // }

  sendInvitations(emails) {
    console.log('clicked close modal button');
    // console.log('input text is: ', this.refs.inputEmails.value);
    console.log('emails is: ', emails);
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
    console.log('inside open modal');
    this.setState({ show: true });
  }

  render() {
    // let close = () => this.setState({ show: false }); // r-b

    if (!this.props.leagueInfo) {
      return (
        <div>loading league data...</div>
      );
    }
    console.log('this.props is: ', this.props);
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
          {/* r-m // <a className="invite-members" onClick={this.openModal.bind(this)}>Invite Members</a>*/}
          {/* r-m before refactor // <a className="invite-members" onClick={() => this.setState({ show: true})}>Invite Members</a>*/}
          <a className="invite-members" onClick={this.openModal.bind(this)}>Invite Members</a>
          <h4>FFL URL</h4>
          <a href="#">{leagueInfo.fflUrl}</a>
          <h4>Commissioner</h4>
          <p>Team Name:<br />{leagueInfo.commissionerTeamName}</p>
          <p>Email:<br />{leagueInfo.commissioner.email}</p>
          <RelatedLinks />
        </div>
        <InviteMembersModal show={this.state.show} sendInvitations={this.sendInvitations.bind(this)}/>
      </div>
    );
  }
}

// r-b
// <Button
//   bsStyle="primary"
//   bsSize="large"
//   onClick={() => this.setState({ show: true})}
// >
//   Launch contained modal
// </Button>

// <div className="modal-container" style={{height: 200}}>
//   <Modal
//     show={this.state.show}
//     onHide={close}
//     container={this}
//     aria-labelledby="contained-modal-title"
//   >
//     <Modal.Header closeButton>
//       <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <form>
//         <p>Invite Members</p>
//         <input
//           ref="inputEmails"
//           type="text" />
//       </form>
//     </Modal.Body>
//     <Modal.Footer>
//       <Button onClick={this.sendInvitations.bind(this)}>Send</Button>
//     </Modal.Footer>
//   </Modal>
// </div>
//
//

// r-m
// <Modal
//   isOpen={this.state.modalIsOpen}
//   onRequestClose={this.closeModal.bind(this)}
//   style={customStyles}>
//   <InviteMembersForm onSubmit={this.onSubmit.bind(this)}/>
//   <button className="btn btn-primary" onClick={this.closeModal.bind(this)}>close</button>
// </Modal>

function mapStateToProps(state) {
  console.log('state is: ', state);
  return state.leagueInfo;
}

export default connect(mapStateToProps, { fetchLeagueInfo, inviteLeagueMembers })(LeagueInfo);
