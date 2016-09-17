import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import UIHelper from 'helpers/ui-helper';
import styles from './index.scss';

class ArticleModal extends Component {
  static propTypes = {
    article: React.PropTypes.object
  }

  render() {
    console.log(this.props);
    let { article } = this.props;

    return (
      <li
        className="list-group-item"
        styleName="media-list-item"
        onClick={() => this.props.onHandleClick(this.props.article.Url) }>
        <h5>{article.Title}</h5>
        <h6>{UIHelper.regexQuotes(article.Content)}</h6>
      </li>
    );
  }
}

export default CSSModules(ArticleModal, styles);
