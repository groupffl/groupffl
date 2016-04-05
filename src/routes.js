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
import PostsComments from './components/League/PostsComments';

export default (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={MediaVideo} />
      <Route path="register" component={RegisterForm} />
      <Route path="login" component={LoginForm} />
      <Route path="join" component={JoinLeague} />
      <Route path="create" component={CreateLeague} />
    </Route>
    <Route path="/league/:id" component={League}>
      <Route path="posts" component={LeaguePosts}>
        <Route path=":postId" component={PostsComments} />
      </Route>
    </Route>
  </div>
);
