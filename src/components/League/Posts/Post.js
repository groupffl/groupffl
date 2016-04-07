import React from 'react';
import moment from 'moment';
import Comments from '../Comments';
import DeletePost from './DeletePost';

const Post = ({ post, post: { _id, authorName, date, description, comments }, handleToggle, handlePostDelete }) => (
  <li key={_id}>
    <h4>{authorName}</h4>
    <h6>{moment(date).format('MMMM Do, YYYY, h:mm a')}</h6>
    <p>{description}</p>
    <div className="post-link-wrapper">
      <a className="comment-link" onClick={handleToggle.bind(this, post)}>Comments: {comments.length}</a>
      <DeletePost post={post} handlePostDelete={handlePostDelete} />
    </div>
    <Comments post={post} />
  </li>
);

export default Post;
