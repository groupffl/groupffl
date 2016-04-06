import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  RECEIVE_COMMENT
} from '../actions/PostActions';

// const INITIAL_STATE = { all: [], displayCommentsToggle: false };

export default function(state = { all: [] }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return { all: action.payload };
    case RECEIVE_POST:
      return { all: [action.payload].concat(state.all) };
    case RECEIVE_COMMENT:
      const postArray = state.all.map(post => {
        if (post._id != action.payload.post) {
          return post;
        }
        return {
          ...post,
          comments: post.comments.concat(action.payload)
        };
      });
      return { all: postArray };
    default:
      return state;
  }
}
