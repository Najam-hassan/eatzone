import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import Drawer from 'react-native-draggable-view';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
  View, Text, StyleSheet, Dimensions, StatusBar,
  FlatList, Image, ActivityIndicator, TouchableOpacity,
  ScrollView, AsyncStorage, Platform, Linking, Alert
} from 'react-native';

const { height, width } = Dimensions.get('screen');

import DragHeader from '../../components/drag-header';

import { mapsProps } from '../../utils/utils';
import { setInitialDrawerSize } from '../../utils/misc';

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
      latitude: "",
      longitude: "",
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 1,
        longitudeDelta: 1
      }
    }
  }

  getCurrentResPosition () {
    const { fetchCollectingList } = this.props;
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({ isLoading: false });
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude: latitude,
        longitude: longitude
      })
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
      fetchCollectingList(`/user/nearby-restaurants/${latitude},${longitude}`);
      // fetchCollectingList(`/user/nearby-restaurants/31.474241414107382, 74.24986490048468`);
    },
      (error) => {
        this.setState({ error: error.message, isLoading: false });
        if (error.message === "No location provider available." || error.code === 2) {
          if (Platform.OS === 'android') {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
              .then(data => {
                console.log(data, '0-0-0-0-0-0-0-0');
                this.getCurrentResPosition();
              }).catch(error => {
                console.log(error, '())()()()()')
              });
          } else {
            return Alert.alert(
              "",
              'Please enable your device location',
              [
                {
                  text: 'settings', onPress: () =>
                    Linking.openURL('App-Prefs:root=LOCATION_SERVICES:')
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
              ],
              { cancelable: false },
            );
          }
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentDidMount () {
    this.setState({ isLoading: true });
    this.getCurrentResPosition();
  }

  moveBack () {
    this.setState({ firstClick: true });
    const { fetchCollectingList } = this.props;
    const { latitude, longitude } = this.state;
    fetchCollectingList(`/user/nearby-restaurants/${latitude},${longitude}`);
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
    < TouchableOpacity
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
              restaurantId: item.id,
              name: item.name
            });
          }
        }
      }}
    >
      <View style={[styles.itemStyling]}>
        <Image
          source={
            item && item.bannerUrl !== '' ?
              { uri: item.bannerUrl } : require('../../assets/images/mcdonal.jpg')
          }
          style={{ width: 70, height: 70, borderRadius: 10 }}
        />
        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 20, }}>
          <Text style={styles.title}>{item.name}</Text>
          {this.state.firstClick ?
            <Text numberOfLines={2} style={styles.description}>
              {moment(item.collectTimeStart, "h:mm:ss").format("h:mm A")} to {moment(item.collectTimeEnd, "h:mm:ss").format("h:mm A")}
            </Text> :
            <Text numberOfLines={2} style={styles.description}>
              {moment(item.deliverTimeStart, "h:mm:ss").format("h:mm A")} to {moment(item.deliverTimeEnd, "h:mm:ss").format("h:mm A")}
            </Text>}
        </View>
        {!this.state.firstClick && item && !item.isValid ?
          <View style={styles.bannerMessage}>
            <Text style={styles.bannerText}>Temporarily unavailable</Text>
          </View> : null}
      </View>
    </TouchableOpacity>
  );

  render () {
    const { list, loading, navigation, collecting } = this.props;
    const { isLoading, firstClick, region } = this.state;
    if (isLoading) {
      return (
        <View style={styles.loadingStyle}>
          <StatusBar hidden={true} />
          <ActivityIndicator size={'large'} color={'#1BA2FC'} />
          <NavigationEvents
            onWillFocus={payload => {
              console.log('will focus', payload)
              this.moveBack();
            }}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <NavigationEvents
          onWillFocus={payload => {
            console.log('will focus', payload)
            this.moveBack();
          }}
        />
        <Toast
          ref="toast"
          position='bottom'
          fadeOutDuration={3000}
          textStyle={{ color: '#fff' }}
        />
        <Drawer
          initialDrawerSize={setInitialDrawerSize()}
          renderContainerView={() => {
            const { region } = this.state;
            return (
              <MapView
                {...mapsProps}
                maxZoomLevel={20}
                minZoomLevel={13}
                style={styles.map}
                followsUserLocation
                provider={PROVIDER_GOOGLE}
                initialRegion={initialValues}
                key={Platform.OS !== 'android' && Date.now()}
                region={region.latitude !== null ?
                  this.state.region : initialValues}
              >
                <View>
                  {/* {region.latitude !== null && region.longitude !== null ?
                    <Marker
                      title={`User's Loaction`}
                      coordinate={this.state.region}
                      description={'local description'}>
                      <Icon name="map-marker" size={45} color="#1BA2FC" />
                    </Marker> : null
                  } */}
                  {!firstClick && list && list.length ? list.map((item, index) => (
                    < Marker
                      key={`Alert-marker-${index}`}
                      // onPress={() => {
                      //   const { resturant } = this.props;
                      //   if (item.isValid) {
                      //     this.props.fetchDetails(item.id, resturant.id);
                      //     this.props.delivertRestaurant(item);
                      //     navigation.navigate('RestaurantDetailScreen', {
                      //       restaurantId: item.id,
                      //       name: item.name
                      //     })
                      //   }
                      // }}
                      id={index}
                      coordinate={{
                        latitude: item.location.coordinates[1],
                        longitude: item.location.coordinates[0],
                        latitudeDelta: 1,
                        longitudeDelta: 1
                      }}
                      title={item.name}
                      description={item.addressDetails}>
                      <MapView.Callout
                        onPress={() => {
                          const { resturant } = this.props;
                          if (item.isValid) {
                            this.props.fetchDetails(item.id, resturant.id);
                            this.props.delivertRestaurant(item);
                            navigation.navigate('RestaurantDetailScreen', {
                              restaurantId: item.id,
                              name: item.name,
                            })
                          }
                          else {
                            this.refs.toast.show("This restaurant is not available at the moment", 2000);
                          }
                        }
                        }
                        style={{ width: 100 }}
                      >
                        <Text>{item.name}</Text>
                      </MapView.Callout>
                      <View>
                        {/* <Text style={{
                          color: '#000', paddingBottom: -5, fontSize: 10, fontWeight: '200'
                        }}>{item.name}</Text> */}
                        <Icon name="map-marker" size={20} color="#E6464D" />
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
              return (
                <View style={styles.loadingStyle}>
                  <ActivityIndicator size={'large'} color={'#1BA2FC'} />
                </View>
              )
            } else {
              return (
                <View style={{
                  marginBottom: 15, backgroundColor: '#f7f8fa', flex: .5
                }}>
                  <Text style={{ color: '#000000', textAlign: "center", padding: 6 }}>
                    {firstClick ?
                      `Please select your dine in restaurant` :
                      `Please select your delivery restaurant`
                    }
                  </Text>
                  <ScrollView>
                    {collecting && collecting.length ?
                      <FlatList
                        data={collecting}
                        scrollEnabled={true}
                        extraData={this.state}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => (
                          Date.now() + index.toString()
                        )}
                      /> : list && list.length ?
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
            <View style={[styles.dragView]}>
              <DragHeader />
            </View>
          )}
        />
        {
          !firstClick ?
            <View style={styles.overlayMessage}>
              <TouchableOpacity
                onPress={() => this.moveBack()}
                style={{ position: 'relative', marginRight: 5 }}>
                <Icon name="arrow-left" style={{ fontSize: 18, color: '#000' }} />
              </TouchableOpacity>
            </View>
            :
            null
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  list: selectors.makeSelectFilterData()(state),
  loading: selectors.makeSelectLoading()(state),
  collecting: selectors.makeSelectCollectingList()(state),
  resturant: selectors.makeSelectCollectingResturant()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    fetchCollectingList: (url) => {
      dispatch(actions.fetchCollectingListAction(url));
    },
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
    height: 60,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#cccccc',
    backgroundColor: '#f7f8fa',
    // borderTopLeftRadius: 60,
    // borderTopRightRadius: 60,
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
    position: 'absolute',
    justifyContent: 'center',
  },
  button: {
    height: 30,
    width: '20%',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: -5,
    textAlign: 'center',
    borderColor: '#fff',
    backgroundColor: '#1BA2FC',
    marginLeft: 5
  },
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  bannerMessage: {
    top: 5,
    right: 5,
    padding: 3,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: '#00a0ff',
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
