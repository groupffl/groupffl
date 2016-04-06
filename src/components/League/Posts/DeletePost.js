import React, { Component } from 'react';
import Cookies from 'cookies-js';

export default class DeletePost extends Component {

  render() {
    const userId = Cookies.get('userId').split(':')[1].replace(/"/g, '');
    if (userId == this.props.post.author.owner) {
      return (
        <div><a onClick={this.props.handlePostDelete.bind(this, this.props.post)} href="#">Delete</a></div>
      );
    }
    return (
      <div></div>
    );
  }
}
