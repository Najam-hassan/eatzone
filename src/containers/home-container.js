import { connect } from 'react-redux';
import React, { Component } from 'react';
import Drawer from 'react-native-draggable-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions, StatusBar, FlatList, Image } from 'react-native';

const { height, width } = Dimensions.get('screen');

const ASPECT_RATIO = width / height;
const LATITUDE = -37.812365;
const LONGITUDE = 144.962338;
const LATITUDE_DELTA = 0.0222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import DragHeader from '../components/drag-header';

import * as actions from '../actions/home-actions.js'
import * as selectors from '../selectors/home-selectors.js'

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [{
                latitude: 31.47427313,
                longitude: 74.24994869,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }, {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }, {
                latitude: 33.47427313,
                longitude: 72.24994869,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }, {
                latitude: 30.47427313,
                longitude: 72.24994869,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }],
            region: {
                latitude: 31.47427313,
                longitude: 74.24994869,
                latitudeDelta: 0.018,
                longitudeDelta: LONGITUDE_DELTA
            }
        }
    }

    componentDidMount () {
        const { fetchList } = this.props;
        fetchList();
    }

    _renderItem = ({ item }) => (
        <View style={styles.itemStyling}>
            <Image source={item.image} style={{ width: 70, height: 70, borderRadius: 10 }} />
            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 20, }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.description}>
                    {item.description}
                </Text>
            </View>
        </View>
    );

    render () {
        return (
            <View style={styles.container}>
                <MapView
                    followsUserLocation
                    // provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.state.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    {this.state.markers.map(item => (
                        <Marker
                            coordinate={item}
                            title={'Title Here'}
                            description={'local description'}>
                            <Icon name="map-marker" size={40} color="#E6464D" />
                        </Marker>
                    ))}
                </MapView>
                <Drawer
                    initialDrawerSize={0.15}
                    renderContainerView={() => (null)}
                    finalDrawerHeight={(height / 2) - 100}
                    renderDrawerView={() => (
                        <View style={{ marginBottom: 15, backgroundColor: '#f7f8fa' }}>
                            <FlatList
                                data={this.props.list}
                                extraData={this.state}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                            />
                        </View>
                    )}
                    renderInitDrawerView={() => (
                        <View style={styles.dragView}>
                            <StatusBar hidden={true} />
                            <DragHeader />
                        </View>
                    )}
                />
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
        fetchList: () => dispatch(actions.fetchListAction())
    }
}

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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer)