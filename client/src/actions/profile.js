import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
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
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const res = await api.post('/api/profile', formData);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'));

        if(!edit) {
            Navigate('/dashboard');
        }
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