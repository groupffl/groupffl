import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment, receiveComment } from '../../../actions/PostActions';
import CommentInput from './CommentInput';
import Comment from './Comment';

class PostsComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }

  handleCommentInput(inputText) {
    this.setState({
      inputText
    });
  }

  addComment(inputTextValue) {
    const commentObj = {
      text: inputTextValue,
      postId: this.props.post._id
    };
    this.props.createComment(commentObj)
      .then(response => {
        this.props.receiveComment(response.payload.data);
        this.setState({
          inputText: ''
        });
      });
  }

  renderList() {
    return this.props.post.comments.map(comment => (
      <Comment comment={comment} />
    ));
  }

  render() {
    if (this.props.post.toggle) {
      return (
        <div className="comments">
          <div className="comment-area">
            <CommentInput
              onAddComment={this.addComment.bind(this)}
              onCommentInput={this.handleCommentInput.bind(this)}
              inputText={this.state.inputText} />
          </div>
          <div className="comments-list-wrapper">
            <ul>
              {this.renderList()}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default connect(null, {
  createComment,
  receiveComment
})(PostsComments);
