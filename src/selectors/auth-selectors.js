import { createSelector } from 'reselect';
import { initialState } from '../reducers/auth-reducer';

const selectLoginState = state => state.get('auth', initialState);

const makeSelectLoading = () => createSelector(
    selectLoginState, state => state.getIn(['user', 'loading']));

const makeSelectData = () => createSelector(
    selectLoginState, state => state.getIn(['user', 'data']));

const makeSelectError = () => createSelector(
    selectLoginState, state => state.getIn(['user', 'error']));

export { selectLoginState, makeSelectLoading, makeSelectData, makeSelectError };
