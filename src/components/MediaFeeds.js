import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class MediaFeeds extends Component {
  componentWillMount() {
    this.props.fetchRSS()
      .then(() => {
        console.log('recieved fantasydata');
      });
  }

  renderList() {
    return this.props.rss.data.map(article =>
      <li
        key={article.NewsID}
        className="list-group-item">
        <h5>{article.Title}</h5>
        <h6>{article.Content} <strong><a href={article.Url} target="_blank"> More</a></strong></h6>

      </li>
    );
  }

  render() {

    if (!this.props.rss.data) {
      return (
        <div>
          {/*}<img src="../images/Football.gif" height="100px" width="100px" alt=""/>*/}
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Football.gif" alt=""/>
        </div>
      );
    }
    console.log(this.props.rss.data);
    return (
      <div className="col-xs-3 media-feeds">
        <div className="row">
          <div className="media-rss">
            <ul>
              {this.renderList()}
            </ul>
          </div>
        </div>

        {/*
        <div className="row">
          <a className="twitter-timeline" href="https://twitter.com/hashtag/FantasyFootball" data-widget-id="713864014485282816">#FantasyFootball Tweets</a>
        </div>
        */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rss: state.rss.rss };
}

export default connect(mapStateToProps, actions)(MediaFeeds);
