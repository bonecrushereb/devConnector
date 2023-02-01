import api from '../utils/api';
// import { setAlert } from '../actions/alert';
import {
  GET_POSTS,
  POST_ERROR
} from './types';

//Get posts
export const getPosts = () => async (dispatch) => {
  console.log('calling posts');
  try {
    const res = await api.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
  });
  }
}