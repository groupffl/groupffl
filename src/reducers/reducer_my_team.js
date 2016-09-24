import { FETCH_TEAM } from '../actions/LeagueActions';

const INITIAL_STATE = { myTeam: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TEAM:
      console.log(action);
      return { myTeam: action.payload.data };
    default:
      return state;
  }
}