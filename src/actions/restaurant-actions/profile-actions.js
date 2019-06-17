import axios from 'axios';
import * as constants from '../constants';

export function updateProfileRequest () {
    return {
        type: constants.UPDATE_RESATURANT_PROFILE_REQUEST,
    }
}

export function updateProfileSuccess (profile) {
    return {
        type: constants.UPDATE_RESATURANT_PROFILE_SUCCESS,
        profile,
    }
}

export function updateProfileFailure (error) {
    return {
        type: constants.UPDATE_RESATURANT_PROFILE_FAILURE,
        error,
    }
}

export function resetState () {
    return {
        type: constants.RESET_RESATURANT_PROFILE_STATE,
    }
}

export function updateProfileAction (data) {
    return dispatch => {
        dispatch(updateProfileRequest())
        return axios.put(`/owner/edit-profile`, data)
            .then(response => {
                dispatch(updateProfileSuccess(response.data));
            })
            .catch(error => {
                dispatch(updateProfileFailure(error));
            });
    }
}