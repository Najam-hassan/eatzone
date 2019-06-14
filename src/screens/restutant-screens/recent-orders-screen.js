import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { Header } from '../../components/common/header';

class RecentOrdersScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Recent Orders'}
                />
                <Text>Recent Orders will go here!!!!</Text>
            </View>
        )
    }
}

export default RecentOrdersScreen 