import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Article from './Article';

class MediaFeeds extends Component {
  componentWillMount() {
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
      <Article article={ article } />
    );
  }

  render() {
    return (
      <div className="media-feeds">
        <h3>News</h3>
        <img src="http://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2016%2F0103%2Fr41245_1296x729_16%2D9.jpg&w=570" width="100%" alt=""/>
          <div className="row">
            <div className="media-rss">
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

export default connect(mapStateToProps, actions)(MediaFeeds);
