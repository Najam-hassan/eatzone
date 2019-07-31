import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Linking, Platform } from 'react-native';

import { calculateCost } from '../../utils/misc';
import Button from '../../components/common/button';

class OrdersContainer extends Component {

    renderOrderCard = ({ item, index }) => {
        return (
            <View
                key={`order-item-${index}`}
                style={styles.container}
            >
                <View style={styles.orderCardContainer}>
                    <View style={styles.detailsContainer}>
                        {item && item.user.avatarUrl ?
                            <Image
                                source={{ uri: item.user.avatarUrl }}
                                style={styles.imageStyle}
                            /> :
                            <Image
                                source={require('../../assets/images/account.png')}
                                style={{ height: 60, width: 60, borderRadius: 30 }}
                            />}
                        <View style={styles.nameContainer}>
                            <Text style={styles.userName}>{item.user && item.user.name || 'Name Here'}</Text>
                            <Text style={styles.userContact}>{item.user.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.orderDetails}>
                        <Text style={styles.userInfo}>Order Id: {item.id}</Text>
                        <Text style={styles.userInfo}>
                            Total: {calculateCost(item.order_items, item.deliveringRestaurant)}
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 20,
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 16, color: '#00000', fontWeight: '500' }}>
                            Restaurant Name: </Text>
                        <Text style={{ fontSize: 16, color: '#00000', fontWeight: '400' }}>
                            {item.deliveringRestaurant.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Text style={{ fontSize: 16, color: '#00000', fontWeight: '500' }}>Restaurant Address: </Text>
                        <Text style={{ fontSize: 16, color: '#00000', fontWeight: '400' }}>
                            {item.deliveringRestaurant.address}
                        </Text>
                    </View>
                </View>
                <View style={styles.actionContainer}>
                    <Button
                        title={'Call Customer'}
                        onPress={() => {
                            if (Platform.OS === 'android') {
                                Linking.openURL(`tel:${item.user.phone}`);
                            }
                            else {
                                const url = `telprompt:${item.user.phone}`;
                                Linking.canOpenURL(url)
                                    .then((supported) => {
                                        if (supported) {
                                            return Linking.openURL(url)
                                                .catch(() => null);
                                        }
                                    });
                                // Linking.openURL(`telprompt:${item.user.phone}`);
                            }
                        }}
                        style={[styles.button, {
                            backgroundColor: '#00a0ff',
                        }]}
                        textStyle={{ color: '#fff', fontSize: 14, fontWeight: '400', }}
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
                                borderColor: '#00a0ff',
                                backgroundColor: '#fff',
                            }]}
                            textStyle={{ color: '#00a0ff', fontSize: 14, fontWeight: '400', }}
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
                            Don't have any order yet.
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
        marginTop: 15,
        marginHorizontal: 15,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    orderCardContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#d9f1ff',
        justifyContent: 'space-between',
    },
    detailsContainer: {
        flex: .58,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        paddingLeft: 12,
        paddingRight: 4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#636363',
    },
    userName: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
    },
    userContact: {
        fontSize: 14,
        fontWeight: '400',
        color: '#5e5a5a',
        marginTop: 2,
        lineHeight: 20,
    },
    orderDetails: {
        flex: .42,
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
    },
    userInfo: {
        fontSize: 14,
        fontWeight: '400',
        color: '#5e5a5a',
        textAlign: 'right',
        lineHeight: 20,
    },
    actionContainer: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    button: {
        height: 40,
        width: '42%',
        marginHorizontal: 6,
        borderRadius: 50,
        textAlign: 'center',
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