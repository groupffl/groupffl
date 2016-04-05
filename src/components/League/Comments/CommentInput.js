import React, { Component } from 'react';

export default class CommentInput extends Component {
  render() {
    return (
      <div>
        <textarea ref="commentInput" className="comment-area" />
        <button
         onClick={this.props.createComment.bind(this, this.refs)}
         className="btn btn-success pull-right">Comment
        </button>
      </div>
    );
  }
}
