import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ItemDetailsContainer extends Component {
    render () {
        return (
            <Text>Item details will be render here!!!</Text>
        )
    }
}

export default connect(null, null)(ItemDetailsContainer)