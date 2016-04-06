import {
  BEGIN_SPINNER,
  END_SPINNER
} from '../actions/SpinnerActions';

export default function(state = false, action) {
  switch(action.type) {
    case BEGIN_SPINNER:
      return true;
    case END_SPINNER:
      return false;
    default:
      return state;
  }
}
