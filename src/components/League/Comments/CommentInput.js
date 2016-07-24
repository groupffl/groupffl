import React, { Component } from 'react';

export default class CommentInput extends Component {
  handleChange() {
    this.props.onCommentInput(
      this.refs.commentInput.value
    );
  }

  handleClick() {
    this.props.onAddComment(
      this.refs.commentInput.value
    );
  }

  render() {
    return (
      <div>
        <textarea
          ref="commentInput"
          value={this.props.inputText}
          onChange={this.handleChange.bind(this)} />
        <button
          onClick={this.handleClick.bind(this)}
          className="btn btn-success pull-right">Comment
        </button>
      </div>
    );
  }
}
