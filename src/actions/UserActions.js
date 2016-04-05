import axios from 'axios';
import Cookies from 'cookies-js';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const VERIFY_LOGIN = 'VERIFY_LOGIN';
export const PROMPT_LOGIN = 'PROMPT_LOGIN';

export const REGISTER_URL = '/api/user/register';
export const LOGIN_URL = '/api/user/login';

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

export function verifyLogin() {
  const cookie = Cookies.get('authToken') ? true : false;
  return {
    type: VERIFY_LOGIN,
    payload: cookie
  };
}

export function promptLogin(redirectMessage) {
  console.log(redirectMessage);
  return {
    type: PROMPT_LOGIN,
    payload: redirectMessage
  };
}
