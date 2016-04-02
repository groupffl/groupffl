import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../actions/index';
import { fetchComments } from '../actions/index';
import moment from 'moment';

class PostsComments extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchComments(this.props.params.postId)
      .then(res => {
        console.log(res);
      });
  }

  createComment() {
    const commentObj = {
      text: this.refs.commentInput.value,
      postId: this.props.params.postId
    };
    this.props.createComment(commentObj)
      .then((res) => {
        this.refs.commentInput.value = '';
        this.props.fetchComments(this.props.params.postId)
          .then((res) => {
          });
      });
  }

  renderList() {
    return this.props.all.map(comment => {
      return (
        <li key={comment._id}>
          <h4>{comment.author.name}</h4>
          <h6>{moment(comment.date).format('MMMM Do, YYYY, h:mm a')}</h6>
          <p>{comment.text}</p>
        </li>
      );
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
  console.log('state in comments is: ', state.comments);
  return state.comments;
}

 export default connect(mapStateToProps, { createComment, fetchComments })(PostsComments);
