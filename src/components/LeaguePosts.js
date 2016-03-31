import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost, fetchPosts } from '../actions/index';

class LeaguePosts extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
  }

  addPost() {
    console.log('post is: ', this.refs.postInput.value);
    console.log('params is: ', this.props.params.leagueId);
    const postObj = {
      description: this.refs.postInput.value,
      leagueId: this.props.params.id,
      title: 'NA'
    };
    this.props.createPost(postObj)
      .then(res => {
        console.log('got posts', res);
        this.props.fetchPosts(this.props.params.id)
          .then(res => {
            console.log('all posts', res);
          });
      });
  }

  renderList() {
    console.log(this.props.all)
    return this.props.all.map(post => {
      return (
        <li>{post.description}</li>
      );
    });
  }

  render() {
    console.log(this.props.leaguePosts);
    return (
      <div className="posts">
        <div className="post-wrapper">
          <textarea ref="postInput" type="text" className="post-area" placeholder="hello?"/>
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
