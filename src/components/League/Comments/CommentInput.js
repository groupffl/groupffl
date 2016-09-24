import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

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
        <Textarea
          placeholder="Write a comment..."
          ref="commentInput"
          value={this.props.inputText}
          onChange={this.handleChange.bind(this)}>
        </Textarea>
        <button
          onClick={this.handleClick.bind(this)}
          className="btn btn-success pull-right">Comment
        </button>
      </div>
    );
  }
}
