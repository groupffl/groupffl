import { VERIFY_LOGIN } from '../actions/UserActions';

const INITIAL_STATE = { isLoggedIn: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case VERIFY_LOGIN:
      return { isLoggedIn: action.payload };
    default:
      return state;
  }
}
