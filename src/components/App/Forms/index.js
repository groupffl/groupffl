import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import DemoVideo from './DemoVideo';

class MediaVideo extends Component {
  renderVideo() {
    if (this.props.isLoggedIn) {
      return (
        <iframe width="84%" height="320px" src="https://www.youtube.com/embed/Y_NmwtttzA8" frameborder="0" allowfullscreen></iframe>
      );
    }
    return (
      <DemoVideo />
    );
  }

  render() {
    return (
      <div className="media-panel">
        <div>
          <h2>Connect with friends and the football world around you with GroupFFL.</h2>
          <div className="icons-panel">
            <span><Glyphicon glyph="comment" /></span>
            <h4 className="bold">Talk fantasy football</h4>
            <h4 className="light">with friends on your league timeline.</h4>
          </div>
          <div className="icons-panel">
            <span><Glyphicon glyph="bullhorn" /></span>
            <h4 className="bold">Get recent news</h4>
            <h4 className="light">from around the league.</h4>
          </div>
          <div className="icons-panel">
            <span><Glyphicon glyph="globe" /></span>
            <h4 className="bold">Find more</h4>
            <h4 className="light">of what you've been missing.</h4>
          </div>
        </div>
        {this.renderVideo()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.isLoggedIn;
}

export default connect(mapStateToProps)(MediaVideo);
