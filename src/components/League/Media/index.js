import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import * as actions from '../../../actions/LeagueActions';
import Article from './Article';
import ArticleModal from './ArticleModal';
import styles from './index.scss';
import Modal from 'react-modal';

class MediaFeeds extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.props.fetchRSS('roto')
     .then(() => {});
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.changeFeed = this.changeFeed.bind(this);
    this.state = {
      modalUrl: '',
      modalIsOpen: false
    };
  }

  openModal(linkUrl) {
    this.setState({
      modalIsOpen: true,
      modalUrl: linkUrl
    });
  }

  closeModal() {
    this.setState({
      modalUrl: '',
      modalIsOpen: false
    });
  }

  changeFeed(host) {
    this.props.fetchRSS(host)
     .then(() => {});
  }

  renderList() {
    if (this.props.rss.length === 0 || this.props.rss.data.statusCode == 401) {
      return (
        <p>No fantasy news available...</p>
      );
    }
    return this.props.rss.data.map(article => {
      if (article.Url.match('http://www.rotoworld')) {
        return (
          <Article
            article={ article }
            key={ article.NewsID }
            onHandleClick={ this.openModal } />
        );
      } else {
        return (
          <ArticleModal
            article={ article }
            key={ article.NewsID }
            onHandleClick={ this.openModal } />
        );
      }
    });
  }

  render() {
    const customStyles = {
      overlay: {
        backgroundColor: 'rgba(0, 49, 107, 0.3)'
      },
      content: {
        top: '5%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        border: '5px solid #fff',
        background: '#fff',
        borderRadius: '4px',
        outline: 'none',
        padding: '0px'
      }
    };

    return (
      <div styleName="media-feeds">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}>
          <iframe src={this.state.modalUrl} frameborder="0" height="100%" width="100%"></iframe>
        </Modal>
        <h4 onClick={() => this.changeFeed('roto')}>ROTO</h4>
        <h4 onClick={() => this.changeFeed('nfl')}>NFL</h4>
        <h4 onClick={() => this.changeFeed('espn')}>ESPN</h4>
        <h4 onClick={() => this.changeFeed('pros')}>Pros</h4>
        <img src="http://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2016%2F0103%2Fr41245_1296x729_16%2D9.jpg&w=570" width="100%" alt=""/>
          <div styleName="media-rss">
            <ul>
              {this.renderList()}
            </ul>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { rss: state.rss.rss };
}

export default connect(mapStateToProps, actions)(CSSModules(MediaFeeds, styles));
