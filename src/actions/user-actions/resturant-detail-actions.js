import axios from 'axios';

import * as constants from '../constants';
import { resturants } from '../../utils/test-data'

export function fetchDetailsRrquest () {
    return {
        type: constants.FETCH_DETAIL_REQUEST,
    }
}

export function fetchDetailsSuccess (resturant) {
    return {
        type: constants.FETCH_DETAIL_SUCCESS,
        data: resturant,
    }
}

export function fetchDetailsFailure (error) {
    return {
        type: constants.FETCH_DETAIL_FAILURE,
        error
    }
}

export function resetState () {
    return {
        type: constants.RESET_DETAIL_STATE,
    }
}

export function fetchDetailAction (id) {
    return dispatch => {
        dispatch(fetchDetailsRrquest());
        return axios.get(`/user/restaurant-menu/${id}`)
            .then(response => {
                dispatch(fetchDetailsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchDetailsFailure(error))
            })
    }
}