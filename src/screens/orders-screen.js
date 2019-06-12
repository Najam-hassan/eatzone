import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { Header } from '../components/common/header';

class OrderScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'My Orders'}
                />
                <Text>Recent orders will dispaly here!!!!</Text>
            </View>
        )
    }
}

export default OrderScreen 