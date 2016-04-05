import { REGISTER_USER } from '../actions/UserActions';

const INITIAL_STATE = { register: null };

export default function(state= INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { register: action.payload };
    default:
      return state;
  }
}
