import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class InviteMembersModal extends Component {
  sendEmails() {
    this.props.sendInvitations(this.refs.inputEmails.value);
  }

  closeModal() {
    this.props.close();
  }

  render() {
    let close = () => this.closeModal();

    return (
      <div className="modal-container" style={{height: 200}}>
        <Modal
          show={this.props.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Invite Members to Join League</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                ref="inputEmails"
                type="text"
                placeholder=" joe@gmail.com, bob@hotmail.com, kevin@yahoo.com"
              />
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
