import React, { Component } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';

import MenuItemForm from '../forms/menu-item-form';
import { PageHeader } from '../../components/common/header';

class AddMenuItemScreen extends Component {
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
                        categoryId={params.catId}
                        navigation={this.props.navigation}
                        itemId={params ? params.itemId : null}
                        imageUrl={params ? params.imageUrl : null}
                    />
                </ScrollView>
            </View>
        )
    }
}

export default AddMenuItemScreen 