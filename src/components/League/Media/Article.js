import React, { Component } from 'react';

export default class Article extends Component {
  render() {
    return (
      <li
        key={this.props.article.NewsID}
        className="list-group-item">
        <h5>{this.props.article.Title}</h5>
        <h6>{this.props.article.Content} <strong><a href={this.props.article.Url} target="_blank"> More</a></strong></h6>
      </li>
    );
  }
}
