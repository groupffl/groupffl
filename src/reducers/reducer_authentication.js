import { VERIFY_LOGIN } from '../actions/UserActions';

const INITIAL_STATE = { isLoggedIn: null };

export default function(state = INITIAL_STATE, action) {
  console.log('logged in', action);
  console.log(VERIFY_LOGIN);
  switch (action.type) {
    case VERIFY_LOGIN:
      console.log('inside verify login');
      return { isLoggedIn: action.payload };
    default:
      return state;
  }
}
