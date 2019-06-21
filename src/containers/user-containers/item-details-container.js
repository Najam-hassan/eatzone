import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import RadioButton from '../../components/radio-button-component'

var radio_props = [
    { label: 'Pepsi', value: 0, price: 1 },
    { label: 'Mountain Dew', value: 1, price: 2 }
];

class ItemDetailsContainer extends Component {
    state = { value: null }
    render () {
        const { detail } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.headerText}>{detail.name ? detail.name : 'Some Name'}</Text>
                        <Text>${detail.price ? detail.price : 0}</Text>
                    </View>
                    <Text>
                        {detail.description ? detail.description : 'Some Description here'}
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.softContainer}>
                    <View style={[styles.itemHeader, {
                        marginBottom: 15
                    }]} >
                        <Text style={styles.selectionText}>Select Your Soft Drink</Text>
                        <Text style={[styles.selectionText, {
                            backgroundColor: '#808080',
                            borderRadius: 50
                        }]}>OPTIONAL</Text>
                    </View>
                    <Text>Select one</Text>
                    <View style={{ marginVertical: 15 }}>
                        {radio_props.map(item => (
                            <RadioButton
                                item={item}
                                value={this.state.value}
                                onChange={(value) => {
                                    this.setState({ value: value })
                                }}
                            />
                        ))}
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginVertical: 20,
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 22,
        fontWeight: '500',
        color: '#000'
    },
    divider: {
        marginVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    softContainer: {
    },
    selectionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsContainer)