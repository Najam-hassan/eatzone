import { createSelector } from 'reselect';
import { initialState } from '../../reducers/user-reducers/home-reducer';

const selectHomeState = state => state.get('home', initialState);

const makeSelectLoading = () => createSelector(
    selectHomeState, state => state.getIn(['list', 'loading'])
);

const makeSelectData = () => createSelector(
    selectHomeState, state => state.getIn(['list', 'data']).toJS()
);

const makeSelectError = () => createSelector(
    selectHomeState, state => state.getIn(['list', 'error'])
);

const makeSelectCollectingResturant = () => createSelector(
    selectHomeState, state => state.getIn(['restaurant', 'collectingResturant']).toJS()
);

const makeSelectdeliveryResturant = () => createSelector(
    selectHomeState, state => state.getIn(['restaurant', 'deliveryResturant']).toJS()
);

export {
    makeSelectData,
    selectHomeState,
    makeSelectError,
    makeSelectLoading,
    makeSelectdeliveryResturant,
    makeSelectCollectingResturant,
};
