import { connect } from 'react-redux'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StatusBar, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import { PageHeader } from '../../components/common/header';
import RestaurantDetail from '../../containers/user-containers/restaurent-details-container';

import * as actions from '../../actions/user-actions/resturant-detail-actions';
import  * as selectors from '../../selectors/user-selectors/restaurent-detail-selectors';

const { width, height } = Dimensions.get('screen');

class RestaurantDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        // const { params } = this.props.navigation.state;
        // if (params.restaurantId) {
            // this.props.fetchDetails(params.restaurantId)
        // }
    }

    render () {
        const { list } = this.props;
        console.log(list, '-=-=-=-=-=-');
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <PageHeader
                    navigation={this.props.navigation}
                    title={'Restaurant Detail'}
                />
                <View style={{ flex: 0.4 }}>
                    <ImageBackground
                        source={require('../../assets/images/mcdonal.jpg')}
                        style={styles.backgroundImage}
                    >
                        <View style={[styles.overlay]}>
                            <View style={{ flex: 1 }} />
                            <View style={styles.detailStyle}>
                                <View>
                                    <Text style={styles.titleStyle}>
                                        {/* {params.restaurant.name} */}
                                        {'Some Name Here'}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Text style={styles.serviceChargeText}>
                                        {/* Service Charges: {params.restaurant.charges} */}
                                        Service Charges: 10 %
                                    </Text>
                                    <Text style={{ color: "#fff", marginTop: 5 }}>
                                        <Icon
                                            name="map-marker"
                                            size={16} color="#fff"
                                        />
                                        {/* {params.restaurant.distance} miles away */}
                                        10 miles away
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={[styles.itemContainer, { marginTop: -15 }]}>
                    {list && Object.keys(list).length && list.menu_categories.length ?
                      <RestaurantDetail
                        data={list.menu_categories}
                        navigation={this.props.navigation}
                        list={list.menu_categories.map(item => item.name)}
                      /> : null
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    list: selectors.makeSelectRestaurantDetail()(state)
});

const mapDispatchToProps = dispatch => {
    return {
        fetchDetails: id => dispatch(actions.fetchDetailAction(id))
    }
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',

    },
    detailStyle: {
        flexDirection: 'row',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        marginBottom: 25
    },
    itemContainer: {
        flex: 0.6,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#FEFFFF',
    },
    serviceChargeText: {
        color: '#fff',
        fontWeight: '300'
    },
    titleStyle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetailScreen)
