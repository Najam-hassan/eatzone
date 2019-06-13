import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';

import { PageHeader } from '../components/common/header';
import ItemDetailContainer from '../containers/item-details-container'

class ItemDetailScreen extends Component {
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
                    title={'Item Details'}
                />
                <View style={styles.imageContainer}>
                    <Image source={params.item.image} style={styles.bannerStyle} />
                </View>
                <View style={styles.dataContainer}>
                    <ItemDetailContainer detail />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 0.4,
        marginBottom: -15,
    },
    bannerStyle: {
        width: '100%',
        height: '100%',
    },
    dataContainer: {
        flex: 0.6,
        backgroundColor: 'red',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
})

export default ItemDetailScreen 