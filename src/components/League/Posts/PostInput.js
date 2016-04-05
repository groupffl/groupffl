import React, { Component } from 'react';

export default class PostInput extends Component {
  render() {
    console.log('this.refs', this.refs);
    return (
      <div className="post-text">
      <textarea ref="postInput" type="text" placeholder=""/>
      <button onClick={ this.props.addPost.bind(this, this.refs) } className="btn btn-primary pull-right">Post</button>
      </div>
    );
  }
}
