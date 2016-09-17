import axios from 'axios';

export const FETCH_RSS = 'FETCH_RSS';
export const CREATE_LEAGUE = 'CREATE_LEAGUE';
export const JOIN_LEAGUE = 'JOIN_LEAGUE';
export const FETCH_LEAGUES = 'FETCH_LEAGUES';
export const FETCH_LEAGUE_INFO = 'FETCH_LEAGUE_INFO';
export const FETCH_LEAGUE_MEMBERS = 'FETCH_LEAGUE_MEMBERS';

const RSS_URL_ROTO = '/api/feed/rss';
const RSS_URL_NFL = '/api/feed/rssnfl';
const CREATE_LEAGUE_URL = '/api/league';
const JOIN_LEAGUE_URL = '/api/team';
const FETCH_LEAGUES_URL = '/api/league';
const FETCH_LEAGUE_INFO_URL = '/api/league/';
const FETCH_LEAGUE_MEMBERS_URL = '/api/league/';


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

export function fetchRSS(outlet) {
  let request;
  if (outlet == 'nfl') {
    request = axios.get(RSS_URL_NFL);
  } else {
    request = axios.get(RSS_URL_ROTO);
  }

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
