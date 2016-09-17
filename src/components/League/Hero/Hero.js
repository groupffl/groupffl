import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Hero.scss';

class Hero extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const backgroundStyle = {
      backgroundImage: 'url(http://www.lightheadedbeds.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/3/1/31127-00-rfr_football_helmets_1600px.jpg)'
    };

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