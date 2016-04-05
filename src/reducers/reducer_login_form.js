import { LOGIN_USER } from '../actions/UserActions';

const INITIAL_STATE = { login: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { login: action.payload };
    default:
      return state;
  }
}
