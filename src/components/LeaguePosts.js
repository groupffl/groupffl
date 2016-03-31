import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createPost, fetchPosts } from '../actions/index';

import PostsComments from './PostsComments';

class LeaguePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: ''
    };
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.params.id)
      .then(() => {
      });
  }

  handleClick(postId) {
    console.log('postId', postId);
    this.setState({
      postId
    });
  }

  addPost() {
    const postObj = {
      description: this.refs.postInput.value,
      leagueId: this.props.params.id,
      title: 'NA'
    };
    this.props.createPost(postObj)
    .then(() => {
      this.props.fetchPosts(this.props.params.id)
        .then(() => {
        });
    });
  }

  renderList() {
    return this.props.all.map(post =>
      (
        <li key={post._id}>
          <div>{post.author.name} : {post.description}</div>
          <div>{post.date}</div>
          <PostsComments leagueId={post.league} postId={post._id} />
        </li>
      )
    );
  }

  render() {
    return (
      <div className="posts">
        <div className="post-wrapper">
          <textarea ref="postInput" type="text" className="post-area" placeholder=""/>
          <button onClick={this.addPost.bind(this)} className="btn btn-primary pull-right">POST</button>
          <div>
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

export default connect(mapStateToProps, { createPost, fetchPosts })(LeaguePosts);
