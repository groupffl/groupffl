import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import relatedLinks from '../../../../data/relatedLinks.js';

function RelatedLinks() {
  return (
    <div>
      {
        relatedLinks.map((link, i) => {
          return (
            <a
              styleName="league-info-list-tab"
              href={link.url}
              target="_blank"
              key={i}>
              <li>{link.title}</li>
            </a>
          );
        })
      }
    </div>
  );
}

export default CSSModules(RelatedLinks, styles);
