import { connect } from 'react-redux'
import React, { Component } from 'react';
import { CheckBox, Icon } from 'react-native-elements';
import {
    View, StyleSheet, FlatList, TouchableOpacity, Text, Image, ActivityIndicator
} from 'react-native';

import ActionButton from '../../components/common/action-button';
import * as actions from '../../actions/restaurant-actions/home-actions';
import * as selectors from '../../selectors/restaurant-selectors/home-selectors';

class OwnerDashboard extends Component {

    state = { isEnable: false, selectAll: false }

    componentDidMount () {
        this.props.fetchList();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.isDeleted) {
            this.props.resetState();
            this.props.fetchList();
        }
    }

    render () {
        const { isEnable, selectAll } = this.state;
        const { categories, loading, showOptions, selectedList, deleteCategory } = this.props;
        const conut = categories.filter(row => row.selected).length;
        if (conut <= 0 && isEnable === true) {
            this.setState({
                isEnable: false,
                selectAll: false
            })
        }
        if (loading) {
            return (
                <View>
                    <ActivityIndicator size={'large'} color={'#1BA2FC'} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {categories && categories.length ?
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{}}
                        numColumns={2}
                        renderItem={
                            ({ item }) => (
                                <View key={item.id} style={styles.listView}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        delayLongPress={!isEnable ? 500 : 0}
                                        onPress={() => {
                                            this.props.navigation.navigate('MenuItemsScreen', {
                                                items: item.menu_items,
                                                catId: item.id,
                                            })
                                        }}
                                        onLongPress={() => {
                                            showOptions(item.id);
                                            this.setState({ isEnable: true });
                                        }}
                                    >
                                        <Image
                                            style={styles.image}
                                            source={{ uri: item.imageUrl }}
                                        />
                                        <View style={styles.overlay} />
                                        <View style={styles.titleView}>
                                            <Text style={styles.title}>{item.name}</Text>
                                        </View>
                                        {this.state.isEnable ?
                                            <View style={[styles.titleView, {
                                                top: -110, left: '70%'
                                            }]}>
                                                <CheckBox
                                                    size={24}
                                                    checked={item.selected}
                                                    onPress={() => showOptions(item.id)}
                                                />
                                            </View> : null
                                        }
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    /> : <Text style={{ textAlign: 'center', fontSize: 20, color: '#000' }}>
                        You haven't created category yet!
                        </Text>}
                {isEnable ? <View style={styles.overlayOptions}>
                    <View style={styles.deleteIcon}>
                        <Icon
                            size={26}
                            name={'delete'}
                            color={'green'}
                            onPress={() => deleteCategory(selectedList)}
                        />
                        <Text>Delete</Text>
                    </View>
                    <View style={styles.deleteIcon}>
                        <CheckBox
                            size={24}
                            checked={selectAll}
                            onPress={() => {
                                const { selectAll } = this.state;
                                this.setState({ selectAll: !selectAll });
                                this.props.selectAll(!selectAll);
                            }}
                        />
                        <Text>Select All</Text>
                    </View>
                </View> : null}
                <ActionButton
                    onPress={() => {
                        this.props.navigation.navigate('CategoryScreen')
                    }}
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
    listView: {
        flex: 1,
        padding: 6,
        justifyContent: 'space-between',
    },
    titleView: {
        justifyContent: 'center',
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10,
    },
    overlayOptions: {
        height: 60,
        top: '85%',
        left: '25%',
        width: '50%',
        right: '25%',
        bottom: '8%',
        borderRadius: 60,
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: '#E8E9EB',
        justifyContent: 'space-around',
    },
    deleteIcon: {
        flexDirection: 'column'
    }
});

const mapStateToProps = state => ({
    loading: selectors.makeSelectLoading()(state),
    isDeleted: selectors.makeSelectIsDeleted()(state),
    categories: selectors.makeSelectCategoryList()(state),
    selectedList: selectors.makeSelectSelectedList()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState()),
        showOptions: (id) => dispatch(actions.showMoreOptions(id)),
        fetchList: () => dispatch(actions.fetchCategoryListAction()),
        selectAll: selectAll => dispatch(actions.selectAllAction(selectAll)),
        deleteCategory: list => dispatch(actions.deleteCategoryAction(list)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnerDashboard);