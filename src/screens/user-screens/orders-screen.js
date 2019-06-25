import React, { Component } from 'react';
import {
    View, Text, StatusBar, TouchableOpacity, StyleSheet, Image
} from 'react-native';

import { Header } from '../../components/common/header';

class OrderScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderTaxes = () => {
        return (
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 20, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ flex: 8, color: 'grey', fontWeight: '400', }}>SubTotal</Text>
                    <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'grey', fontWeight: '700', }}>$10</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ flex: 8, color: 'grey', fontWeight: '400', }}>SubTotal</Text>
                    <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'grey', fontWeight: '700', }}>$10</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text numberOfLines={1} style={{ flex: 8, color: 'grey', fontWeight: '400', }}>SubTotal</Text>
                    <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'grey', fontWeight: '700', }}>$10</Text>
                    </View>
                </View>

            </View>
        )
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
                    <View style={styles.cardBodyStyle}>
                        <View style={styles.itemContents}>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#000' }}>
                                McDonald's
                        </Text>
                            <Text>Cheese Burger</Text>
                            <Text>Order Date: 19 June 2019</Text>
                        </View>
                        <View style={styles.orderStatus}>
                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                <Text>Order Status: </Text>
                                <View style={styles.statueText}>
                                    <Text style={{ color: '#fff' }}>
                                        Approved
                                </Text>
                                </View>
                            </View>
                            <Image
                                source={require('../../assets/images/call-icon.png')}
                                style={{ width: 30, height: 30, borderRadius: 15 }}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render () {
        return (
            <View style={{ flex: 1, backgroundColor: '#EBEBEB', }}>
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
        padding: 5,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15,
        backgroundColor: '#fff',
    },
    cardBodyStyle: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemContents: {
        flex: .5,
        paddingHorizontal: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    orderStatus: {
        flex: .5,
        paddingHorizontal: 5,
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    statueText: {
        borderRadius: 20,
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: '#169B50',
    }
});

export default OrderScreen
