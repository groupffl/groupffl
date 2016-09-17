import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class Team extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div styleName="test">Team</div>
    );
  }
}

export default CSSModules(Team, styles);