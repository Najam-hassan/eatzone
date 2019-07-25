import axios from 'axios';
import * as constants from '../constants';

export function updateProfileRequest () {
    return {
        type: constants.UPDATE_RESATURANT_PROFILE_REQUEST,
    }
}

export function updateProfileSuccess (profile, updating) {
    return {
        type: constants.UPDATE_RESATURANT_PROFILE_SUCCESS,
        profile,
        updating
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

export function updateProfileAction (data, updating) {
    return dispatch => {
        dispatch(updateProfileRequest());
        return axios.put(`/restaurant/edit-profile`, data)
            .then(response => {
                dispatch(updateProfileSuccess(response.data, updating));
            })
            .catch(error => {
                dispatch(updateProfileFailure(error));
            });
    }
}