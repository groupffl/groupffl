import React, { Component } from 'react';
import moment from 'moment';

export default class Comment extends Component {
  render() {
    return (
      <li key={this.props.comment._id}>
        <h5>{this.props.comment.authorName}</h5>
        {
          ((Date.now() - moment(this.props.comment.date)) > 8140000)
          ? <h6>{moment(this.props.comment.date).format('MMMM Do, YYYY')}</h6>
          : <h6>{moment(this.props.comment.date).fromNow()}</h6>
        }
        <p>{this.props.comment.text}</p>
      </li>
    );
  }
}
