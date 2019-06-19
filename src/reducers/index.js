import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable'

import authReducer from './auth-reducer';
import homeReducer from './home-reducer';
import restaurantsReducer from './restaurents-reducer';

// Resturant Profile Owner 
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

        resturantProfile: profileReducer,
        resturantCategories: categoryList,
        resturantCategory: categoryReducer,
        categoryItemReducer: categoryItemReducer
    });
}
