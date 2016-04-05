import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../../../actions/PostActions';
import CommentInput from './CommentInput';
import Comment from './Comment';

class PostsComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }

  componentWillMount() {
    this.props.fetchComments(this.props.params.postId)
      .then(() => {});
  }

  handleCommentInput(inputText) {
    this.setState({
      inputText
    });
  }

  addComment(inputTextValue) {
    const commentObj = {
      text: inputTextValue,
      postId: this.props.params.postId
    };
    this.props.createComment(commentObj)
      .then(() => {
        this.setState({
          inputText: ''
        });
        this.props.fetchComments(this.props.params.postId)
          .then(() => {});
      });
  }

  renderList() {
    return this.props.all.map(comment => (
      <Comment comment={comment} />
    ));
  }

  render() {
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
  }
}

function mapStateToProps(state) {
  return state.comments;
}

export default connect(mapStateToProps, {
  createComment,
  fetchComments
})(PostsComments);
