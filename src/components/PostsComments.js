import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions/index';

class PostsComments extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  createComment() {
    const commentObj = {
      text: this.refs.commentInput.value,
      postId: this.props.params.postId
    };

    this.props.createComment(commentObj)
      .then((res) => {
        console.log('successful: ', res);
      });
  }

  render() {
    return (
      <div className="comments">
        <div className="comment-area">
          <textarea ref="commentInput" className="comment-area" />
          <button
            onClick={this.createComment.bind(this)}
            className="btn btn-success pull-right">Comment
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.comments;
}

 export default connect(mapStateToProps, { createComment })(PostsComments);
