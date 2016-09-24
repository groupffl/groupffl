import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './index.scss';

class MyTeam extends Component {
  constructor(props){
    super(props);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleImageChange(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
  }

  _handleSubmit() {

  }

  render() {
    console.log(this.props);
    return (
      <div styleName="rules">
        <h2>My Team</h2>
        {
          this.props.myTeam
          ?
          <div>
            <img src={this.props.myTeam.imgUrl} width="200px" height="200px" alt=""/>
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input type="file" onChange={(e)=>this._handleImageChange(e)} />
              <button type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
            </form>
            <h3>{this.props.myTeam.name}</h3>
            <p>{this.props.myTeam.bio}</p>
            <h5>Total posts: {this.props.myTeam.posts.length}</h5>
            <h5>Total comments: {this.props.myTeam.comments.length}</h5>
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

export default connect(mapStateToProps)(CSSModules(MyTeam, styles));