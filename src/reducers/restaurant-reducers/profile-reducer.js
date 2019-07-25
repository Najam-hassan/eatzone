import { fromJS, Map } from 'immutable';

import * as constants from '../../actions/constants';
import { guid } from '../../utils/misc';

export const initialState = fromJS({
    restaurant: {
        data: {},
        loading: false,
        error: null,
        updateSuccess: false,
    },
});

export default function profileReducer (state = initialState, action) {
    switch (action.type) {
        case constants.UPDATE_RESATURANT_PROFILE_REQUEST:
            return state.setIn(['restaurant', 'loading'], true);

        case constants.UPDATE_RESATURANT_PROFILE_SUCCESS: {
            const payload = Map({
                ...action.profile,
                key: guid(),
            });
            return state
                .setIn(['restaurant', 'data'], payload)
                .setIn(['restaurant', 'loading'], false)
                .setIn(['restaurant', 'updateSuccess'], action.updating);
        }

        case constants.UPDATE_RESATURANT_PROFILE_FAILURE:
            return state.setIn(['restaurant', 'error'], action.error)
                .setIn(['restaurant', 'loading'], false);

        case constants.RESET_RESATURANT_PROFILE_STATE:
            return initialState;
        default:
            return state;
    }
}
