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
        <button onClick={this.props.handleCreate}>Create Rankings</button>
        <h3>Author</h3>
        <h4>Week 1</h4>
        <ul>
          <li>
            <span>1</span>
            <span>Team 1</span>
          </li>
          <li>
            <span>1</span>
            <span>Team 1</span>
          </li>
          <li>
            <span>1</span>
            <span>Team 1</span>
          </li>
          <li>
            <span>1</span>
            <span>Team 1</span>
          </li>
          <li>
            <span>1</span>
            <span>Team 1</span>
          </li>
          <li>
            <span>1</span>
            <span>Team 1</span>
          </li>
        </ul>
        <p>Date</p>
      </div>
    );
  }
}

export default CSSModules(ListRankings, styles);