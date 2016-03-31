import { JOIN_LEAGUE } from '../actions/index';

const INITIAL_STATE = { league: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case JOIN_LEAGUE:
      return { team: action.payload.data };
    default:
      return state;
  }
}
