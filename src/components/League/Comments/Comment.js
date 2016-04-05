import React, { Component } from 'react';
import moment from 'moment';

export default class Comment extends Component {
  render() {
    return (
      <li key={this.props.comment._id}>
        <h4>{this.props.comment.author.name}</h4>
        <h6>{moment(this.props.comment.date).format('MMMM Do, YYYY, h:mm a')}</h6>
        <p>{this.props.comment.text}</p>
      </li>
    );
  }
}
