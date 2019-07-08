import axios from 'axios';
import * as constants from '../constants';

function placeOrderRrquest () {
    return {
        type: constants.PLACE_ORDER_REQUEST,
    }
}

function placeOrderSuccess (data) {
    return {
        type: constants.PLACE_ORDER_SUCCESS,
        data,
    }
}

function placeOrderFailure (data) {
    return {
        type: constants.PLACE_ORDER_FAILURE,
        data,
    }
}

export function placeOrderAction (data) {
    return dispatch => {
        dispatch(placeOrderRrquest());
        return axios.post(`/user/place-order`, data)
            .then(response => {
                dispatch(placeOrderSuccess(response.data));
            })
            .catch(error => {
                dispatch(placeOrderFailure(error))
            })
    }
}