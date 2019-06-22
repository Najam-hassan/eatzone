import { fromJS, List, Map } from 'immutable';

import { guid } from '../../utils/misc';
import * as constants from '../../actions/constants';

export const initialState = fromJS({
    list: {
        data: [],
        loading: false,
        error: null,
    },
    restaurant: { selectedId: '' }
});

export default function homeReducer (state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_LIST_REQUEST:
            return state.setIn(['list', 'loading'], true);

        case constants.FETCH_LIST_SUCCESS: {
            const payload = List(
                action.data.map(item =>
                    Map({
                        ...item,
                        key: guid(),
                    }),
                ),
            );
            return state.setIn(['list', 'data'], payload)
                .setIn(['list', 'loading'], false);
        }

        case constants.FETCH_LIST_FAILURE:
            return state.setIn(['list', 'error'], action.error)
                .setIn(['list', 'loading'], false);

        case constants.SET_COLLECTING_RESTAURANT:
            return state.setIn(['restaurant', 'selectedId'], action.selectedId);

        case constants.RESET_LIST_STATE:
            return initialState;
        default:
            return state;
    }
}