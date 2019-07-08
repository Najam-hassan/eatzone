import { fromJS, List, Map } from 'immutable';

import * as constants from '../../actions/constants';
import { guid } from '../../utils/misc';

export const initialState = fromJS({
    list: {
        data: [],
        loading: false,
        error: null,
    },
});

export default function homeReducer (state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_RESTAURENTS_REQUEST:
            return state.setIn(['user', 'loading'], true);

        case constants.FETCH_RESTAURENTS_SUCCESS: {
            const payload = List(
                action.data.map(item => {
                    const date = new Date();
                    const isValid = item.deliverTimeEnd <= date.toLocaleTimeString() ||
                        item.deliverTimeStart >= date.toLocaleTimeString();
                    return (
                        Map({
                            ...item,
                            isValid: isValid,
                            key: guid(),
                        })
                    )
                }),
            );
            return state.setIn(['list', 'data'], payload)
                .setIn(['list', 'loading'], false);
        }

        case constants.FETCH_RESTAURENTS_FAILURE:
            return state.setIn(['list', 'error'], action.error)
                .setIn(['list', 'loading'], false);

        case constants.RESET_LIST_STATE:
            return initialState;
        default:
            return state;
    }
}
