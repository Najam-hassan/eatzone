import { connect } from 'react-redux';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

class RestaurantDetail extends Component {

    _renderItem = ({ item }) => (
        <View style={styles.itemStyling}>
            <Image source={item.image} style={{ width: 70, height: 70, borderRadius: 10 }} />
            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 20, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text numberOfLines={2} style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity>
                            <Text>
                                <Icon name="plus-circle" size={28} color="#1BA2FC" />
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: 15 }}>2</Text>
                        <TouchableOpacity>
                            <Text>
                                <Icon name="minus-circle" size={28} color="#1BA2FC" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    render () {
        const { list } = this.props;
        return (
            <View style={{ flex: 1, marginVertical: 15 }}>
                <Text style={[styles.title, styles.category]}>{this.props.categoryName}</Text>
                <FlatList
                    data={list}
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
    },
    category: {
        marginBottom: 15,
        fontWeight: '700',
        paddingHorizontal: 15,
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetail)
