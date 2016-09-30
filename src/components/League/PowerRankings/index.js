import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import CreateRankings from './CreateRankings';
import ListRankings from './ListRankings';

class PowerRankings extends Component {
  constructor(props){
    super(props);
    this.state = {
      creating: false
    };
    this.createRankings = this.createRankings.bind(this);
  }

  createRankings() {
    console.log('here');
    this.setState({
      creating: true
    });
  }

  render() {
    return (
      <div styleName="power-rankings">
        <h2>Power Rankings</h2>
        {
          this.state.creating
          ? <CreateRankings />
          : <ListRankings
              handleCreate={this.createRankings} />
        }
      </div>
    );
  }
}

export default CSSModules(PowerRankings, styles);