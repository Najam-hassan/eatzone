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

export function resetState () {
    return {
        type: constants.RESET_LOGIN_STATE,
    }
}

export function loginAction (user) {
    return dispatch => {
        dispatch(loginRequest())
        return axios.post(`/user/sign-in`, user)
            .then(response => {
                axios.defaults.headers.token = response.data.token;
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            });
        // if (user) {
        //     dispatch(loginSuccess(user))
        // } else {
        //     dispatch(loginFailure())
        // }
    }
}

export function signUpAction (user) {
    return dispatch => {
        dispatch(loginRequest())
        return axios.post(`/user/sign-up`, user)
            .then(response => {
                dispatch(loginSuccess(response.data));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            });
    }
}