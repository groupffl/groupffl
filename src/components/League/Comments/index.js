import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment, fetchComments } from '../../../actions/index';
import CommentInput from './CommentInput';
import Comment from './Comment';

class PostsComments extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchComments(this.props.params.postId)
      .then(() => {});
  }

  createComment(refs) {
    const commentObj = {
      text: refs.commentInput.value,
      postId: this.props.params.postId
    };
    this.props.createComment(commentObj)
      .then(() => {
        refs.commentInput.value = '';
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
          <CommentInput createComment={this.createComment.bind(this)} />
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

export default connect(mapStateToProps, { createComment, fetchComments })(PostsComments);
