import React, { Component } from 'react';

export default class InviteMembersForm extends Component {
  handleSubmit() {
    this.props.onSubmit(this.refs.inputEmails.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Invite Members
          <input
            ref="inputEmails"
            type="text" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
