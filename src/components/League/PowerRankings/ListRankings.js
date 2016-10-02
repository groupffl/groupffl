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

  openAccordion(i, j) {
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
    return rankings.sort((a, b) => {
      return b.date - a.date;
    })
    .map((rankingObj, i) => {
      return (
        <div styleName="ranking-block">
          <h3>{rankingObj.week}</h3>
          <h4>{rankingObj.author}</h4>
          <ul styleName="ranking-list">
            {rankingObj.rankingList.map((ranking, j) => {
              return (
                  <li onClick={() => this.openAccordion(i, j)} styleName="ranking-list-item">
                    <h5>{ranking.rank} - {ranking.team}</h5>
                    {
                      this.state.openAccordion == `${i}-${j}`
                      ? <p styleName="summary">{ranking.summary}</p>
                      : null
                    }
                  </li>
              );
            })}
          </ul>
          <p>{rankingObj.date}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div styleName="rankings">
        <button onClick={this.props.handleCreate} styleName="create-rankings">Create Rankings</button>
        {this.renderRankings(this.props.rankings)}
      </div>
    );
  }
}

export default CSSModules(ListRankings, styles);