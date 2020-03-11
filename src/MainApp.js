import { connect } from 'react-redux';
import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import Switcher from './Switcher'
import * as constants from './actions/constants';

class MainApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.verifyUser();
    OneSignal.setLogLevel(7, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.init("f63350e4-f498-494f-9a3d-6d691518b83c", { kOSSettingsKeyInFocusDisplayOption: 1 });
  }

  async componentDidMount() {
    await OneSignal.userProvidedPrivacyConsent();
    OneSignal.provideUserConsent(true);
    OneSignal.addEventListener("opened", this.onOpened.bind(this));
    OneSignal.addEventListener("received", this.onReceived.bind(this));
    OneSignal.inFocusDisplaying(2);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("received", this.onReceived);
    // OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log(notification);
  }

  async onOpened(openResult) {
    const { navigation } = this.props;
    const userData = await AsyncStorage.getItem('userRes') || null;
    const user = JSON.parse(userData);
    console.log('userRes====>>>>', user);
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    const details = openResult.notification.payload.additionalData;
    console.log(details);
    if (details) {
      AsyncStorage.getItem("user_type")
        .then((value) => {
          if (value === 'user') {
            console.log('notttttttt User: ', details);
            navigation.navigate('OrderScreen');
          } else if (value === 'admin') {
            console.log('notttttttt Admin: ', details);
            this.props.dispatch({
              type: constants.RESET_RESTAURANT_ORDERS_STATE,
            });
            if (openResult.notification.payload.body.includes('has been cancelled by Ordering restaurant')) {
              console.log('Order cancel detected');
              navigation.navigate('CompletedOrdersScreen');
              console.log('Moved to completed orders screen')
            }
            else {
              navigation.navigate('ResturantOrderDetailsScreen', {
                isNotif: true,
                userRes: user,
                details: details && (details.newOrder ? details.newOrder : (details.updatedNewMenuOrder ? details.updatedNewMenuOrder : {})),
                orderConfirmed: details.orderConfirmed
              });
            }
          }
        }).catch(e => console.log(e));
    }
  }
  verifyUser = async () => {
    // const user = await AsyncStorage.getItem('user');
    // this.props.navigation.navigate(user ? 'App' : 'Auth');

    this.props.navigation.navigate('Switcher');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default connect(null, null)(MainApp);
