import { connect } from 'react-redux';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

import * as selectors from '../selectors/restaurents-selectors';

class Restaurents extends Component {

    _renderItem = ({ item }) => (
        <View style={{ flex: 1, margin: 10, borderRadius: 30, position: 'relative' }}>
            <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <Image source={item.image} style={{ width: width - 25, height: 200, borderRadius: 10 }} />
                <View style={styles.locationStyle}>
                    <Text>
                        <Icon
                            name="map-marker"
                            size={20} color="#000"
                        /> {item.distance} miles away</Text>
                </View>
            </View>
            <View style={{ flex: 1, marginLeft: 0 }}>
                <View style={styles.titleStyle}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.name}</Text>
                    <Text style={{ color: '#1BA2FC' }}>
                        {`Service Charges: ${item.charges}`}
                    </Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '300' }}>{item.description}</Text>
            </View>
        </View>
    );

    render () {
        console.log(this.props.list);
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.list}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },
    titleStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    locationStyle: {
        right: 0,
        bottom: 10,
        left: width - 130,
        position: 'absolute',
    }
});

const mapStateToProps = state => ({
    list: selectors.makeSelectData()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Restaurents)