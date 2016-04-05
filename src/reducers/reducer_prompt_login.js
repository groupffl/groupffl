import { PROMPT_LOGIN } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case PROMPT_LOGIN:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
