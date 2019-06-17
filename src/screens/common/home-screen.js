import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';

import { Header } from '../../components/common/header';
import UserDashboard from '../../containers/user-containers/home-container'
import OwnerDashboard from '../../containers/restaurant-containers/home-container'

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            type: 'user',
            loading: true,
            latitude: null,
            longitude: null,
        }
        // this.checkUserType();
    }

    checkUserType = async () => {
        this.setState({ loading: true });
        const type = await AsyncStorage.getItem('user_type');
        if (type === 'admin') {
            this.setState({ type: 'admin' });
            this.setState({ loading: false });
        } else {
            this.setState({ type: 'user' });
            this.setState({ loading: false });
        }
    };

    componentDidMount () {
        this.checkUserType();
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
        const { loading, type } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    navigation={this.props.navigation}
                    title={'Home'}
                />
                {loading ?
                    <ActivityIndicator size={'large'} color={'1BA2FC'} />
                    : null
                }
                {type === 'admin' ? <OwnerDashboard /> : null}
                {type === 'user' ? <UserDashboard /> : null}
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
