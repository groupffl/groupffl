import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import UIHelper from 'helpers/ui-helper';
import styles from './index.scss';

class ArticleModal extends Component {
  static propTypes = {
    article: React.PropTypes.object
  }

  render() {
    let { article } = this.props;

    return (
      <li
        key={Math.random()}
        className="list-group-item"
        styleName="media-list-item"
        onClick={() => this.props.onHandleClick(this.props.article.Url) }>
        <h6>{article.Header}</h6>
        <h5>{article.Title}</h5>
        <p>{UIHelper.regexQuotes(article.Content)}</p>
      </li>
    );
  }
}

export default CSSModules(ArticleModal, styles);
