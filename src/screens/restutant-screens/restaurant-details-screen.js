import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import { Header } from '../../components/common/header';

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
                <Text>Restaurent Detail will go here!!!!</Text>
            </View>
        )
    }
}

export default ResturantDetails 