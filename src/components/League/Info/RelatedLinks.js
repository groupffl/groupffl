import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import relatedLinks from '../../../../data/relatedLinks.js';
import Modal from 'react-modal';

class RelatedLinks extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
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
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}>
          <iframe src={this.state.modalUrl} frameborder="0" height="100%" width="100%"></iframe>
        </Modal>
        {
          relatedLinks.map((link, i) => {
            return (
              <div
                styleName="league-info-list-tab"
                onClick={() => this.openModal(link.url)}
                key={i}>
                <li>{link.title}</li>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default CSSModules(RelatedLinks, styles);
