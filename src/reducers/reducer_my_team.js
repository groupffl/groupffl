import { FETCH_TEAM } from '../actions/LeagueActions';
import { UPDATE_TEAM_IMAGE } from '../actions/TeamActions';

const INITIAL_STATE = { myTeam: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TEAM:
      return { myTeam: action.payload.data };
    case UPDATE_TEAM_IMAGE:
      return { myTeam: action.payload.data };
    default:
      return state;
  }
}