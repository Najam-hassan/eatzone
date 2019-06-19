import React, { Component } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';

import MenuItemForm from '../forms/menu-item-form';
import { PageHeader } from '../../components/common/header';

class TestScreen extends Component {
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
                    title={'Add Menu Item'}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <MenuItemForm
                        navigation={this.props.navigation}
                        categoryId={params.catId}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default TestScreen 