import React from 'react';
import moment from 'moment';
import Comments from '../Comments';

let Post = ({ post, post: { _id, author, date, description, comments }, handleToggle }) => (
  <li key={_id}>
    <h4>{author.name}</h4>
    <h6>{moment(date).format('MMMM Do, YYYY, h:mm a')}</h6>
    <p>{description}</p>
    <div className="post-link-wrapper">
    <a onClick={handleToggle.bind(this, post)}>Comments: {comments.length}</a>
    </div>
    {/* looks at action property to see if comments should be shown */}
      <Comments post={post} />
    {/* looks at action property to see if comments should be shown */}
  </li>
);

export default Post;
