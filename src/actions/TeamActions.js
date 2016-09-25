import axios from 'axios';

export const UPDATE_TEAM_IMAGE = 'UPDATE_TEAM_IMAGE';

const UPDATE_TEAM_IMAGE_URL = '/api/team/image';

export function updateTeamImage(file, id) {
  const request = axios.post(`${UPDATE_TEAM_IMAGE_URL}/${id}`, file);

  return {
    type: UPDATE_TEAM_IMAGE,
    payload: request
  };
}