import axios from 'axios';

import * as constants from '../constants';

export function fetchListRequest () {
    return {
        type: constants.FETCH_LIST_REQUEST,
    }
}

export function fetchListSuccess (resturants) {
    return {
        type: constants.FETCH_LIST_SUCCESS,
        data: resturants,
    }
}

export function fetchListFailure (error) {
    return {
        type: constants.FETCH_LIST_FAILURE,
        error
    }
}

export function setCollectingResturant (restaurant) {
    return {
        type: constants.SET_COLLECTING_RESTAURANT,
        restaurant
    }
}

export function fetchListAction (url) {
    return dispatch => {
        dispatch(fetchListRequest());
        return axios.get(url)
            .then(response => {
                dispatch(fetchListSuccess(response.data));
            }).catch(error => {
                dispatch(fetchListFailure(error.response.data))
            });
    }
}