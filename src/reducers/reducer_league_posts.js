import { FETCH_POSTS } from '../actions/index';

const INITIAL_STATE = { all: [], displayCommentsToggle: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { all: action.payload.data };
    default:
      return state;
  }
}
