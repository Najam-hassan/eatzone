import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { Header } from '../components/common/header';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Profile'}
                />
                <Text>User Profile details will be here!!!!</Text>
            </View>
        )
    }
}

export default ProfileScreen 