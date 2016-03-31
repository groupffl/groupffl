import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class LeaguePosts extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
  }

  addPost() {
    console.log('post is: ', this.refs.postInput.value);
    console.log('params is: ', this.props.params.leagueId);
    // description, teamId, leagueId, title
    const postObj = {
      description: this.refs.postInput.value,
      leagueId: this.props.params.id,
      title: 'NA'
    };
    
    this.props.createPost(postObj);
  }

  render() {
    return (
      <div className="posts">
        <div className="post-wrapper">
          <textarea ref="postInput" type="text" className="post-area" placeholder="hello?"/>
          <button onClick={this.addPost.bind(this)} className="btn btn-primary pull-right">POST</button>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return state.leaguePosts;
// }

export default connect(null, { createPost })(LeaguePosts);
