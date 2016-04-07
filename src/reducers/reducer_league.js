import {
  CREATE_LEAGUE,
  JOIN_LEAGUE,
  FETCH_LEAGUES
} from '../actions/LeagueActions';

import {
  LOGOUT_USER
} from '../actions/UserActions';

const INITIAL_STATE = { all: [], league: null, leagueData: null };

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case FETCH_LEAGUES:
      //return { ...state, post: action.payload.data}
      return { all: action.payload.data };
    case CREATE_LEAGUE:
      return { all: action.payload.data };
    case JOIN_LEAGUE:
      return { all: action.payload.data };
    case LOGOUT_USER:
      return { all: [] };
    default:
      return state;
  }
}
