import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class Rules extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div styleName="rules">
        <h2>Rules</h2>
      </div>
    );
  }
}

export default CSSModules(Rules, styles);