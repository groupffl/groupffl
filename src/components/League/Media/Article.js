import React, { Component } from 'react';
import UIHelper from 'helpers/ui-helper';

export default class Article extends Component {
  static propTypes = {
    article: React.PropTypes.object
  }

  render() {
    let { article } = this.props;

    return (
      <li
        className="list-group-item">
        <h5>{article.Title}</h5>
        <h6>{UIHelper.regexQuotes(article.Content)}
          <strong><a href={this.props.article.Url} target="_blank"> More</a></strong>
        </h6>
      </li>
    );
  }
}
