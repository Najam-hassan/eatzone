import { fromJS } from 'immutable';

import * as constants from '../actions/constants';

export const initialState = fromJS({
    user: {
        data: null,
        loading: false,
        error: null,
        failed: false,
    },
});

export default function authReducer (state = initialState, action) {
    switch (action.type) {
        case constants.USER_LOGIN_REQUEST:
            return state
                .setIn(['user', 'data'], null)
                .setIn(['user', 'loading'], true);
        case constants.USER_LOGIN_SUCCESS: {
            return state
                .setIn(['user', 'data'], action.user)
                .setIn(['user', 'loading'], false);
        }
        case constants.USER_LOGIN_FAILURE:
            return state
                .setIn(['user', 'error'], action.error)
                .setIn(['user', 'failed'], true)
                .setIn(['user', 'loading'], false);
        case constants.RESET_LOGIN_STATE:
            return initialState;
        default:
            return state;
    }
}
