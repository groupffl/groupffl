import React, { Component } from 'react';
import Cookies from 'cookies-js';

export default class DeletePost extends Component {

  render() {
    const userId = Cookies.get('userId').split(':')[1].replace(/"/g, '');
    if (userId == this.props.post.author.owner) {
      return (
        <div><a href="">Delete</a></div>
      );
    }
    return (
      <div></div>
    );
  }
}
