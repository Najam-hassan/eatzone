import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

class RestaurantDetail extends Component {
    render () {
        return (
            <View style={{ flex: 1 }}>
                <Text>Details listing will be render here!!!</Text>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetail)
