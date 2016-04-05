import {
  RECEIVE_POSTS,
  RECEIVE_POST
} from '../actions/PostActions';

// const INITIAL_STATE = { all: [], displayCommentsToggle: false };

export default function(state = { all: [] }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return { all: action.payload };
    case RECEIVE_POST:
      return { all: [action.payload].concat(state.all) };
    default:
      return state;
  }
}
