import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import { View, StatusBar } from 'react-native';

import { Header } from '../../components/common/header';
import ProfileForm from '../forms/restaurant-profile-form';

class ResturantDetails extends Component {
    constructor(props) {
        super(props);
    }

    showToaster = message => {
        console.log(message)
        this.refs.toast.show(message, 2000);
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Restaurant Detail'}
                />
                <ProfileForm
                    showToaster={this.showToaster}
                    navigation={this.props.navigation}
                />
                <Toast ref="toast" />
            </View>
        )
    }
}

export default ResturantDetails 