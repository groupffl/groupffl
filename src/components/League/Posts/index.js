import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostInput from './PostInput';
import Post from './Post';
import {
  createPost,
  fetchPosts,
  fetchComments,
  receivePosts
} from '../../../actions/PostActions';

class LeaguePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }

  handlePostInput(inputText) {
    this.setState({
      inputText
    });
  }

  componentWillMount() {
    this.props.fetchPosts(this.props.params.id)
      .then(response => {
        console.log(response);
        this.props.receivePosts(response.payload.data);
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
    return this.props.all.map(post =>
      (
        <Post post={post} renderComments={this.renderComments.bind(this)} />
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
        console.log(response);
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
  return state.leaguePosts;
}

export default connect(mapStateToProps, {
  createPost,
  fetchPosts,
  fetchComments,
  receivePosts
})(LeaguePosts);
