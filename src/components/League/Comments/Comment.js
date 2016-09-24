import React, { Component } from 'react';
import moment from 'moment';

export default class Comment extends Component {
  render() {
    return (
      <li key={this.props.comment._id}>
        <h5>{this.props.comment.authorName}</h5>
        <h6>{moment(this.props.comment.date).format('MMMM Do, YYYY, h:mm a')}</h6>
        <p>{this.props.comment.text}</p>
      </li>
    );
  }
}
