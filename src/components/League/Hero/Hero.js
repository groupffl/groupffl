import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Hero.scss';

class Hero extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const backgroundStyle = {
      backgroundImage: 'url(https://images.unsplash.com/photo-1462611849295-bcb823bf8f5f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=3e9989c235126ce50b8a139bc900301f)'
    };
    console.log(this.props);

    let { leagueInfo } = this.props;

    return (
      <div styleName="hero" style={backgroundStyle}>
        {/*FIXME: Use default props*/}
        <h1 styleName="title">{ leagueInfo ? leagueInfo.name : ''}</h1>
        <h3 styleName="subtitle">{ leagueInfo ? leagueInfo.teams[0].name : ''}</h3>
      </div>
    );
  }
}

export default CSSModules(Hero, styles);