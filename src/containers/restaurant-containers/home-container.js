import { connect } from 'react-redux'
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class OwnerDashboard extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text>Owner dashboard will be here!!!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        justifyContent: 'space-between'
    }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnerDashboard);