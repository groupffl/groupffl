import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createPost, fetchPosts, fetchComments } from '../actions/index';
import moment from 'moment';

var commentsDisplayedFlagG = false;

class LeaguePosts extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.params.id)
      .then(() => {
      });
  }

  renderComments(postId) {
    if (postId == this.props.params.postId) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }

  renderList() {
    if (commentsDisplayedFlagG === true) {
      commentsDisplayedFlagG = false;
      return this.props.all.map(post =>
        (
          <li key={post._id}>
          <h4>{post.author.name}</h4>
          <h6>{moment(post.date).format('MMMM Do, YYYY, h:mm a')}</h6>
          <p>{post.description}</p>
          <div className="post-link-wrapper">
            <Link to={`/league/${post.league}/posts`}>Comments: {post.comments.length}</Link>
          </div>
          {this.renderComments(post._id)}
          </li>
        )
      );
    }
    commentsDisplayedFlagG = true;
    return this.props.all.map(post =>
      (
        <li key={post._id}>
        <h4>{post.author.name}</h4>
        <h6>{moment(post.date).format('MMMM Do, YYYY, h:mm a')}</h6>
        <p>{post.description}</p>
        <div className="post-link-wrapper">
        <Link to={`/league/${post.league}/posts/${post._id}`}>Comments: {post.comments.length}</Link>
        </div>
        {this.renderComments(post._id)}
        </li>
      )
    );
  }

  addPost() {
    const postObj = {
      description: this.refs.postInput.value,
      leagueId: this.props.params.id,
      title: 'NA'
    };
    this.props.createPost(postObj)
    .then((res) => {
      this.refs.postInput.value = '';
      this.props.fetchPosts(this.props.params.id)
        .then(() => {
        });
    });
  }

  render() {
    return (
      <div className="league-posts">
        <div className="post-wrapper">
          <div className="post-text">
            <textarea ref="postInput" type="text" placeholder=""/>
            <button onClick={this.addPost.bind(this)} className="btn btn-primary pull-right">Post</button>
          </div>
          <div className="post-list-wrapper">
            <ul>
              {this.renderList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.leaguePosts;
}

export default connect(mapStateToProps, { createPost, fetchPosts, fetchComments })(LeaguePosts);
