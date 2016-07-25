import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from './Hero.scss';

class Hero extends Component {
  constructor(props){
    super(props);
  }

  renderLinks() {
    let links = [
      {
        title: 'My Leagues',
        path: '/'
      },
      {
        title: 'Join League',
        path: '/join'
      },
      {
        title: 'Create League',
        path: '/create'
      }
    ];

    return links.map((link, i) => {
      let linkStyle;
      console.log(this.props.path);
      console.log(link.path.slice(1));
      if (this.props.path === link.path.slice(1)) {
        linkStyle = 'active';
      } else {
        linkStyle = '';
      }
      return (
        <Link
          to={link.path}
          key={i}
          styleName={linkStyle}>{link.title}
        </Link>
      );
    });
  }

  render() {
    const backgroundStyle = {
      backgroundImage: 'url(https://images.unsplash.com/photo-1462611849295-bcb823bf8f5f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=3e9989c235126ce50b8a139bc900301f)'
    };

    return (
      <div styleName="hero" style={backgroundStyle}>
        <h1 styleName="title">Group Fantasy Football League</h1>
        <h3 styleName="subtitle">Connect with friends and the football world around you with GroupFFL</h3>
        <div styleName="league-nav">
          {this.renderLinks()}
        </div>
      </div>
    );
  }
}

export default CSSModules(Hero, styles);