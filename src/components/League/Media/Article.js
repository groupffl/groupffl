import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import UIHelper from 'helpers/ui-helper';
import styles from './index.scss';

class Article extends Component {
  static propTypes = {
    article: React.PropTypes.object
  }

  render() {
    let { article } = this.props;

    return (
      <a href={this.props.article.Url} target="_blank" className="list-group-item" styleName="media-list-item">
        <li>
          <h6>{article.Header}</h6>
          <h5>{article.Title}</h5>
          <p>{UIHelper.regexQuotes(article.Content)}</p>
        </li>
      </a>
    );
  }
}

export default CSSModules(Article, styles);
