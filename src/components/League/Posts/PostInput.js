import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import Textarea from 'react-textarea-autosize';

class PostInput extends Component {
  handleChange() {
    this.props.onPostInput(
      this.refs.postInput.value
    );
  }

  handleClick() {
    this.props.onAddPost(
      this.refs.postInput.value
    );
  }

  render() {
    return (
      <div styleName="post">
        <div styleName="post-text">
          <Textarea
            ref="postInput"
            type="text"
            placeholder="Say Something!"
            value={this.props.inputText}
            onChange={this.handleChange.bind(this)}>
          </Textarea>
        </div>
        <div styleName="post-button">
          <button
            onClick={this.handleClick.bind(this)}
            className="btn btn-primary">Post</button>
        </div>
      </div>
    );
  }
}

export default CSSModules(PostInput, styles);
