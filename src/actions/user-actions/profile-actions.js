import axios from 'axios';

import * as constants from '../constants';

export function profileDetailsRequest () {
    return {
        type: constants.PROFILE_DATEILS_REQUEST,
    }
}

export function profileDetailsSuccess (profile, updating) {
    return {
        type: constants.PROFILE_DATEILS_SUCCESS,
        data: profile,
        updating,
    }
}

export function profileDetailsFailure (error) {
    return {
        type: constants.PROFILE_DATEILS_FAILURE,
        error
    }
}

export function resetState () {
    return {
        type: constants.RESET_USER_PROFILE
    }
}

export function profileDetailsAction (data, updating) {
    return dispatch => {
        dispatch(profileDetailsRequest());
        return axios.put(`/user/edit-profile`, data)
            .then(response => {
                dispatch(profileDetailsSuccess(response.data, updating));
            }).catch(error => {
                dispatch(profileDetailsFailure(error.response.data))
            });
    }
}