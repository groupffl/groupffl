import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class ListRankings extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Create</h3>
      </div>
    );
  }
}

export default CSSModules(ListRankings, styles);