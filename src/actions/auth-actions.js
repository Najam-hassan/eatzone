import axios from 'axios';
import * as constants from './constants';

export function loginRequest () {
    return {
        type: constants.USER_LOGIN_REQUEST,
    }
}

export function loginSuccess (user) {
    return {
        type: constants.USER_LOGIN_SUCCESS,
        user,
    }
}

export function loginFailure (error) {
    return {
        type: constants.USER_LOGIN_FAILURE,
        error,
    }
}

export function registerRequest () {
    return {
        type: constants.USER_SIGNUP_REQUEST,
    }
}

export function registerSuccess (user) {
    return {
        type: constants.USER_SIGNUP_SUCCESS,
        user,
    }
}

export function registerFailure (error) {
    return {
        type: constants.USER_SIGNUP_FAILURE,
        error,
    }
}

export function resetState () {
    return {
        type: constants.RESET_LOGIN_STATE,
    }
}

export function loginAction (url, user) {
    return dispatch => {
        dispatch(loginRequest())
        return axios.post(url, user)
            .then(response => {
                axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                dispatch(loginFailure(error.response ? error.response.data : null));
            });
    }
}

export function registerAction (url, user) {
    return dispatch => {
        dispatch(registerRequest())
        return axios.post(url, user)
            .then(response => {
                dispatch(registerSuccess(response.data));
            })
            .catch(error => {
                dispatch(registerFailure(error.response ? error.response.data : null));
            });
    }
}