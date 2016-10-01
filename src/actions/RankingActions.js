import axios from 'axios';

export const FETCH_RANKINGS = 'FETCH_RANKINGS';
export const SAVE_RANKINGS = 'SAVE_RANKINGS';

const FETCH_RANKINGS_URL = '/api/ranking';

export function fetchRankings(leagueId) {
  const request = axios.get(`${FETCH_RANKINGS_URL}/${leagueId}`);
  return {
    type: FETCH_RANKINGS,
    payload: request
  };
}

export function saveRanking(leagueId, ranking) {
  const request = axios.post(`${FETCH_RANKINGS_URL}/${leagueId}`, ranking);

  return {
    type: FETCH_RANKINGS,
    payload: request
  };
}