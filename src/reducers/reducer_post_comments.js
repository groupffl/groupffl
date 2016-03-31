import { CREATE_COMMENT } from '../actions/index';

const INITIAL_STATE = { comment: null, all: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_COMMENT:
      return { all: action.payload.data };
    default:
      return state;
  }
}
