import { connect } from 'react-redux'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, { DURATION } from 'react-native-easy-toast';
import {
    View, StyleSheet, Text, FlatList, Image, TouchableOpacity, ActivityIndicator
} from 'react-native';

import ActionButton from '../../components/common/action-button';
import * as actions from '../../actions/restaurant-actions/category-item-actions';
import { fetchCategoryListAction } from '../../actions/restaurant-actions/home-actions';
import * as selectors from '../../selectors/restaurant-selectors/category-item-selectors';
import { makeSelectCategoryList } from '../../selectors/restaurant-selectors/home-selectors';

class ItemContainer extends Component {
    componentWillReceiveProps (nextProps) {
        console.log(this.refs, 'refs 1');
        if (nextProps.success) {
            console.log(this.refs, 'refs');
            // this.refs.toast.show('Menu Item deleted successfully', 2000);
            this.props.fetchList();
        }
        if (nextProps.failed) {
            // this.refs.toast.show('Some thing wrong, failed to delete Item', 2000);
        }
    }

    _renderItem = ({ item }) => (
        <View style={styles.itemStyling}>
            <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 70, height: 70, borderRadius: 10 }}
            />
            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 20, }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.description}>
                    {item.description ? item.description : 'Some thing about the category'}
                </Text>
            </View>
            <View style={{ padding: 8 }}>
                <TouchableOpacity
                    onPress={() => {
                        const { catId } = this.props;
                        this.props.removeItem(catId, item.id)
                    }}
                >
                    <Icon
                        size={18}
                        name={'close'}
                        color={'#000'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    render () {
        const { items, navigation, catId, deleteLoading, categories } = this.props;
        const category = categories && categories.filter(row => row.id === catId);
        if (deleteLoading) {
            return <ActivityIndicator size={'large'} color={'#1BA2FC'} />
        }
        return (
            <View style={styles.container}>
                {category && category[0].menu_items.length ?
                    <FlatList
                        data={category[0].menu_items}
                        extraData={category}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this._renderItem}
                    /> : <View>
                        <Text style={[styles.title, { fontWeight: '300' }]}>
                            Menu Item not exsit, please create menu items.
                        </Text>
                    </View>
                }
                <ActionButton
                    onPress={() => {
                        navigation.navigate('CreateItemScreen', {
                            catId: catId
                        })
                    }}
                />
                <Toast
                    ref="toast"
                    position='bottom'
                    fadeOutDuration={3000}
                    textStyle={{ color: '#fff' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },
    itemStyling: {
        flex: 1,
        marginTop: 10,
        borderRadius: 10,
        shadowRadius: 20,
        shadowOpacity: 0.1,
        shadowColor: '#000',
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
    description: {
        fontSize: 13,
        fontWeight: '300',
        color: '#cccccc'
    }
});

const mapStateToProps = state => ({
    categories: makeSelectCategoryList()(state),
    deleteLoading: selectors.makeSelectDeleteLoading()(state),
    success: selectors.makeSelectSuccessStatus()(state),
    failed: selectors.makeSelectDeleteFailed()(state)
});

const mapDispatchToProps = dispatch => {
    return {
        removeItem: (catId, id) => {
            dispatch(actions.removeItemAction(catId, id));
        },
        fetchList: () => dispatch(fetchCategoryListAction()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemContainer);