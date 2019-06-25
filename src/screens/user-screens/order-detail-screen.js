import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

import { PageHeader } from '../../components/common/header';

class OrderDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderSubTotals = () => {
        return (
            <View style={styles.subTotalOrder}>
                <View style={styles.innerViewStyle}>
                    <Text style={{ color: '#cccccc', fontWeight: '400' }}>SubTotal</Text>
                    <View style={styles.priceStyle}>
                        <Text style={{ color: '#cccccc', fontWeight: '400', }}>
                            $20
                        </Text>
                    </View>
                </View>

                <View style={styles.innerViewStyle}>
                    <Text style={{ color: '#cccccc', fontWeight: '400' }}>Delivery Fee</Text>
                    <View style={styles.priceStyle}>
                        <Text style={{ color: '#cccccc', fontWeight: '400' }}>
                            $13
                        </Text>
                    </View>
                </View>

                <View style={styles.innerViewStyle}>
                    <Text style={{ color: '#cccccc', fontWeight: '400' }}>Dine in Fee</Text>
                    <View style={styles.priceStyle}>
                        <Text style={{ color: '#cccccc', fontWeight: '400', }}>
                            $10
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render () {
        return (
            <View style={{ flex: 1, backgroundColor: '#EBEBEB' }}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Order Details'}
                />
                <View style={styles.container}>
                    <View style={styles.orderContainer}>
                        <View>
                            <Text style={styles.titleText}>Order No: A234</Text>
                            <Text>Order Date: June 19 2019, 12:00:00 AM</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1 }} />
                        <View>
                            <Text style={styles.titleText}>Order Details</Text>
                            <View styles={{ flexDirection: 'column' }}>
                                <View style={styles.itemDetailsStyle}>
                                    <Text>Cheese Burger</Text>
                                    <Text>Qty: 2</Text>
                                </View>
                                <View style={styles.itemDetailsStyle}>
                                    <Text>Fish Burger</Text>
                                    <Text>Qty: 2</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 1 }} />
                    </View>
                    {this.renderSubTotals()}
                </View>
                <Text>Order Details Will be here</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    orderContainer: {
        marginVertical: 15,
        marginHorizontal: 15,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    titleText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400'
    },
    itemDetailsStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    subTotalOrder: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#e2e1e7',
    },
    innerViewStyle: {
        marginVertical: 3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceStyle: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
});

export default OrderDetailScreen 