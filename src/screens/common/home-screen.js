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
            type: null,
            error: null,
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
                    <ActivityIndicator size={'large'} color={'#1BA2FC'} />
                    : type === 'admin' ? <OwnerDashboard
                        navigation={this.props.navigation}
                    /> :
                        type === 'user' ? <UserDashboard
                            navigation={this.props.navigation}
                            type={this.state.type}
                        /> : null
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        testAction: data => console.log(data, '-==-=-=-=-=-'),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
