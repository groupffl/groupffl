import React, { Component } from 'react';
import moment from 'moment';
import Comments from '../Comments';

export default class Post extends Component {
  render() {
    return (
      <li key={this.props.post._id}>
        <h4>{this.props.post.author.name}</h4>
        <h6>{moment(this.props.post.date).format('MMMM Do, YYYY, h:mm a')}</h6>
        <p>{this.props.post.description}</p>
        <div className="post-link-wrapper">
        Comments: {this.props.post.comments.length}
        </div>
        {/* looks at action property to see if comments should be shown */}
          <Comments comments={this.props.post.comments} />
        {/* looks at action property to see if comments should be shown */}
      </li>
    );
  }
}
