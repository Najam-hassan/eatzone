import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View, Text, StatusBar, StyleSheet, Image, ActivityIndicator, FlatList
} from 'react-native';

import Button from '../../components/common/button';
import { Header } from '../../components/common/header';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

class RecentOrdersScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.props.fetchList();
    }

    calculateCost = items => {
        let total = 0;
        items.forEach(item => {
            total = item.itemQuantity * item.menu_item.price;
        });
        return total.toFixed(0);
    }

    renderOrderCard = ({ item, index }) => {
        return (
            <View style={styles.container}>
                <View style={styles.orderCardContainer}>
                    <View style={styles.detailsContainer}>
                        {item && item.user.avatarUrl ?
                            <Image
                                source={{ uri: item.user.avatarUrl }}
                                style={{ height: 60, width: 60, borderRadius: 25 }}
                            /> :
                            <Image
                                source={require('../../assets/images/account.png')}
                                style={{ height: 60, width: 60, borderRadius: 25 }}
                            />}
                        <View style={styles.nameContainer}>
                            <Text>{item.user && item.user.name || 'Name Here'}</Text>
                            <Text>{item.user.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.orderDetails}>
                        <Text>Order Id: {item.id}</Text>
                        <Text>Total: {this.calculateCost(item.order_items)}</Text>
                    </View>
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        title={'Call Customer'}
                        onPress={() => {
                            console.log('button pressed')
                        }}
                        style={styles.button}
                        textStyle={{ /* styles for button title */ }}
                    />
                    <Button
                        title={'View Details'}
                        onPress={() => {
                            const { navigation } = this.props;
                            navigation.navigate('ResturantOrderDetailsScreen', {
                                details: item
                            });
                        }}
                        style={[styles.button, {
                            borderWidth: 1,
                            borderColor: '#1BA2FC',
                            backgroundColor: '#fff',
                        }]}
                        textStyle={{ color: '#1BA2FC' }}
                    />
                </View>
            </View>
        )
    }

    render () {
        const { loading, collections, deliveries } = this.props;
        console.log(loading, '///////');
        console.log(collections, 'collection');
        console.log(deliveries, 'delivery');
        if (loading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
                    <StatusBar hidden={false} />
                    <Header
                        navigation={this.props.navigation}
                        title={'Recent Orders'}
                    />
                    <ActivityIndicator size={'large'} color={'#1BA2FC'} />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Recent Orders'}
                />
                {collections && collections.length ?
                    <FlatList
                        data={collections}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderOrderCard}
                    /> : <View style={styles.message}>
                        <Text style={[styles.title, { fontWeight: '400' }]}>
                            Menu Item not exsit, please create menu items.
                        </Text>
                    </View>
                }
                {/* {this.renderOrderCard()}
                {this.renderOrderCard()}
                {this.renderOrderCard()} */}
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
        width: '40%',
        color: 'gray',
        marginTop: 10,
        // lineHeight: 37,
        borderRadius: 50,
        textAlign: 'center',
        backgroundColor: '#1BA2FC',
    },
});

const mapStateToProps = state => ({
    collections: selectors.makeSelectCollectionOrderList()(state),
    deliveries: selectors.makeSelectDeliveryOrderList()(state),
    loading: selectors.makeSelectOrderListLoading()(state),
    error: selectors.makeSelectOrderListError()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        fetchList: () => dispatch(actions.fetchOrdersAction()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecentOrdersScreen); 