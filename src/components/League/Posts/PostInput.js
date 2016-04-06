import React, { Component } from 'react';

export default class PostInput extends Component {
  handleChange() {
    this.props.onPostInput(
      this.refs.postInput.value
    );
  }

  handleClick() {
    this.props.onAddPost(
      this.refs.postInput.value
    );
  }

  render() {
    return (
      <div className="post-text">
        <textarea
          ref="postInput"
          type="text"
          value={this.props.inputText}
          onChange={this.handleChange.bind(this)} />
        <button
          onClick={this.handleClick.bind(this)}
          className="btn btn-primary pull-right">Post</button>
      </div>
    );
  }
}
