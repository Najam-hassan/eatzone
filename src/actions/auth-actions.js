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

export function loginFailure () {
    return {
        type: constants.USER_LOGIN_FAILURE,
    }
}

export function loginAction (user) {
    return dispatch => {
        dispatch(loginRequest())
        return axios.post(`/user/authenticate`, user)
            .then(response => {
                axios.defaults.headers.token = response.data.token;
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            });
    }
}

export function signUpAction (user) {
    return dispatch => {
        dispatch(loginRequest())
        return axios.post(`/user`, user)
            .then(response => {
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            });
    }
}