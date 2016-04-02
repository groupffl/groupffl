import { combineReducers } from 'redux';
import RegisterReducer from './reducer_register_form';
import LoginReducer from './reducer_login_form';
import RSSReducer from './reducer_rss_feed';
import LeagueReducer from './reducer_league';
import TeamReducer from './reducer_team';
import AuthReducer from './reducer_authentication';
import LeagueInfoReducer from './reducer_league_info';
import LeagueMembersReducer from './reducer_league_members.js';
import LeaguePostsReducer from './reducer_league_posts.js';
import ReducerPostComments from './reducer_post_comments.js';
import { reducer as formReducer } from 'redux-form';

console.log('in rootReducer');

const rootReducer = combineReducers({
  form: formReducer,
  register: RegisterReducer,
  login: LoginReducer,
  rss: RSSReducer,
  league: LeagueReducer,
  team: TeamReducer,
  isLoggedIn: AuthReducer,
  leagueInfo: LeagueInfoReducer,
  leagueMembers: LeagueMembersReducer,
  leaguePosts: LeaguePostsReducer,
  comments: ReducerPostComments
});

export default rootReducer;
