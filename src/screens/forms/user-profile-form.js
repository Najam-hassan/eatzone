import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class UserProfileForm extends Component {
    render () {
        return (
            <View>
                <Text>User Profile details will be here!!!!</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileForm);
