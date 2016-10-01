import { FETCH_RANKINGS, SAVE_RANKINGS } from '../actions/RankingActions';

const INITIAL_STATE = { rankings: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_RANKINGS:
      return { rankings: action.payload.data };
    case SAVE_RANKINGS:
      return { rankings: action.payload.data };
    default:
      return state;
  }
}