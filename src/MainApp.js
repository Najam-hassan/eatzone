import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';

class MainApp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.verifyUser();
    }

    verifyUser = async () => {
        const user = await AsyncStorage.getItem('user');
        console.log('user: ', user);
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
