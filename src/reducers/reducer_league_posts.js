import {
  FETCH_POSTS,
  RECEIVE_POSTS
} from '../actions/PostActions';

const INITIAL_STATE = { all: [], displayCommentsToggle: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return { all: action.payload };
    default:
      return state;
  }
}
