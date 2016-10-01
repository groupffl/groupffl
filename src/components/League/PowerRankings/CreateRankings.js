import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

class ListRankings extends Component {
  constructor(props){
    super(props);
    this.renderInputList = this.renderInputList.bind(this);
    this.handleRefs = this.handleRefs.bind(this);
  }

  handleRefs(refs) {
    var rankingList = this.props.leagueInfo.teams.map((team, i) => {
      return {
        rank: i + 1,
        team: refs[`${i}-nickname`].value || refs[`${i}-team`].value,
        summary: refs[`${i}-summary`].value
      };
    });
    var rankings = {
      author: this.props.myTeam.name,
      date: Date.now(),
      week: 'empty',
      leagueId: this.props.leagueInfo._id,
      rankingList: rankingList
    };
    this.props.handleSubmit(rankings);
  }

  renderInputList() {
    var teams = this.props.leagueInfo.teams;
    return teams.map((team, i) => {
      return (
        <div>
          <span>{i+1} </span>
          <select name="teams" ref={ i + '-team'} id={'select' + i}>
            {teams.map(team => {
              return <option value={team.name}>{team.name}</option>;
            })}
          </select>
          <div>
            Nickname: <input name="nickname" ref={i + '-nickname'} id={'nickname' + i}></input>
          </div>
          <div>
            <textarea name="summary" ref={i + '-summary'} id={'summary' + i} cols="30" rows="5"></textarea>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.props.handleCancel}>Cancel</button>
        <button onClick={() => this.handleRefs(this.refs)}>SubmitRankings</button>
        <h3>Create</h3>
        {this.renderInputList()}
      </div>
    );
  }
}

export default CSSModules(ListRankings, styles);