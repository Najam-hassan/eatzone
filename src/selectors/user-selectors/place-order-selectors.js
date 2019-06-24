import { createSelector } from 'reselect';
import { initialState } from '../../reducers/user-reducers/place-order-reducer';

const selectPlaceOrderState = state => state.get('placeOrderReducer', initialState);

const makeSelectProfileLoading = () => createSelector(
    selectPlaceOrderState, state => state.getIn(['list', 'loading'])
);

const makeSelectProfileData = () => createSelector(
    selectPlaceOrderState, state => state.getIn(['list', 'data']).toJS()
);

const makeSelectProfileError = () => createSelector(
    selectPlaceOrderState, state => state.getIn(['list', 'error'])
);

const makeSelectUpdateStatue = () => createSelector(
    selectPlaceOrderState, state => state.getIn(['list', 'success'])
);

export {
    selectPlaceOrderState,
    makeSelectProfileData,
    makeSelectUpdateStatue,
    makeSelectProfileError,
    makeSelectProfileLoading,
};
