import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import { calculateCost } from '../../utils/misc';
import Button from '../../components/common/button';

class OrdersContainer extends Component {
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
                        <Text>Total: {calculateCost(item.order_items)}</Text>
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
                    {!this.props.isCollecting ?
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
                        /> : null
                    }
                </View>
            </View>
        )
    }

    render () {
        const { list } = this.props;
        return (
            <View style={[styles.scene]}>
                {list && list.length ?
                    <FlatList
                        data={list}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderOrderCard}
                    /> : <View style={styles.message}>
                        <Text style={[styles.title, { fontWeight: '400' }]}>
                            Dont have any order yet!.
                        </Text>
                    </View>
                }
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
    scene: {
        flex: 1,
        backgroundColor: '#e4e4e4'
    },
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000'
    },
});


export default OrdersContainer;