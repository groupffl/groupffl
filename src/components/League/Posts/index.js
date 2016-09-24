import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import PostInput from './PostInput';
import Post from './Post';
import styles from './index.scss';
import {
  createPost,
  fetchPosts,
  fetchComments,
  receivePosts,
  receivePost,
  toggleComments,
  deletePost,
  receiveDeletePost
} from '../../../actions/PostActions';

class LeaguePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);

    this.props.fetchPosts(this.props.params.id)
      .then(response => {
        const allPosts = response.payload.data.map(post => {
          post.toggle = false;
          return post;
        });
        this.props.receivePosts(allPosts);
      });
  }

  handlePostInput(inputText) {
    this.setState({
      inputText
    });
  }

  handleToggle(post) {
    this.props.toggleComments(post);
  }

  handlePostDelete(post) {
    this.props.deletePost(post)
      .then(response => {
        this.props.receiveDeletePost(post);
      });
  }

  renderList() {
    return this.props.all.map(post =>
      (
        <Post
          post={post}
          handleToggle={this.handleToggle}
          handlePostDelete={this.handlePostDelete} />
      )
    );
  }

  addPost(inputTextValue) {
    const postObj = {
      description: inputTextValue,
      leagueId: this.props.params.id,
      title: 'NA'
    };
    this.props.createPost(postObj)
      .then(response => {
        this.props.receivePost(response.payload.data);
        this.setState({
          inputText: ''
        });
      });
  }

  render() {
    console.log(this.props);
    return (
      <div styleName="league-posts">
      <h2>Smack Board</h2>
        <div styleName="post-wrapper">
        <PostInput
          onAddPost={this.addPost.bind(this)}
          onPostInput={this.handlePostInput.bind(this)}
          inputText={this.state.inputText} />
          <div styleName="post-list-wrapper">
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

export default connect(mapStateToProps, {
  createPost,
  fetchPosts,
  fetchComments,
  receivePosts,
  receivePost,
  toggleComments,
  deletePost,
  receiveDeletePost
})(CSSModules(LeaguePosts, styles));
