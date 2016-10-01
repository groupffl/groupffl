import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class ListRankings extends Component {
  constructor(props){
    super(props);
    this.renderRankings = this.renderRankings.bind(this);
  }

  renderRankings(rankings) {
    return rankings.map((rankingObj, i) => {
      console.log(rankingObj);
      return (
        <div>
          <h3>{rankingObj.author}</h3>
          <h4>{rankingObj.week}</h4>
          {rankingObj.rankingList.map(ranking => {
            return (
              <ul>
                <li>
                  <p>{ranking.rank} {ranking.team}</p>
                  <p>{ranking.summary}</p>
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