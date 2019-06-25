import React, { Component } from 'react';
import {
    View, Text, StatusBar, TouchableOpacity, StyleSheet, Image
} from 'react-native';

import { Header } from '../../components/common/header';

class OrderScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderOrderCard = () => {
        return (
            <TouchableOpacity onPress={() => {
                const { navigation } = this.props;
                console.log(navigation);
                navigation.navigate('OrderDetailScreen', {
                    details: {}
                })

            }}>
                <View style={styles.cardContainer}>
                    <View style={styles.itemContentsHead}>
                        <Text style={styles.hotelName}>
                            McDonald's
                        </Text>
                        <View style={styles.orderStatus}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>
                                <Text style={{ color: '#222222', fontSize: 13, fontWeight: '400', }}>Order Status: </Text>
                                <View style={styles.statueText}>
                                    <Text style={{ color: '#fff', fontSize: 12, }}>
                                        Approved
                                </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ color: '#cccccc', fontSize: 14, fontWeight: '400', }}>Cheese Burger</Text>
                    <View style={styles.contentMain}>
                        <Text style={{ color: '#000000', fontSize: 14, fontWeight: '400', }}>Order Date: 19 June 2019</Text>
                        <View style={styles.orderFind}>
                            <Image
                                source={require('../../assets/images/call-icon.png')}
                                style={{ width: 20, height: 20, borderRadius: 15 }}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render () {
        return (
            <View style={{ flex: 1, backgroundColor: '#e4e4e4', }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'My Orders'}
                />
                {this.renderOrderCard()}
                {this.renderOrderCard()}
                {this.renderOrderCard()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        padding: 12,
        borderRadius: 10,
        marginTop: 15,
        marginHorizontal: 15,
        backgroundColor: '#fff',
    },
    itemContentsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 4,
    },
    hotelName: {
        flex: 0.5,
        fontSize: 16,
        color: '#000',
        lineHeight: 22,
        fontWeight: '400',
    },
    orderStatus: {
        flex: .5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    statueText: {
        marginLeft: 6,
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 7,
        lineHeight: 18,
        backgroundColor: '#00a651',
    },
    contentMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default OrderScreen