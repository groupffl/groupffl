import { FETCH_LEAGUE_MEMBERS } from '../actions/index';

const INITIAL_STATE = { leagueMembers: [] };

export default function(state = INITIAL_STATE, action) {
  console.log('in league members', action.type);
  switch (action.type) {
    case FETCH_LEAGUE_MEMBERS:
      console.log('in fetch leage mem case', action.payload);
      return { leagueMembers: action.payload.data };
    default:
      return state;
  }
}
