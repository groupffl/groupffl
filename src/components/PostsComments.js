import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class PostsComments extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        This is a comment
      </div>
    );
  }
}

 export default connect(null, null)(PostsComments);
