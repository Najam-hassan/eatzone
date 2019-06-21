import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import { Header } from '../../components/common/header';
import * as actions from '../../actions/user-actions/nearby-restaurants-actions';
import NearByRestaurant from '../../containers/user-containers/nearby-restaurents-container'

class RestaurantsScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.props.fetchList();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                console.log('lat: ', latitude, 'long: ', longitude)
                this.props.fetchList();
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={false} />
                <Header
                    navigation={this.props.navigation}
                    title={'Restaurants Nearby'}
                />
                <NearByRestaurant
                    navigateTo={(item) => {
                        this.props.navigation.navigate(
                            'RestaurantDetailScreen', {
                                restaurant: item
                            }
                        )
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => {
    return {
        fetchList: () => dispatch(actions.fetchListAction()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantsScreen)
