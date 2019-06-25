import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    View, Text, StatusBar, TouchableOpacity, StyleSheet,
    Image, ActivityIndicator, FlatList
} from 'react-native';

import { Header } from '../../components/common/header';
import * as actions from '../../actions/user-actions/order-list-actions';
import * as selectors from '../../selectors/user-selectors/order-list-selectors';

class OrderScreen extends Component {

    state = {};

    componentDidMount () {
        this.props.fetchList();
    }

    renderOrderCard = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    const { navigation } = this.props;
                    console.log(navigation);
                    navigation.navigate('OrderDetailScreen', {
                        details: item
                    })
                }}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.itemContentsHead}>
                        <Text style={styles.hotelName}>
                            {item.deliveringRestaurant.name}
                        </Text>
                        <View style={styles.orderStatus}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>
                                <Text style={{ color: '#222222', fontSize: 13, fontWeight: '400', }}>Order Status: </Text>
                                <View style={[styles.statueText, {
                                    backgroundColor:
                                        item.orderStatus === 'PENDING' ?
                                            '#ff0000' : '#00a651'
                                }]}>
                                    <Text style={{ color: '#fff', fontSize: 12, }}>
                                        {item.orderStatus}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ color: '#cccccc', fontSize: 14, fontWeight: '400', }}>Cheese Burger</Text>
                    <View style={styles.contentMain}>
                        <Text style={{ color: '#000000', fontSize: 14, fontWeight: '400', }}>
                            Order Date: {moment(item.createdAt).format('LL')}
                        </Text>
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
        const { loading, list } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: '#e4e4e4', }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'My Orders'}
                />
                {loading ?
                    <ActivityIndicator
                        size={'large'}
                        color={'#1BA2FC'}
                    /> : list && list.length ?
                        <FlatList
                            data={list}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderOrderCard}
                        /> : <View>
                            <Text>You haven't placed any order yet!!</Text>
                        </View>
                }
                {/* {this.renderOrderCard()} */}
                {/* {this.renderOrderCard()} */}
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

const mapStateToProps = state => ({
    list: selectors.makeSelectOrderList()(state),
    error: selectors.makeSelectOrderListError()(state),
    loading: selectors.makeSelectOrderListLoading()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        fetchList: () => dispatch(actions.fetchOrdersAction()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderScreen);