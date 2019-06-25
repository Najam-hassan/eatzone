import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';

import { PageHeader } from '../../components/common/header';

class OrderDetailScreen extends Component {

    state = { subTotal: 0 }

    componentDidMount () {
        const { params } = this.props.navigation.state;
        const subTotal = params.details.order_items.reduce((sum, item) => (
            sum + (item.itemQuantity * item.menu_item.price)
        ), 0);
        this.setState({ subTotal: subTotal })
    }

    renderSubTotals = () => {
        const { details } = this.props.navigation.state.params;
        return (
            <View style={styles.subTotalOrder}>
                <View style={styles.innerViewStyle}>
                    <Text style={{ color: '#cccccc', fontWeight: '400' }}>SubTotal</Text>
                    <View style={styles.priceStyle}>
                        <Text style={{ color: '#cccccc', fontWeight: '400', }}>
                            ${this.state.subTotal}
                        </Text>
                    </View>
                </View>

                <View style={styles.innerViewStyle}>
                    <Text style={{ color: '#cccccc', fontWeight: '400' }}>Delivery Fee</Text>
                    <View style={styles.priceStyle}>
                        <Text style={{ color: '#cccccc', fontWeight: '400' }}>
                            ${details.deliveringRestaurant.deliveryServiceCharges}
                        </Text>
                    </View>
                </View>

                {/* <View style={styles.innerViewStyle}>
                    <Text style={{ color: '#cccccc', fontWeight: '400' }}>Dine in Fee</Text>
                    <View style={styles.priceStyle}>
                        <Text style={{ color: '#cccccc', fontWeight: '400', }}>
                            $10
                        </Text>
                    </View>
                </View> */}
            </View>
        )
    }

    render () {
        const { params } = this.props.navigation.state;
        const { subTotal } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: '#ebebeb', }}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Order Details'}
                />
                <View style={styles.container}>
                    <View style={styles.orderContent}>
                        <View style={styles.orderNo}>
                            <Text style={styles.titleText}>Order No: {params.details.id}</Text>
                            <Text style={styles.descripText}>
                                Order Date: {moment(params.details.createdAt)
                                    .format(("dddd, MMMM, YYYY, h:mm:ss a"))}
                            </Text>
                        </View>
                        <View style={styles.orderDetail}>
                            <Text style={styles.titleText}>Order Details</Text>
                            <View styles={{ flexDirection: 'column' }}>
                                {params && params.details.order_items.map(item => (
                                    <View style={styles.itemDetailsStyle}>
                                        <Text style={styles.descripText}>
                                            {item.menu_item.name}
                                        </Text>
                                        <Text style={styles.descripText}>
                                            Qty: {item.itemQuantity}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        {this.renderSubTotals()}
                        <View style={styles.orderTotal}>
                            <Text style={styles.titleText}>Total</Text>
                            <Text style={styles.titleText}>
                                ${subTotal +
                                    params.details.deliveringRestaurant.deliveryServiceCharges}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    orderContent: {
        marginVertical: 15,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e1e7',
        borderRadius: 8,
    },
    orderNo: {
        borderBottomWidth: 1,
        borderBottomColor: '#e2e1e7',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    orderDetail: {
        borderBottomWidth: 1,
        borderBottomColor: '#e2e1e7',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    orderTotal: {
        paddingVertical: 15,
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        marginBottom: 2,
    },
    descripText: {
        fontSize: 14,
        color: '#cccccc',
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