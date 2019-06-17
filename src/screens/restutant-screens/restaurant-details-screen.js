import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { Header } from '../../components/common/header';
import ProfileForm from '../forms/restaurant-profile-form';

class ResturantDetails extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Restaurant Detail'}
                />
                <ProfileForm />
            </View>
        )
    }
}

export default ResturantDetails 