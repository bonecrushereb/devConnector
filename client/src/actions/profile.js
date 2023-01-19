import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
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
        console.log(res);
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