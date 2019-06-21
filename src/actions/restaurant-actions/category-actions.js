import axios from 'axios';
import * as constants from '../constants';
import { fetchCategoryListAction } from './home-actions';

export function addCategoryRequest () {
    return {
        type: constants.ADD_CATEGORY_REQUEST,
    }
}

export function addCategorySuccess (category) {
    return {
        type: constants.ADD_CATEGORY_SUCCESS,
        category,
    }
}

export function addCategoryFailure (error) {
    return {
        type: constants.ADD_CATEGORY_FAILURE,
        error,
    }
}

export function addCategoryLocally (category) {
    return {
        type: constants.ADD_CATEGORY_LOCALLY,
        category,
    }
}

export function resetState () {
    return {
        type: constants.RESET_CATEGORY_STATE,
    }
}

export function addCategoryAction (data) {
    return dispatch => {
        dispatch(addCategoryRequest());
        return axios.post(`/restaurant/menu-category`, data)
            .then(response => {
                dispatch(addCategorySuccess(response.data));
                dispatch(addCategoryLocally(response.data));
                dispatch(fetchCategoryListAction());
            })
            .catch(error => {
                dispatch(addCategoryFailure(error.response.data));
            });
    }
}
