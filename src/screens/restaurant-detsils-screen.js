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
                <View style={{ flex: 0.35 }}>
                    <ImageBackground
                        source={params.restaurant.image}
                        style={styles.backgroundImage}
                    >
                        <View style={[styles.overlay, { bottom: -40 }]}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }} />
                            <View style={styles.detailStyle}>
                                <View>
                                    <Text style={styles.titleStyle}>
                                        {params.restaurant.name}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.serviceChargeText}>
                                        Service Charges: {params.restaurant.charges}
                                    </Text>
                                    <Text style={{ color: "#fff", marginTop: 10 }}>
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
                    {/* {Object.keys(params.restaurant.menu).map(key => (
                        <RestaurantDetail
                            categoryName={key}
                            list={params.restaurant.menu[key]}
                        />
                    ))} */}
                    <RestaurantDetail
                        data={params.restaurant.menu}
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
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-between',
    },
    itemContainer: {
        flex: 0.65,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#FEFFFF',
    },
    serviceChargeText: {
        fontSize: 16,
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