import { connect } from 'react-redux';
import React, { Component } from 'react';
import { guid } from '../../utils/misc';
import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

class RestaurantDetail extends Component {

    _renderItem = ({ item, index }) => (
        <View key={index} style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Text style={[styles.title, styles.category, { marginVertical: 5 }]}>{item}</Text>
            {this.props.data.map(row => {
                if (item === row.name) {
                    return row.menu_items.map(item => (
                        <TouchableOpacity
                            key={guid()}
                            activeOpacity={0.7}
                            onPress={() => {
                                this.props.navigation.navigate(
                                    'ItemDetailScreen', {
                                        item: item
                                    })
                            }}
                        >
                            <View style={styles.itemStyling}>
                                <Image source={{ uri: item.imageUrl }} style={{ width: 70, height: 70, borderRadius: 10 }} />
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 15, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                        <Text style={styles.title}>{item.name}</Text>
                                        <Text style={styles.price}>${item.price}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text numberOfLines={2} style={styles.description}>
                                            {item.description}
                                        </Text>
                                        <View style={styles.stockStyle}>
                                            <TouchableOpacity>
                                                <Text style={styles.blueBtn}>
                                                    +
                                    </Text>
                                            </TouchableOpacity>
                                            <Text style={{ marginHorizontal: 10 }}>2</Text>
                                            <TouchableOpacity>
                                                <Text style={styles.blueBtn}>
                                                    -
                                    </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            })}
        </View>
    );

    render () {
        const { list } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {list && list.length ?
                    <FlatList
                        data={list}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem}
                    /> : <View style={{
                        flex: .5,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text>No data Found</Text>
                    </View>
                }
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
        marginVertical: 7.5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000000'
    },
    price: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000000'
    },
    description: {
        fontSize: 13,
        fontWeight: '300',
        color: '#cccccc'
    },
    category: {
        fontWeight: '700'
    },
    stockStyle: {
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f7f8fa',
        justifyContent: 'space-between',
    },
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetail)
