import { FETCH_COMMENTS } from '../actions/PostActions';

const INITIAL_STATE = { comment: null, all: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return { all: action.payload.data };
    default:
      return state;
  }
}
