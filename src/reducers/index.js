import { combineReducers } from 'redux';
import RegisterReducer from './reducer_register_form';
import LoginReducer from './reducer_login_form';
import RSSReducer from './reducer_rss_feed';
import LeagueReducer from './reducer_league';
import AuthReducer from './reducer_authentication';
import LeagueDataReducer from './reducer_league_data';


import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  register: RegisterReducer,
  login: LoginReducer,
  rss: RSSReducer,
  league: LeagueReducer,
  isLoggedIn: AuthReducer,
  leagueData: LeagueDataReducer
});

export default rootReducer;
