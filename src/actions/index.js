import axios from 'axios';
import Cookies from 'cookies-js';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const FETCH_RSS = 'FETCH_RSS';
export const CREATE_LEAGUE = 'CREATE_LEAGUE';
export const JOIN_LEAGUE = 'JOIN_LEAGUE';
export const FETCH_LEAGUES = 'FETCH_LEAGUES';
export const VERIFY_LOGIN = 'VERIFY_LOGIN';
export const FETCH_LEAGUE_INFO = 'FETCH_LEAGUE_INFO';
export const FETCH_LEAGUE_MEMBERS = 'FETCH_LEAGUE_MEMBERS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

const REGISTER_URL = '/api/user/register';
const LOGIN_URL = '/api/user/login';

const RSS_URL_BACK = '/api/feed/rss';
const CREATE_LEAGUE_URL = '/api/league';
const JOIN_LEAGUE_URL = '/api/team';
const FETCH_LEAGUES_URL = '/api/league';
const FETCH_LEAGUE_INFO_URL = '/api/league/';
const FETCH_LEAGUE_MEMBERS_URL = '/api/league/';
const CREATE_POST_URL = '/api/post';
const FETCH_POSTS_URL = '/api/league/';
const CREATE_COMMENT_URL = '/api/comment/';
const FETCH_COMMENTS_URL = '/api/post/';

export function registerUser(props) {
  const request = axios.post(REGISTER_URL, { email: props.email, password: props.password });

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function loginUser(props) {
  const request = axios.post(LOGIN_URL, props);

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null
  };
}

export function createLeague(props) {
  const request = axios.post(CREATE_LEAGUE_URL, props);

  return {
    type: CREATE_LEAGUE,
    payload: request
  };
}

export function joinLeague(props) {
  const request = axios.post(JOIN_LEAGUE_URL, props);

  return {
    type: JOIN_LEAGUE,
    payload: request
  };
}

export function fetchRSS() {
  const request = axios.get(RSS_URL_BACK);

  return {
    type: FETCH_RSS,
    payload: request
  };
}

export function fetchLeagues() {
  const request = axios.get(FETCH_LEAGUES_URL);

  return {
    type: FETCH_LEAGUES,
    payload: request
  };
}

export function verifyLogin() {
  const cookie = Cookies.get('authToken') ? true : false;
  return {
    type: VERIFY_LOGIN,
    payload: cookie
  };
}

export function fetchLeagueInfo(id) {
  const request = axios.get(`${FETCH_LEAGUE_INFO_URL}${id}`);

  return {
    type: FETCH_LEAGUE_INFO,
    payload: request
  };
}

export function fetchLeagueMembers(id) {
  const request = axios.get(`${FETCH_LEAGUE_MEMBERS_URL}${id}`);

  return {
    type: FETCH_LEAGUE_MEMBERS,
    payload: request
  };
}

export function createPost(postObj) {
  const request = axios.post(`${CREATE_POST_URL}`, postObj);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPosts(id) {
  const request = axios.get(`${FETCH_POSTS_URL}${id}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createComment(commentObj) {
  const request = axios.post(`${CREATE_COMMENT_URL}`, commentObj);

  return {
    type: CREATE_COMMENT,
    payload: request
  };
}

export function fetchComments(postId) {
  const request = axios.get(`${FETCH_COMMENTS_URL}${postId}/comments`);

  return {
    type: FETCH_COMMENTS,
    payload: request
  };
}
