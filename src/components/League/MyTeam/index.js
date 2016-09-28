import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { updateTeamImage } from '../../../actions/TeamActions';
import styles from './index.scss';

class MyTeam extends Component {
  constructor(props){
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    var fd = new FormData();
    fd.append('file', this.refs.file.files[0]);
    console.log(this.props.myTeam);
    this.props.updateTeamImage(fd, this.props.myTeam.league);
  }

  render() {
    return (
      <div styleName="contain">
        <h2>My Team</h2>
        {
          this.props.myTeam
          ?
          <div styleName="main">
            <div styleName="team-wrapper">
              <div styleName="image-wrapper">
                <img src={this.props.myTeam.imgUrl} width="100%" alt=""/>
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                  <input ref="file" type="file" />
                  <button type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
                </form>
              </div>
              <div styleName="bio-wrapper">
                <h3>{this.props.myTeam.name}</h3>
                <h5>Total posts: {this.props.myTeam.posts.length}</h5>
                <h5>Total comments: {this.props.myTeam.comments.length}</h5>
              </div>
            </div>
            <p>About Me: {this.props.myTeam.bio}</p>
          </div>
          : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myTeam: state.myTeam.myTeam
  };
}

export default connect(mapStateToProps, { updateTeamImage })(CSSModules(MyTeam, styles));