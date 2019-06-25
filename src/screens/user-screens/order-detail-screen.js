import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { PageHeader } from '../../components/common/header';

class OrderDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Order Details'}
                />
                <Text>Order Details Will be here</Text>
            </View>
        )
    }
}

export default OrderDetailScreen 