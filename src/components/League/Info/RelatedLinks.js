import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import relatedLinks from '../../../../data/relatedLinks.js';

function RelatedLinks() {
  return (
    <div>
      {/*<h4>Fantasy Help</h4>
      {
        relatedLinks.map((link, i) => {
          return (
            <a
              styleName="related-links"
              href={link.url}
              target="_blank"
              key={i}>
              {link.title}
            </a>
          );
        })
      }*/}
    </div>
  );
}

export default CSSModules(RelatedLinks, styles);
