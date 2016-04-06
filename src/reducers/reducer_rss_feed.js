import { FETCH_RSS } from '../actions/LeagueActions';

const INITIAL_STATE = { rss: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_RSS:
      return { rss: action.payload };
    default:
      return state;
  }
}
