import { fromJS, Map } from 'immutable';

import * as constants from '../../actions/constants';
import { guid } from '../../utils/misc';

export const initialState = fromJS({
    list: {
        data: {},
        loading: false,
        error: null,
    },
});

export default function detailReducer (state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_DETAIL_REQUEST:
            return state.setIn(['user', 'loading'], true);

        case constants.FETCH_DETAIL_SUCCESS: {
            const payload = Map({
                ...action.data,
                key: guid(),
            });
            return state
                .setIn(['list', 'data'], payload)
                .setIn(['list', 'loading'], false);
        }

        case constants.FETCH_DETAIL_FAILURE:
            return state
                .setIn(['list', 'error'], action.error)
                .setIn(['list', 'loading'], false);

        case constants.RESET_DETAIL_STATE:
            return initialState;
        default:
            return state;
    }
}
