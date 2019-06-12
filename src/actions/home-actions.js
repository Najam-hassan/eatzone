import * as constants from './constants';
import { resturants } from '../utils/test-data'

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

export function fetchListFailure () {
    return {
        type: constants.FETCH_LIST_FAILURE,
    }
}

export function fetchListAction () {
    return dispatch => {
        // dispatch(fetchListRequest())
        dispatch(fetchListSuccess(resturants));
        // dispatch(fetchListFailure())
    }
}