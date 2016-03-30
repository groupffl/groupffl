import React, { Component } from 'react';

export default class Posts extends Component {
  render() {
    return (
      <div className="posts">
        <div className="post-wrapper">
          <textarea className="post-area"></textarea>
          <button className="btn btn-primary pull-right">POST</button>
        </div>
      </div>
    );
  }
}
