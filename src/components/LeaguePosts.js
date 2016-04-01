import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createPost, fetchPosts } from '../actions/index';

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
    console.log('params', this.props.params.postId);
    console.log('this post id', postId);
    if (postId == this.props.params.postId) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  }

  addPost() {
    const postObj = {
      description: this.refs.postInput.value,
      leagueId: this.props.params.id,
      title: 'NA'
    };
    this.props.createPost(postObj)
    .then((res) => {
      console.log('post created: ', res);
      this.props.fetchPosts(this.props.params.id)
        .then(() => {
        });
    });
  }

  renderList() {
    console.log('state', this.state);
    return this.props.all.map(post =>
      (
        <li key={post._id}>
          <div>{post.author.name} : {post.description}</div>
          <div>{post.date}</div>
          <Link to={`/league/${post.league}/posts/${post._id}`}>Comment</Link>
          {this.renderComments(post._id)}
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
