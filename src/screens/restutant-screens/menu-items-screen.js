import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import Toast from 'react-native-easy-toast';

import { PageHeader } from '../../components/common/header';
import ItemContainer from '../../containers/restaurant-containers/items-container';

class MenuItemsScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { params } = this.props.navigation.state;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Menu Items'}
                />
                <ItemContainer
                    parent={this}
                    navigation={this.props.navigation}
                    items={params && params.items ? params.items : []}
                    catId={params.catId}
                />
                <Toast
                    ref="toast"
                    position='bottom'
                    fadeOutDuration={3000}
                    textStyle={{ color: '#fff' }}
                />
            </View>
        )
    }
}

export default MenuItemsScreen 