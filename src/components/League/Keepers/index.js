import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class Keepers extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div styleName="test">Keepers</div>
    );
  }
}

export default CSSModules(Keepers, styles);