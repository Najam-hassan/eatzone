import { fromJS, Map } from 'immutable';

import * as constants from '../../actions/constants';
import { guid } from '../../utils/misc';

export const initialState = fromJS({
    resturant: {
        data: {},
        loading: false,
        error: null,
    },
});

export default function profileReducer (state = initialState, action) {
    switch (action.type) {
        case constants.UPDATE_RESATURANT_PROFILE_REQUEST:
            return state.setIn(['resturant', 'loading'], true);

        case constants.UPDATE_RESATURANT_PROFILE_SUCCESS: {
            const payload = Map({
                ...action.profile,
                key: guid(),
            });
            return state.setIn(['resturant', 'data'], payload)
                .setIn(['resturant', 'loading'], false);
        }

        case constants.UPDATE_RESATURANT_PROFILE_FAILURE:
            return state.setIn(['resturant', 'error'], action.error)
                .setIn(['resturant', 'loading'], false);

        case constants.RESET_RESATURANT_PROFILE_STATE:
            return initialState;
        default:
            return state;
    }
}
