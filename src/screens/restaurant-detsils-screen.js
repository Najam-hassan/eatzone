import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StatusBar, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import { Header } from '../components/common/header'
import RestaurantDetail from '../containers/restaurent-details-container'

const { width, height } = Dimensions.get('screen');

class RestaurantDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { params } = this.props.navigation.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Restaurant Detail'}
                />
                <View style={{ flex: 0.4 }}>
                    <ImageBackground
                        source={params.restaurant.image}
                        style={styles.backgroundImage}
                    >
                        <View style={[styles.overlay, {}]}>
                            <View style={{
                                flex: 1
                            }} />
                            <View style={styles.detailStyle}>
                                <View>
                                    <Text style={styles.titleStyle}>
                                        {params.restaurant.name}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Text style={styles.serviceChargeText}>
                                        Service Charges: {params.restaurant.charges}
                                    </Text>
                                    <Text style={{ color: "#fff", marginTop: 5 }}>
                                        <Icon
                                            name="map-marker"
                                            size={16} color="#fff"
                                        /> {params.restaurant.distance} miles away
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={[styles.itemContainer, { marginTop: -15 }]}>
                    <RestaurantDetail
                        data={params.restaurant.menu}
                        navigation={this.props.navigation}
                        list={Object.keys(params.restaurant.menu)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',

    },
    detailStyle: {
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        marginBottom: 25
    },
    itemContainer: {
        flex: 0.6,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#FEFFFF',
    },
    serviceChargeText: {
        color: '#fff',
        fontWeight: '300'
    },
    titleStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    }
})

export default RestaurantDetailScreen 