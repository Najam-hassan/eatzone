import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

class MainApp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.verifyUser();
        OneSignal.setLogLevel(7, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.init("f63350e4-f498-494f-9a3d-6d691518b83c", { kOSSettingsKeyAutoPrompt: true });

    }

    async componentDidMount () {
        await OneSignal.userProvidedPrivacyConsent();
        OneSignal.provideUserConsent(true);
        OneSignal.addEventListener("opened", this.onOpened.bind(this));
        OneSignal.inFocusDisplaying(2);
    }

    componentWillUnmount () {
        OneSignal.removeEventListener("opened", this.onOpened);
        OneSignal.removeEventListener("ids", this.onIds);
    }

    onOpened (openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);

        const details = openResult.notification.payload.additionalData;
        if (details) {
            AsyncStorage.getItem("user_type")
                .then((value) => {
                    const { navigation } = this.props;
                    if (value === 'user') {
                        navigation.navigate('OrderScreen');
                    } else if (value === 'admin') {
                        navigation.navigate('ResturantOrderDetailsScreen', {
                            details: details && details.newOrder ? details.newOrder : {},
                            orderConfirmed: details.orderConfirmed
                        });
                    }
                })
        }
    }

    verifyUser = async () => {
        const user = await AsyncStorage.getItem('user');
        this.props.navigation.navigate(user ? 'App' : 'Auth');
    };

    render () {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }
}

export default MainApp;
