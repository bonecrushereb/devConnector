import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPOS
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await api.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Get profile by ID
export const getProfileById = userId => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await api.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Get Github repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await api.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create or Update profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const res = await api.post('/api/profile', formData);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        Navigate('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
          errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// Add experience
export const addExperience = (formData, navigate) => async dispatch => {
    try {
        const res = await api.put('/api/profile/experience', formData);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// Add Education
export const addEducation = (formData, navigate) => async dispatch => {
    try {
        const res = await api.put('/api/profile/education', formData);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'));

    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await api.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Remvoed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Delete account & profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await api.delete('/api/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: DELETE_ACCOUNT });
  
        dispatch(setAlert('Your account has been permanently deleted'));
      } catch (err) {
        console.log(err);
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };