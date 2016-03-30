import {
  CREATE_LEAGUE,
  FETCH_LEAGUES,
  LOGOUT_USER
 } from '../actions/index';

const INITIAL_STATE = { all: [], league: null, leagueData: null };

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case FETCH_LEAGUES:
      //return { ...state, post: action.payload.data}
      return { all: action.payload.data };
    case CREATE_LEAGUE:
      return { all: action.payload.data };
    case LOGOUT_USER:
      return state = undefined;
    default:
      return state;
  }
}
