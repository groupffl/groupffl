import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class InviteMembersModal extends Component {
  constructor(props) {
    super(props);
    console.log('inside show modal component');
    console.log('this.props.show', this.props.show);
  }

  sendEmails() {
    this.props.sendInvitations(this.refs.inputEmails.value);
  }

  render() {
    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <p>Invite Members</p>
              <input
                ref="inputEmails"
                type="text" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.sendEmails.bind(this)}>Send</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
