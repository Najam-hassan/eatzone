import { fromJS, List, Map } from 'immutable';
import moment from 'moment';

import { guid } from '../../utils/misc';
import * as constants from '../../actions/constants';

export const initialState = fromJS({
  list: {
    data: [],
    loading: false,
    error: null,
  },
  restaurant: { collectingResturant: {}, deliveryResturant: {} }
});

export default function homeReducer (state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_LIST_REQUEST:
      return state.setIn(['list', 'loading'], true);

    case constants.FETCH_LIST_SUCCESS: {
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

    case constants.FETCH_LIST_FAILURE:
      return state.setIn(['list', 'error'], action.error)
        .setIn(['list', 'loading'], false);

    case constants.SET_COLLECTING_RESTAURANT:
      return state.setIn(['restaurant', 'collectingResturant'], Map({
        ...action.restaurant,
        key: action.restaurant.id
      }));

    case constants.SET_DELIVERY_RESTAURANT:
      return state.setIn(['restaurant', 'deliveryResturant'], Map({
        ...action.restaurant,
        key: action.restaurant.id
      }));

    case constants.RESET_LIST_STATE:
      return initialState;
    default:
      return state;
  }
}
