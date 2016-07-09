import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import * as actions from '../../../actions/LeagueActions';
import Article from './Article';
import styles from './index.scss';

class MediaFeeds extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRSS()
     .then(() => {});
  }

  renderList() {
    if (this.props.rss.length === 0 || this.props.rss.data.statusCode == 401) {
      return (
        <p>No fantasy news available...</p>
      );
    }
    return this.props.rss.data.map(article =>
      <Article article={ article } key={ article.NewsID } />
    );
  }

  render() {
    return (
      <div styleName="media-feeds">
        <h3>News</h3>
        <img src="http://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2016%2F0103%2Fr41245_1296x729_16%2D9.jpg&w=570" width="100%" alt=""/>
          <div className="row">
            <div styleName="media-rss">
              <ul>
                {this.renderList()}
              </ul>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rss: state.rss.rss };
}

export default connect(mapStateToProps, actions)(CSSModules(MediaFeeds, styles));
