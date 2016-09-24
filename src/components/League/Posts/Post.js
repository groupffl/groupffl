import React from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Comments from '../Comments';
import DeletePost from './DeletePost';
import styles from './index.scss';

const Post = ({ post, post: { _id, authorName, date, description, comments }, handleToggle, handlePostDelete }) => (
  <li key={_id}>
    <h5>{authorName}</h5>
    {
      ((Date.now() - moment(date)) > 8140000)
      ? <h6>{moment(date).format('MMMM Do, YYYY')}</h6>
      : <h6>{moment(date).fromNow()}</h6>
    }
    <p>{description}</p>
    <div styleName="post-link-wrapper">
      <a styleName="comment-link" onClick={handleToggle.bind(this, post)}>Comments: {comments.length}</a>
      <DeletePost post={post} handlePostDelete={handlePostDelete} />
    </div>
    <Comments post={post} />
  </li>
);

export default CSSModules(Post, styles);
