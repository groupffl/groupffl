import { FETCH_LEAGUE_INFO } from '../actions/index';

const INITIAL_STATE = { leagueInfo: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LEAGUE_INFO:
      return { leagueInfo: action.payload.data };
    default:
      return state;
  }
}
