import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createDrawerNavigator,
} from 'react-navigation';

import MainApp from './MainApp';
// App Screens
import WelcomeScreen from './screens/welcome-screen';
import SignInScreen from './screens/signin-screen';
import SignUpScreen from './screens/signup-screen';

// Auth screens
import TestScreen from './screens/test-screen';
import HomeScreen from './screens/home-screen';
import OrderScreen from './screens/orders-screen';
import ProfileScreen from './screens/profile-screen';
import RestaurantsScreen from './screens/near-by-restaurants';

import SidebarMenu from './components/common/sidebar-menu';

const AuthStack = createStackNavigator({
    HomeScreen: HomeScreen,
    TestScreen: TestScreen,
    OrderScreen: OrderScreen,
    ProfileScreen: ProfileScreen,
    RestaurantsScreen: RestaurantsScreen,
}, {
        headerMode: 'none',
        initialRouteName: 'RestaurantsScreen',
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


const LoginStack = createStackNavigator({
    WelcomeScreen: WelcomeScreen,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
}, { headerMode: 'none' });

// export default AppContainer = createAppContainer(Drawerstack);
export default AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: MainApp,
            App: Drawerstack,
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
