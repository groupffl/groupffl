import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class ListRankings extends Component {
  constructor(props){
    super(props);
    this.renderRankings = this.renderRankings.bind(this);
    this.openAccordion = this.openAccordion.bind(this);
    this.state ={
      openAccordion: null
    };
  }

  openAccordion(i,j) {
    if (this.state.openAccordion == `${i}-${j}`) {
      return this.setState({
        openAccordion: null
      });
    }
    this.setState({
      openAccordion: `${i}-${j}`
    });
  }

  renderRankings(rankings) {
    return rankings.map((rankingObj, i) => {
      return (
        <div>
          <h3>{rankingObj.author}</h3>
          <h4>{rankingObj.week}</h4>
          {rankingObj.rankingList.map((ranking, j) => {
            return (
              <ul>
                <li>
                  <p onClick={() => this.openAccordion(i, j)}>{ranking.rank} {ranking.team}</p>
                  {
                    this.state.openAccordion == `${i}-${j}`
                    ? <p>{ranking.summary}</p>
                    : null
                  }
                </li>
              </ul>
            );
          })}
          <p>{rankingObj.date}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.props.handleCreate}>Create Rankings</button>
        {this.renderRankings(this.props.rankings)}
      </div>
    );
  }
}

export default CSSModules(ListRankings, styles);