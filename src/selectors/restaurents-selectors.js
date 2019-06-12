import { createSelector } from 'reselect';
import { initialState } from '../reducers/home-reducer';

const selectRestaurantsState = state => state.get('restaurants', initialState);

const makeSelectLoading = () => createSelector(
    selectRestaurantsState, state => state.getIn(['list', 'loading']));

const makeSelectData = () => createSelector(
    selectRestaurantsState, state => state.getIn(['list', 'data']).toJS());

const makeSelectError = () => createSelector(
    selectRestaurantsState, state => state.getIn(['list', 'error']));

export { selectRestaurantsState, makeSelectLoading, makeSelectData, makeSelectError };
