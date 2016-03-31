import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions/index';

class PostsComments extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  createComment() {
    this.props.createComment(this.refs.commentInput.value)
      .then((res) => {
        console.log('successful: ', res);
      });
  }

  render() {
    console.log(this.props);
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

 export default connect(null, { createComment })(PostsComments);
