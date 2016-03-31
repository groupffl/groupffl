import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PostsComments extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    console.log('ok');
    console.log(this.props);
    return (<div>YOYOYOYO</div>);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Link to={`/league/${this.props.leagueId}/posts/${this.props.postId}`}
             onClick={this.handleClick.bind(this)}>Comment</Link>
        {this.props.children}
      </div>
    );
  }
}
