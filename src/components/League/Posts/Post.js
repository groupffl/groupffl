import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

export default class Post extends Component {
  render() {
    return (
      <li key={this.props.post._id}>
        <h4>{this.props.post.author.name}</h4>
        <h6>{moment(this.props.post.date).format('MMMM Do, YYYY, h:mm a')}</h6>
        <p>{this.props.post.description}</p>
        <div className="post-link-wrapper">
        <Link to={`/league/${this.props.post.league}/posts/${this.props.post._id}`}>Comments: {this.props.post.comments.length}</Link>
        </div>
        {this.props.renderComments(this.props.post._id)}
      </li>
    );
  }
}
