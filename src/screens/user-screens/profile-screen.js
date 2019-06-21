import React, { Component } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';

import { Header } from '../../components/common/header';
import UserProfileForm from '../forms/user-profile-form';

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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <UserProfileForm navigation={this.props.navigation} />
                </ScrollView>
            </View>
        )
    }
}

export default ProfileScreen
