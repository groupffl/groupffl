import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class SideBets extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div styleName="test">Side Bets</div>
    );
  }
}

export default CSSModules(SideBets, styles);