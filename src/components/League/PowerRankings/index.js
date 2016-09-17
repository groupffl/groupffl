import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class PowerRankings extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div styleName="test">Power Rankings</div>
    );
  }
}

export default CSSModules(PowerRankings, styles);