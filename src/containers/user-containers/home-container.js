import { connect } from 'react-redux';
import React, { Component } from 'react';
import Drawer from 'react-native-draggable-view';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View, Text, StyleSheet, Dimensions, StatusBar, FlatList,
    Image, ActivityIndicator, TouchableOpacity
} from 'react-native';

const { height, width } = Dimensions.get('screen');

import DragHeader from '../../components/drag-header';

import * as actions from '../../actions/user-actions/home-actions'
import * as selectors from '../../selectors/user-selectors/home-selectors'
import { fetchDetailAction } from '../../actions/user-actions/resturant-detail-actions';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstClick: true,
            isLoading: false,
            region: {
                latitude: 0.000000,
                longitude: 0.000000,
                latitudeDelta: 1,
                longitudeDelta: 1
            }
        }
    }

    componentDidMount () {
        console.log('user type', this.props.type)
        this.setState({ isLoading: true })
        const { fetchList } = this.props;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ isLoading: false })
                const { latitude, longitude } = position.coords
                console.log('lat: ', latitude, 'long: ', longitude)
                this.setState({
                    region: {
                        ...this.state.region,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                });
                fetchList(`/user/nearby-restaurants/${latitude},${longitude}`);
            },
            (error) => this.setState({ error: error.message, isLoading: false }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => {
                const { firstClick } = this.state;
                const { location } = item;
                if (firstClick) {
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
                    this.props.fetchList(`/user/eligible-restaurants/${item.id}`);
                } else {
                    console.log('will impleent the listing shortly!!!!')
                }
            }}
        >
            <View style={styles.itemStyling}>
                <Image
                    source={index % 2 === 0 ?
                        require('../../assets/images/mcdonal.jpg') :
                        require('../../assets/images/subway.jpg')}
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
        const { isLoading, firstClick } = this.state;
        if (isLoading) {
            return <ActivityIndicator size={'large'} color={'#1BA2FC'} />
        }
        return (
            <View style={styles.container}>
                <MapView
                    maxZoomLevel={8}
                    style={styles.map}
                    pitchEnabled={true}
                    followsUserLocation
                    rotateEnabled={true}
                    scrollEnabled={true}
                    showsUserLocation={true}
                    region={this.state.region}
                    showsMyLocationButton={true}
                >
                    <View>
                        <Marker
                            title={`User's Loaction`}
                            coordinate={this.state.region}
                            description={'local description'}>
                            <Icon name="map-marker" size={45} color="#1BA2FC" />
                        </Marker>
                        {!firstClick && list && list.length ? list.map((item, index) => (
                            <Marker
                                onPress={() => {
                                    this.props.fetchDetails(item.id);
                                    navigation.navigate('RestaurantDetailScreen', {
                                        restaurantId: item.id
                                    })
                                }}
                                id={index}
                                coordinate={{
                                    latitude: item.location.coordinates[1],
                                    longitude: item.location.coordinates[0],
                                    latitudeDelta: 1,
                                    longitudeDelta: 1
                                }}
                                title={'Title Here'}
                                description={'local description'}>
                                <Icon name="map-marker" size={40} color="#E6464D" />
                            </Marker>
                        )) : null}
                    </View>
                </MapView>
                <Drawer
                    initialDrawerSize={0.15}
                    renderContainerView={() => (null)}
                    finalDrawerHeight={(height / 2) - 100}
                    renderDrawerView={() => {
                        if (loading) {
                            return <ActivityIndicator size={'large'} color={'#1BA2FC'} />
                        } else {
                            return (
                                <View style={{
                                    marginBottom: 15, backgroundColor: '#f7f8fa', flex: 1
                                }}>
                                    {list && list.length ?
                                        <FlatList
                                            data={list}
                                            extraData={this.state}
                                            renderItem={this._renderItem}
                                            keyExtractor={(item, index) => index.toString()}
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
    list: selectors.makeSelectData()(state),
    loading: selectors.makeSelectLoading()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        fetchList: (lat, long) => {
            dispatch(actions.fetchListAction(lat, long));
        },
        fetchDetails: id => dispatch(fetchDetailAction(id)),
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
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
    },
    dragView: {
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#f7f8fa',
        borderBottomWidth: 0
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
