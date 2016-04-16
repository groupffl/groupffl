import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostInput from './PostInput';
import Post from './Post';
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

  // componentWillMount() {
  //   this.props.fetchPosts(this.props.params.id)
  //     .then(response => {
  //       const allPosts = response.payload.data.map(post => {
  //         post.toggle = false;
  //         return post;
  //       });
  //       this.props.receivePosts(allPosts);
  //     });
  // }

  handleToggle(post) {
    this.props.toggleComments(post);
  }

  handlePostDelete(post) {
    this.props.deletePost(post)
      .then(response => {
        console.log(response);
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
        console.log('nre post: ', response);
        this.props.receivePost(response.payload.data);
        this.setState({
          inputText: ''
        });
      });
  }

  render() {
    return (
      <div className="league-posts">
        <div className="post-wrapper">
        <PostInput
          onAddPost={this.addPost.bind(this)}
          onPostInput={this.handlePostInput.bind(this)}
          inputText={this.state.inputText} />
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
  console.log('state.leaguePosts: ', state.leaguePosts);
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
})(LeaguePosts);
