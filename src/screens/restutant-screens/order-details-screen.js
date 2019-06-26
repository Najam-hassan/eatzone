import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';

import Button from '../../components/common/button';
import { Header } from '../../components/common/header';

class RecentOrdersScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderOrderItems = () => {
        return (
            <View style={styles.orderItemContainer}>
                <Text>Spanish Omellete with cheese</Text>
                <Text>Qty: 2</Text>
                <Text>$ 203</Text>
            </View>
        )
    }

    renderOrderCard = () => {
        return (
            <View style={styles.container}>
                <View style={styles.orderCardContainer}>
                    <View style={styles.detailsContainer}>
                        <Image
                            source={require('../../assets/images/account.png')}
                            style={{ height: 60, width: 60, borderRadius: 25 }}
                        />
                        <View style={styles.nameContainer}>
                            <Text>Angel James</Text>
                            <Text>Today at 12pm</Text>
                            <Text>Location: Lahore</Text>
                        </View>
                    </View>
                    <View style={styles.orderDetails}>
                        <Text>Order Id: #35201</Text>
                        <Text>Total: $352</Text>
                    </View>
                </View>
                {this.renderOrderItems()}
                {this.renderOrderItems()}
                {this.renderOrderItems()}
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
                        title={'Cancel Order'}
                        onPress={() => {
                            console.log('button pressed')
                        }}
                        style={[styles.button, {
                            borderWidth: 1,
                            borderColor: '#ff0000',
                            backgroundColor: '#fff',
                        }]}
                        textStyle={{ color: '#ff0000' }}
                    />
                    <Button
                        title={'Accept Order'}
                        onPress={() => {
                            console.log('button pressed')
                        }}
                        style={[styles.button, {
                            borderWidth: 1,
                            borderColor: '#3C9238',
                            backgroundColor: '#fff',
                        }]}
                        textStyle={{ color: '#3C9238' }}
                    />
                </View>
            </View>
        )
    }

    render () {
        return (
            <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Recent Orders'}
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

export default RecentOrdersScreen 