import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable'

import authReducer from './auth-reducer';

//User 
import homeReducer from './user-reducers/home-reducer';
import userProfileReducer from './user-reducers/profile-reducer';
import restaurantsReducer from './user-reducers/restaurents-reducer';
import restaurantDetailReducer from './user-reducers/resturant-detail-reducer';

// Restaurant
import categoryList from './restaurant-reducers/home-reducer';
import profileReducer from './restaurant-reducers/profile-reducer';
import categoryReducer from './restaurant-reducers/category-reducer';
import categoryItemReducer from './restaurant-reducers/category-item-reducer';

export default function index () {
    return combineReducers({
        form: formReducer,
        auth: authReducer,

        home: homeReducer,
        restaurants: restaurantsReducer,
        userProfile: userProfileReducer,
        restaurantDetail: restaurantDetailReducer,

        restaurantProfile: profileReducer,
        restaurantCategories: categoryList,
        restaurantCategory: categoryReducer,
        categoryItemReducer: categoryItemReducer
    });
}
