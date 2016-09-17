import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class Rules extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div styleName="test">Rules</div>
    );
  }
}

export default CSSModules(Rules, styles);