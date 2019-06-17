import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable'

import authReducer from './auth-reducer';
import homeReducer from './home-reducer';
import restaurantsReducer from './restaurents-reducer';

// Resturant Profile Owner 
import profileReducer from './restaurant-reducers/profile-reducer'

export default function index () {
    return combineReducers({
        form: formReducer,
        auth: authReducer,
        home: homeReducer,
        restaurants: restaurantsReducer,

        resturantProfile: profileReducer
    });
}
