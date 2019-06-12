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
        if (user.email && user.password)
            dispatch(loginSuccess(user));
        else
            dispatch(loginFailure())
    }
}