import React from 'react';
import moment from 'moment';
import Comments from '../Comments';

const Post = ({ post, post: { _id, authorName, date, description, comments }, handleToggle }) => (
  <li key={_id}>
    <h4>{authorName}</h4>
    <h6>{moment(date).format('MMMM Do, YYYY, h:mm a')}</h6>
    <p>{description}</p>
    <div className="post-link-wrapper">
    <a onClick={handleToggle.bind(this, post)}>Comments: {comments.length}</a>
    </div>
    <Comments post={post} />
  </li>
);

export default Post;
