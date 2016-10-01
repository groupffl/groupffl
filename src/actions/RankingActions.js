import axios from 'axios';

export const FETCH_RANKINGS = 'FETCH_RANKINGS';

const FETCH_RANKINGS_URL = '/api/ranking';

export function fetchRankings(leagueId) {
  const request = axios.get(`${FETCH_RANKINGS_URL}/${leagueId}`);

  return {
    type: FETCH_RANKINGS_URL,
    payload: request
  };
}