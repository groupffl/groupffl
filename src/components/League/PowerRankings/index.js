import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import { connect } from 'react-redux';
import CreateRankings from './CreateRankings';
import ListRankings from './ListRankings';

class PowerRankings extends Component {
  constructor(props){
    super(props);
    this.state = {
      creating: false
    };
    this.createRankings = this.createRankings.bind(this);
    this.cancelRankings = this.cancelRankings.bind(this);
    this.submitRankings = this.submitRankings.bind(this);
  }

  createRankings() {
    this.setState({
      creating: true
    });
  }

  cancelRankings() {
    this.setState({
      creating: false
    });
  }

  submitRankings(refs) {
    console.log(refs);
    this.setState({
      creating: false
    });
  }

  render() {
    return (
      <div styleName="power-rankings">
        <h2>Power Rankings</h2>
        {
          this.state.creating
          ? <CreateRankings
              handleCancel={this.cancelRankings}
              handleSubmit={this.submitRankings}
              myTeam={this.props.myTeam}
              leagueInfo={this.props.leagueInfo} />
          : <ListRankings
              handleCreate={this.createRankings} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    leagueInfo: state.leagueInfo.leagueInfo,
    myTeam: state.myTeam.myTeam
  };

}

export default connect(mapStateToProps, null)(CSSModules(PowerRankings, styles));