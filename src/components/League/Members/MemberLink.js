import React, { Component } from 'react';

export default class MemberLink extends Component {
  render() {
    return (
      <li>
        <div>
          <h5>{this.props.team.name}</h5>
        </div>
      </li>
    );
  }
}
