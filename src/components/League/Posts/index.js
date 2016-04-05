import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost, fetchPosts, fetchComments } from '../../../actions/index';
import PostInput from './PostInput';
import Post from './Post';

class LeaguePosts extends Component {
  componentWillMount() {
    this.props.fetchPosts(this.props.params.id)
      .then(() => {});
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
    return this.props.all.map(post =>
      (
        <Post post={post} renderComments={this.renderComments.bind(this)} />
      )
    );
  }

  addPost(refs) {
    const postObj = {
      description: refs.postInput.value,
      leagueId: this.props.params.id,
      title: 'NA'
    };
    this.props.createPost(postObj)
      .then( () => {
        refs.postInput.value = '';
        this.props.fetchPosts(this.props.params.id)
          .then(() => {
          });
      });
  }

  render() {
    return (
      <div className="league-posts">
        <div className="post-wrapper">
        <PostInput addPost={ this.addPost.bind(this) } />
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
