import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Header } from '../../components/common/header';

class OrderScreen extends Component {
    constructor(props) {
        super(props);
    }

    renderItem = () => {
        return (


            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', borderBottomColor: 'grey', borderBottomWidth: 1, paddingBottom: 20, paddingHorizontal: 10, paddingVertical: 20, }}>
                <View style={{ flex: 1, }}>
                    <TouchableOpacity style={styles.radioBtnContainer}>
                        {
                            true ?
                                <View style={styles.radioBtn} />
                                : null
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 9, }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 8, color: '#000', fontSize: 16, fontWeight: '700', }}>Veg Mac</Text>
                        <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Text style={{ color: '#000', fontWeight: '700', }}>$10</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: 'grey', marginTop: 2 }}>Meal (L)</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ flex: 7, color: 'grey', }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TouchableOpacity>
                                <Text style={styles.blueBtn}> + </Text>
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: 10 }}>2</Text>
                            <TouchableOpacity>
                                <Text style={styles.blueBtn}> - </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        )
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'My Orders'}
                />
                <View style={{ backgroundColor: 'grey', padding: 10 }}>
                    <View style={{ borderRadius: 5, backgroundColor: '#fff' }}>
                        {this.renderItem()}
                        {this.renderItem()}
                        {this.renderTaxes()}
                        <View style={{ paddingHorizontal: 10, paddingVertical: 20, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ flex: 8, color: '#000', fontSize: 16, fontWeight: '700', }}>Total</Text>
                                <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                    <Text style={{ color: '#000', fontWeight: '700', }}>$50</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    blueBtn: {
        backgroundColor: '#00a0ff',
        height: 24,
        width: 24,
        borderRadius: 24,
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        lineHeight: 24
    },
    radioBtn: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#00a0ff',
    },
    radioBtnContainer: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default OrderScreen
