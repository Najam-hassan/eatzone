import { createSelector } from 'reselect';
import { initialState } from '../../reducers/restaurant-reducers/order-list-reducer';

const selectOrderListState = state => state.get('restaurantOrderList', initialState);

const makeSelectOrderListLoading = () => createSelector(
    selectOrderListState, state => state.getIn(['orders', 'loading'])
);

const makeSelectDeliveryOrderList = () => createSelector(
    selectOrderListState, state => state.getIn(['orders', 'deliveries']).toJS()
);

const makeSelectCollectionOrderList = () => createSelector(
    selectOrderListState, state => state.getIn(['orders', 'collections']).toJS()
);

const makeSelectOrderListError = () => createSelector(
    selectOrderListState, state => state.getIn(['orders', 'error'])
);

export {
    selectOrderListState,
    makeSelectOrderListError,
    makeSelectOrderListLoading,
    makeSelectDeliveryOrderList,
    makeSelectCollectionOrderList,
};
