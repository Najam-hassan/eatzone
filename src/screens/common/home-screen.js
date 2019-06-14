import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';

import { Header } from '../../components/common/header';
import HomeContainer from '../../containers/home-container'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            latitude: null,
            longitude: null,
        }
        this.checkUserType();
    }

    checkUserType = async () => {
        const type = await AsyncStorage.getItem('user_type');
        console.log(type, 'login user type');
        if (type === 'admin') {
            this.props.navigation.navigate('RestaurantProfile');
        }
    };

    componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                console.log('lat: ', latitude, 'long: ', longitude)
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
                <Header
                    navigation={this.props.navigation}
                    title={'Home'}
                />
                <HomeContainer />
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
