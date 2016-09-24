import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import MediaVideo from './components/App/Forms';
import RegisterForm from './components/App/Forms/RegisterForm';
import LoginForm from './components/App/Forms/LoginForm';
import JoinLeague from './components/App/Forms/JoinLeague';
import CreateLeague from './components/App/Forms/CreateLeague';
import League from './components/League';
import LeaguePosts from './components/League/Posts';
import MyTeam from './components/League/MyTeam';
import PowerRankings from './components/League/PowerRankings';
import Rules from './components/League/Rules';
import SideBets from './components/League/SideBets';
import Keepers from './components/League/Keepers';
import Team from './components/League/Team';

export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={MediaVideo} />
      <Route path="register" component={RegisterForm} />
      <Route path="login" component={LoginForm} />
      <Route path="join" component={JoinLeague} />
      <Route path="create" component={CreateLeague} />
    </Route>
    <Route path="league/:id" component={League}>
      <IndexRoute component={LeaguePosts} />
      <Route path="myteam" component={MyTeam} />
      <Route path="power-rankings" component={PowerRankings} />
      <Route path="rules" component={Rules}/>
      <Route path="side-bets" component={SideBets}/>
      <Route path="keepers" component={Keepers}/>
      <Route path="team/:teamID" component={Team} />
    </Route>
  </div>
);
