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

    state = { isEnable: false, selectAll: false };

    componentDidMount () {
        this.props.fetchList();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.isDeleted) {
            this.props.resetState();
            this.props.fetchList();
        }
        if (nextProps.profile &&
            Object.keys(nextProps.profile).length &&
            !nextProps.profile.phone) {
            this.props.navigation.navigate('RestaurantProfile')
        }
    }

    render () {
        const { isEnable, selectAll } = this.state;
        const { categories, loading, showOptions, selectedList, deleteCategory } = this.props;
        const count = categories.filter(row => row.selected).length;
        if (count <= 0 && isEnable === true) {
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
                    <View style={styles.overlayDel}>
                        <Icon
                            size={24}
                            name={'delete'}
                            color={'#00a0ff'}
                            onPress={() => deleteCategory(selectedList)}
                        />
                        <Text style={styles.overlayText}>Delete</Text>
                    </View>
                    <View style={styles.overlayCheck}>
                        <CheckBox
                            size={22}
                            checked={selectAll}
                            color={'#00a0ff'}
                            containerStyle={styles.checkBoxSet}
                            onPress={() => {
                                const { selectAll } = this.state;
                                this.setState({ selectAll: !selectAll });
                                this.props.selectAll(!selectAll);
                            }}
                        />
                        <Text style={styles.overlayText}>Select All</Text>
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
        paddingVertical: 8,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
    },
    listView: {
        flex: 1,
        padding: 7,
        justifyContent: 'space-between',
    },
    titleView: {
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 18,
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '400',
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 10,
    },
    overlayOptions: {
        height: 60,
        left: '20%',
        width: '60%',
        right: '20%',
        bottom: '6%',
        paddingHorizontal: 8,
        borderRadius: 60,
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        backgroundColor: '#eeeeee',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    overlayDel: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    overlayCheck: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    checkBoxSet: {
        color: '#00a0ff',
        marginTop: 2,
        paddingTop: 0,
        marginLeft: 0,
        borderWidth: 0,
        paddingLeft: 14,
        marginRight: 0,
        marginBottom: 0,
        paddingBottom: 0,
        borderWidth: 0,
    },
    overlayText: {
        fontSize: 13,
        color: '#7d7d7f',
    },
});

const mapStateToProps = state => ({
    loading: selectors.makeSelectLoading()(state),
    isDeleted: selectors.makeSelectIsDeleted()(state),
    profile: selectors.makeSelectProfileDetails()(state),
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
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnerDashboard);