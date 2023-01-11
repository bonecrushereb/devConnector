import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

//load user
export const loadUser = () => async (dispatch) => {
  if(localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await api.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//register user
export const register =({ name, email, password }) => async dispatch => {

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.post('/api/users', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
    };

    dispatch({
      type: REGISTER_FAIL
    });
  }
}

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/api/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};
