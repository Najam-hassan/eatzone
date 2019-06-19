import { createSelector } from 'reselect';
import { initialState } from '../reducers/auth-reducer';

const selectLoginState = state => state.get('auth', initialState);

const makeSelectLoading = () => createSelector(
    selectLoginState, state => state.getIn(['user', 'loading'])
);

const makeSelectData = () => createSelector(
    selectLoginState, state => state.getIn(['user', 'data'])
);

const makeSelectSignUpUser = () => createSelector(
    selectLoginState, state => state.getIn(['signUp', 'data'])
);

const makeSelectError = () => createSelector(
    selectLoginState, state => state.getIn(['user', 'error'])
);

const makeSelectAuthStatue = () => createSelector(
    selectLoginState, state => state.getIn(['user', 'failed'])
);

export {
    makeSelectData,
    makeSelectError,
    selectLoginState,
    makeSelectLoading,
    makeSelectAuthStatue,
    makeSelectSignUpUser,
};
