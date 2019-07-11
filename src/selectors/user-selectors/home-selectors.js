import _ from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from '../../reducers/user-reducers/home-reducer';

const selectHomeState = state => state.get('home', initialState);

const makeSelectLoading = () => createSelector(
    selectHomeState, state => state.getIn(['list', 'loading'])
);

const makeSelectData = () => createSelector(
    selectHomeState, state => state.getIn(['list', 'data']).toJS()
);

const makeSelectFilterData = () => createSelector(
    selectHomeState, state => {
        const restaurants = state.getIn(['list', 'data']).toJS();
        if (restaurants && restaurants.length > 0 &&
            restaurants[0].menu_categories && restaurants[0].menu_categories.length) {
            const list = _.flatMap(restaurants, category =>
                _(category.menu_categories)
                    .map(menuItems => {
                        if (menuItems.menu_items.length > 0) {
                            return ({
                                ...category
                            })
                        }
                    }).value()
            );
            const data = list.filter(row => row);
            return Array.from(new Set(data.map(a => a.id)))
                .map(id => data.find(a => a.id === id))
        } else {
            return restaurants;
        }
    }
)

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
    makeSelectFilterData,
    makeSelectdeliveryResturant,
    makeSelectCollectingResturant,
};
