import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

const CREATE_POST_URL = '/api/post';
const FETCH_POSTS_URL = '/api/league/';
const CREATE_COMMENT_URL = '/api/comment/';
const FETCH_COMMENTS_URL = '/api/post/';

export function fetchPosts(id) {
  const request = axios.get(`${FETCH_POSTS_URL}${id}/posts`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    payload: posts
  };
}

export function createPost(postObj) {
  const request = axios.post(`${CREATE_POST_URL}`, postObj);

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    payload: post
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
