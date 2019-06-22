import { createSelector } from 'reselect';
import { initialState } from '../../reducers/restaurant-reducers/profile-reducer';

const selectRestaurantProfileState = state => state.get('restaurantProfile', initialState);

const makeSelectProfileLoading = () => createSelector(
    selectRestaurantProfileState, state => state.getIn(['restaurant', 'loading'])
);

const makeSelectProflieData = () => createSelector(
    selectRestaurantProfileState, state => state.getIn(['restaurant', 'data']).toJS()
);

const makeSelectError = () => createSelector(
    selectRestaurantProfileState, state => state.getIn(['restaurant', 'error'])
);

export {
    makeSelectError,
    makeSelectProflieData,
    makeSelectProfileLoading,
    selectRestaurantProfileState,
};