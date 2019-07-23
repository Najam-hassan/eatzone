import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import {
    View, Text, StatusBar, TouchableOpacity, StyleSheet,
    Image, ActivityIndicator, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Header } from '../../components/common/header';
import * as actions from '../../actions/user-actions/order-list-actions';
import * as selectors from '../../selectors/user-selectors/order-list-selectors';
import { Linking } from 'react-native'
class OrderScreen extends Component {

    state = {};

    componentDidMount() {
        this.props.fetchList();
    }

    renderOrderCard = ({ item, index }) => {
        return (

            <View style={styles.cardContainer}>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        const { navigation } = this.props;
                        navigation.navigate('OrderDetailScreen', {
                            details: item
                        })
                    }}
                >
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
                </TouchableOpacity>
                {/* <Text style={{ color: '#cccccc', fontSize: 14, fontWeight: '400', }}>Cheese Burger</Text> */}
                <View style={styles.contentMain}>
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: '400', }}>
                        Order Date: {moment(item.createdAt).format('LL')}
                    </Text>
                    <View style={styles.orderFind}>
                        {/* <Image
                                source={require('../../assets/images/call-icon.png')}
                                style={{ width: 18, height: 18, borderRadius: 15 }}
                            /> */}

                        <TouchableOpacity
                            onPress={() => {
                                console.log('button pressed');
                                Linking.openURL(`tel:${item.deliveringRestaurant.phone}`)
                            }}
                        >
                            <Icon name="phone-call" size={18} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { loading, list } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'My Orders'}
                />
                <NavigationEvents
                    onWillFocus={payload => {
                        console.log('will focus', payload)
                        this.props.fetchList();
                    }}
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
        marginRight: -2,
    },
    contentMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    }
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