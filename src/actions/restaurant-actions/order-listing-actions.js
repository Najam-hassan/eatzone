import axios from 'axios';
import * as constants from '../constants';

function fetchOrderRrquest () {
    return {
        type: constants.FETCH_RESTAURANT_ORDERS_REQUEST,
    }
}

function fetchOrderSuccess (data) {
    return {
        type: constants.FETCH_RESTAURANT_ORDERS_SUCCESS,
        data,
    }
}

function fetchOrderFailure (error) {
    return {
        type: constants.FETCH_RESTAURANT_ORDERS_FAILURE,
        error,
    }
}

export function fetchOrdersAction () {
    return dispatch => {
        dispatch(fetchOrderRrquest());
        return axios.get(`/restaurant/get-orders`)
            .then(response => {
                dispatch(fetchOrderSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchOrderFailure(error))
            })
    }
}

function updateOrderRequest () {
    return {
        type: constants.UPDATE_RESTAURANT_ORDERS_REQUEST,
    }
}

function updateOrderSuccess (data) {
    return {
        type: constants.UPDATE_RESTAURANT_ORDERS_SUCCESS,
        data,
    }
}

function updateOrderFailure (error) {
    return {
        type: constants.UPDATE_RESTAURANT_ORDERS_FAILURE,
        error,
    }
}

export function updateOrderStatusAction (url) {
    return dispatch => {
        dispatch(updateOrderRequest());
        axios.put(url)
            .then(response => {
                console.log(response.data, 'response');
                dispatch(updateOrderSuccess(response.data));
            })
            .catch(error => {
                console.log(error, 'error');
                dispatch(updateOrderFailure(error));
            })
    }
}