import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Cookies from 'cookies-js';
import { Glyphicon } from 'react-bootstrap';
import styles from './index.scss';

class DeletePost extends Component {

  render() {
    const userId = Cookies.get('userId').split(':')[1].replace(/"/g, '');
    if (userId == this.props.post.author.owner) {
      return (
        <div
          className="dropdown"
          styleName="delete-link">
        <span
          className="dropdown-toggle"
          type="button"
          data-toggle="dropdown">
          <Glyphicon glyph="option-horizontal" />
        </span>
          <div className="dropdown-menu">
              <a
                onClick={this.props.handlePostDelete.bind(this, this.props.post)}
                className="dropdown-item">Delete
              </a>
          </div>
        </div>
      );
    }
    return (
      <div></div>
    );
  }
}

export default CSSModules(DeletePost, styles);
