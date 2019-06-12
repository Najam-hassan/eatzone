import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';

class RestaurantDetail extends Component {

    _renderItem = ({ item }) => (
        <View style={styles.itemStyling}>
            <Image source={item.image} style={{ width: 70, height: 70, borderRadius: 10 }} />
            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 20, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View>
                    <Text numberOfLines={2} style={styles.description}>
                        {item.description}
                    </Text>
                </View>
            </View>
        </View>
    );

    render () {
        const { list } = this.props;
        return (
            <View style={{ flex: 1, marginBottom: 15 }}>
                <FlatList
                    data={list.pizzas ? list.pizzas : list.burgers}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View >
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
    itemStyling: {
        flex: 1,
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        shadowRadius: 20,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowOffset: { height: 10, width: 0 },
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000'
    },
    price: {
        fontSize: 16,
        fontWeight: '300',
        color: '#000000'
    },
    description: {
        fontSize: 13,
        fontWeight: '300',
        color: '#cccccc'
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetail)
