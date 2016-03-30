import { FETCH_LEAGUE_DATA } from '../actions/index';

const INITIAL_STATE = { leagueData: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_LEAGUE_DATA:
    return { leagueData: action.payload.data };
  default:
    return state;
  }
}
