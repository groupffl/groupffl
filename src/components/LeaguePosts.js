import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost, fetchPosts } from '../actions/index';

class LeaguePosts extends Component {

  componentWillMount() {
    this.props.fetchPosts(this.props.params.id)
      .then(() => {
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
    return this.props.all.map(post => {
      return (
        <li>{post.description}</li>
      );
    });
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
