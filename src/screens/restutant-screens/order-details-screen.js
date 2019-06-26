import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';

import Button from '../../components/common/button';
import { PageHeader } from '../../components/common/header';

import { calculateCost } from '../../utils/misc';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

class RecentOrdersScreen extends Component {

    state = { confirmed: false, canceled: false, completed: false }

    componentWillReceiveProps (nextProps) {
        if (nextProps.confirmed) {
            this.setState({ confirmed: true })
        }
        if (nextProps.canceled) {
            this.setState({ canceled: true })
        }
        if (nextProps.completed) {
            this.setState({ completed: true })
        }
    }

    renderOrderItems = item => {
        return (
            <View
                key={item.id}
                style={styles.orderItemContainer}
            >
                <Text>{item && item.menu_item.name || ''}</Text>
                <Text>Qty: {item && item.itemQuantity || ''}</Text>
                <Text>$ {item && item.menu_item.price || ''}</Text>
            </View>
        )
    }

    renderOrderCard = () => {
        const { params } = this.props.navigation.state;
        const { completed, confirmed, canceled } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.orderCardContainer}>
                    <View style={styles.detailsContainer}>
                        {params && params.details.user.avatarUrl ?
                            <Image
                                source={{ uri: params.details.user.avatarUrl }}
                                style={{ height: 60, width: 60, borderRadius: 25 }}
                            /> :
                            <Image
                                source={require('../../assets/images/account.png')}
                                style={{ height: 60, width: 60, borderRadius: 25 }}
                            />}
                        <View style={styles.nameContainer}>
                            <Text>{params.details.user.name}</Text>
                            <Text>{moment(params.details.createdAt).format("ddd, hA")}</Text>
                            {/* <Text>Location: Lahore</Text> */}
                        </View>
                    </View>
                    <View style={styles.orderDetails}>
                        <Text>Order Id: {params.details.id}</Text>
                        <Text>Total: {calculateCost(params.details.order_items)}</Text>
                    </View>
                </View>
                {params.details.order_items.map(item => (
                    this.renderOrderItems(item)
                ))}
                <View style={styles.actionContainer}>
                    <Button
                        title={'Call Customer'}
                        onPress={() => {
                            console.log('button pressed')
                        }}
                        style={styles.button}
                        textStyle={{ /* styles for button title */ }}
                    />
                    {!confirmed && params.details.orderStatus === 'PENDING' ? <Button
                        title={'Cancel Order'}
                        onPress={() => {
                            const { details } = params;
                            this.props.updateOrder(
                                `/restaurant/cancel-order/${details.id}`, 'canceled'
                            );
                        }}
                        style={[styles.button, {
                            borderWidth: 1,
                            borderColor: '#ff0000',
                            backgroundColor: '#fff',
                        }]}
                        textStyle={{ color: '#ff0000' }}
                    /> : null}
                    {!confirmed && params.details.orderStatus === 'PENDING' ? <Button
                        title={'Accept Order'}
                        onPress={() => {
                            const { details } = params;
                            this.props.updateOrder(
                                `/restaurant/confirm-order/${details.id}`, 'accepted'
                            );
                        }}
                        style={[styles.button, {
                            borderWidth: 1,
                            borderColor: '#3C9238',
                            backgroundColor: '#fff',
                        }]}
                        textStyle={{ color: '#3C9238' }}
                    /> : null}
                    {!confirmed && params.details.orderStatus === 'CONFIRMED' ? <Button
                        title={'Complete Order'}
                        onPress={() => {
                            const { details } = params;
                            this.props.updateOrder(
                                `/restaurant/complete-order/${details.id}`, 'completed'
                            );
                        }}
                        style={[styles.button, {
                            width: '40%',
                            borderWidth: 1,
                            borderColor: '#3C9238',
                            backgroundColor: '#fff',
                        }]}
                        textStyle={{ color: '#3C9238' }}
                    /> : null}
                </View>
            </View>
        )
    }

    render () {
        return (
            <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Order Details'}
                />
                {this.renderOrderCard()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 20,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    orderCardContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        alignItems: 'flex-start',
        borderTopRightRadius: 10,
        backgroundColor: '#DAF0FD',
        justifyContent: 'space-between',
    },
    detailsContainer: {
        flex: .6,
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    nameContainer: {
        paddingHorizontal: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    orderDetails: {
        flex: .4,
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    actionContainer: {
        width: '100%',
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    button: {
        height: 45,
        width: '30%',
        color: 'gray',
        marginTop: 10,
        // lineHeight: 37,
        borderRadius: 50,
        textAlign: 'center',
        backgroundColor: '#1BA2FC',
    },
    orderItemContainer: {
        padding: 8,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
});

const mapStateToProps = state => ({
    confirmed: selectors.makeSelectConfirmed()(state),
    completed: selectors.makeSelectCompleted()(state),
    canceled: selectors.makeSelectCanceled()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        updateOrder: (url, type) => {
            dispatch(actions.updateOrderStatusAction(url));
            dispatch(actions.updateLocally(type));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecentOrdersScreen); 