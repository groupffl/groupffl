import { CREATE_POST } from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_POST:
      console.log(action.payload);
      return { post: action.payload.data };
    default:
      return state;
  }
}
