import { FETCH_RANKINGS } from '../actions/RankingActions';

const INITIAL_STATE = { rankings: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_RANKINGS:
      return { team: action.payload.data };
    default:
      return state;
  }
}