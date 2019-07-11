import { connect } from 'react-redux';
import React, { Component } from 'react';
import Drawer from 'react-native-draggable-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    View, Text, StyleSheet, Dimensions, StatusBar,
    FlatList, Image, ActivityIndicator, TouchableOpacity,
    ScrollView, AsyncStorage, Platform
} from 'react-native';

const { height, width } = Dimensions.get('screen');

import DragHeader from '../../components/drag-header';

import { mapsProps } from '../../utils/utils';

import * as actions from '../../actions/user-actions/home-actions';
import * as selectors from '../../selectors/user-selectors/home-selectors';
import { fetchDetailAction } from '../../actions/user-actions/resturant-detail-actions';

let initialValues = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstClick: true,
            isLoading: false,
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: 1,
                longitudeDelta: 1
            }
        }
    }

    componentDidMount () {
        this.setState({ isLoading: true });
        const { fetchList } = this.props;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ isLoading: false });
                const { latitude, longitude } = position.coords;
                console.log('lat: ', latitude, 'long: ', longitude);
                AsyncStorage.setItem('location', { latitude, longitude });
                initialValues = {
                    ...initialValues,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                this.setState({
                    region: {
                        ...this.state.region,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                });
                fetchList(`/user/nearby-restaurants/${latitude},${longitude}`);
                // fetchList(`/user/nearby-restaurants/31.474241414107382, 74.24986490048468`);
            },
            (error) => {
                this.setState({ error: error.message, isLoading: false });
                // const location = AsyncStorage.getItem('location');
                // console.log(location, '..........');
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    }

    setLocation = location => {
        if (location) {
            this.setState({
                firstClick: false,
                region: {
                    ...this.state.region,
                    latitude: location.coordinates[1],
                    longitude: location.coordinates[0]
                }
            });
        }
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => {
                const { firstClick } = this.state;
                const { location } = item;
                if (firstClick) {
                    this.setLocation(location);
                    this.props.fetchList(`/user/eligible-restaurants/${item.id}`);
                    this.props.collectingResturant(item);
                } else {
                    const { resturant } = this.props;
                    if (item.isValid) {
                        this.props.delivertRestaurant(item);
                        this.props.fetchDetails(item.id, resturant.id);
                        this.props.navigation.navigate('RestaurantDetailScreen', {
                            restaurantId: item.id
                        });
                    }
                }
            }}
        >
            <View style={styles.itemStyling}>
                <Image
                    source={
                        item && item.bannerUrl !== '' ?
                            { uri: item.bannerUrl } : require('../../assets/images/mcdonal.jpg')
                    }
                    style={{ width: 70, height: 70, borderRadius: 10 }}
                />
                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 20, }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text numberOfLines={2} style={styles.description}>
                        {item.addressDetails}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    render () {
        const { list, loading, navigation } = this.props;
        const { isLoading, firstClick, region } = this.state;
        if (isLoading) {
            return <ActivityIndicator size={'large'} color={'#1BA2FC'} />
        }
        return (
            <View style={styles.container}>
                <Drawer
                    initialDrawerSize={0.15}
                    renderContainerView={() => {
                        const { region } = this.state;
                        return (
                            <MapView
                                {...mapsProps}
                                maxZoomLevel={20}
                                style={styles.map}
                                followsUserLocation
                                provider={PROVIDER_GOOGLE}
                                initialRegion={initialValues}
                                key={Platform.OS !== 'android' && Date.now()}
                                region={region.latitude !== null ?
                                    this.state.region : initialValues}
                            >
                                <View>
                                    {region.latitude !== null && region.longitude !== null ?
                                        <Marker
                                            title={`User's Loaction`}
                                            coordinate={this.state.region}
                                            description={'local description'}>
                                            <Icon name="map-marker" size={45} color="#1BA2FC" />
                                        </Marker> : null
                                    }
                                    {!firstClick && list && list.length ? list.map((item, index) => (
                                        < Marker
                                            key={`Alert-marker-${index}`}
                                            onPress={() => {
                                                const { resturant } = this.props;
                                                if (item.isValid) {
                                                    this.props.fetchDetails(item.id, resturant.id);
                                                    this.props.delivertRestaurant(item);
                                                    navigation.navigate('RestaurantDetailScreen', {
                                                        restaurantId: item.id
                                                    })
                                                }
                                            }}
                                            id={index}
                                            coordinate={{
                                                latitude: item.location.coordinates[1],
                                                longitude: item.location.coordinates[0],
                                                latitudeDelta: 1,
                                                longitudeDelta: 1
                                            }}
                                            title={item.name}
                                            description={item.addressDetails}>
                                            <View>
                                                <Text style={{
                                                    color: '#000', paddingBottom: -5, fontSize: 16, fontWeight: '500'
                                                }}>{item.name}</Text>
                                                <Icon name="map-marker" size={40} color="#E6464D" />
                                            </View>
                                        </Marker>
                                    )) : null}
                                </View>
                            </MapView>
                        )
                    }}
                    finalDrawerHeight={(height / 2) - 100}
                    renderDrawerView={() => {
                        if (loading) {
                            return <ActivityIndicator size={'large'} color={'#1BA2FC'} />
                        } else {
                            return (
                                <View style={{
                                    marginBottom: -15, backgroundColor: '#f7f8fa', flex: .5
                                }}>
                                    <ScrollView>
                                        {list && list.length ?
                                            <FlatList
                                                data={list}
                                                scrollEnabled={true}
                                                extraData={this.state}
                                                renderItem={this._renderItem}
                                                keyExtractor={(item, index) => (
                                                    Date.now() + index.toString()
                                                )}
                                            /> :
                                            <View style={{
                                                flex: .5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <Text style={[styles.title, {
                                                    fontWeight: '400', color: '#999'
                                                }]}>
                                                    No Restaurant found in your location
                                            </Text>
                                            </View>
                                        }
                                    </ScrollView>
                                </View>
                            )
                        }
                    }}
                    renderInitDrawerView={() => (
                        <View style={styles.dragView}>
                            <StatusBar hidden={true} />
                            <DragHeader />
                        </View>
                    )}
                />
                <View style={styles.overlayMessage}>
                    <Text style={{ color: '#fff' }}>{firstClick ?
                        `Please select restaurant (To)` : `Select your delivery restaurent (From)`}
                    </Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    list: selectors.makeSelectFilterData()(state),
    loading: selectors.makeSelectLoading()(state),
    resturant: selectors.makeSelectCollectingResturant()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        fetchList: (url) => {
            dispatch(actions.fetchListAction(url));
        },
        collectingResturant: resturant => {
            dispatch(actions.setCollectingResturant(resturant));
        },
        delivertRestaurant: resturant => {
            dispatch(actions.setDeliveryRestaurant(resturant));
        },
        fetchDetails: (id, collectingId) => {
            dispatch(fetchDetailAction(id, collectingId));
            // dispatch(setSetUser)
        },
    }
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    dragView: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#f7f8fa',
        borderBottomWidth: 0,
    },
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
    description: {
        fontSize: 13,
        fontWeight: '300',
        color: '#cccccc'
    },
    overlayMessage: {
        top: 0,
        left: 0,
        flex: 1,
        right: 0,
        padding: 4,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer)
