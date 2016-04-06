import { FETCH_LEAGUE_MEMBERS } from '../actions/LeagueActions';

const INITIAL_STATE = { leagueMembers: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LEAGUE_MEMBERS:
      return { leagueMembers: action.payload.data };
    default:
      return state;
  }
}
