import { combineReducers } from 'redux';
import RegisterReducer from './reducer_register_form';
import LoginReducer from './reducer_login_form';
import RSSReducer from './reducer_rss_feed';
import LeagueReducer from './reducer_league';
import TeamReducer from './reducer_team';
import AuthReducer from './reducer_authentication';
import LeagueInfoReducer from './reducer_league_info';
import LeagueMembersReducer from './reducer_league_members';
import LeaguePostsReducer from './reducer_league_posts';
import LoadingReducer from './reducer_loading';
import promptLoginReducer from './reducer_prompt_login';
import MyTeamReducer from './reducer_my_team';
import { reducer as formReducer } from 'redux-form';

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
  isLoading: LoadingReducer,
  promptLogin: promptLoginReducer,
  myTeam: MyTeamReducer
});

export default rootReducer;
