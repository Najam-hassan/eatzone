import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
} from 'react-navigation';

import MainApp from './MainApp';
// App Screens (Commons Screens)
import HomeScreen from './screens/common/home-screen';
import SignInScreen from './screens/common/signin-screen';
import SignUpScreen from './screens/common/signup-screen';
import WelcomeScreen from './screens/common/welcome-screen';
import ForgotPasswordScreen from './screens/common/forget-password-screen';

// Auth Screens (Users Screens)
import TestScreen from './screens/test-screen';
import OrderScreen from './screens/user-screens/orders-screen';
import ProfileScreen from './screens/user-screens/profile-screen';
import ItemDetailScreen from './screens/user-screens/item-details-screen';
import RestaurantsScreen from './screens/user-screens/near-by-restaurants';
import RestaurantDetailScreen from './screens/user-screens/restaurant-detsils-screen';

// Auth Screens (Restaurant Screens)
import CategoryScreen from './screens/restutant-screens/category-screen';
import MenuItemsScreen from './screens/restutant-screens/menu-items-screen';
import CreateItemScreen from './screens/restutant-screens/add-menu-item-screen';
import RecentOrdersScreen from './screens/restutant-screens/recent-orders-screen'
import RestaurantProfile from './screens/restutant-screens/restaurant-details-screen';
import CompletedOrdersScreen from './screens/restutant-screens/completed-orders-screen';

// Side Drawer (Side Navigation component)
import SidebarMenu from './components/common/sidebar-menu';

const AuthStack = createStackNavigator({
    // Common Screens will goo here
    HomeScreen: HomeScreen,
    TestScreen: TestScreen,

    // User Screens will go here
    OrderScreen: OrderScreen,
    ProfileScreen: ProfileScreen,
    ItemDetailScreen: ItemDetailScreen,
    RestaurantsScreen: RestaurantsScreen,
    RestaurantDetailScreen: RestaurantDetailScreen,

    //Restaurants screens will go here
    CategoryScreen: CategoryScreen,
    MenuItemsScreen: MenuItemsScreen,
    CreateItemScreen: CreateItemScreen,
    RestaurantProfile: RestaurantProfile,
    RecentOrdersScreen: RecentOrdersScreen,
    CompletedOrdersScreen: CompletedOrdersScreen,
}, {
        headerMode: 'none',
        initialRouteName: 'HomeScreen',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#edebed',
            }
        }
    }
);

const Drawerstack = createDrawerNavigator({
    AuthStack: AuthStack,
}, {
        contentComponent: SidebarMenu,
    }
);

const Dashboard = createStackNavigator({
    Drawerstack: Drawerstack,
}, { headerMode: 'none' });

const LoginStack = createStackNavigator({
    WelcomeScreen: WelcomeScreen,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
    ForgotPasswordScreen: ForgotPasswordScreen,
}, { headerMode: 'none' });

// export default AppContainer = createAppContainer(Drawerstack);
export default AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: MainApp,
            App: Dashboard,
            Auth: LoginStack,
        },
        {
            initialRouteName: 'AuthLoading',
            transitionConfig: () => ({
                screenInterpolator: (sceneProps) => {
                }
            })
        }
    )
);
