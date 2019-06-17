import { createSelector } from 'reselect';
import { initialState } from '../../reducers/restaurant-reducers/profile-reducer';

const selectRestaurantProfileState = state => state.get('resturantProfile', initialState);

const makeSelectProfileLoading = () => createSelector(
    selectRestaurantProfileState, state => state.getIn(['resturant', 'loading'])
);

const makeSelectProflieData = () => createSelector(
    selectRestaurantProfileState, state => state.getIn(['resturant', 'data']).toJS()
);

const makeSelectError = () => createSelector(
    selectRestaurantProfileState, state => state.getIn(['resturant', 'error'])
);

export {
    makeSelectError,
    makeSelectProflieData,
    makeSelectProfileLoading,
    selectRestaurantProfileState,
};
