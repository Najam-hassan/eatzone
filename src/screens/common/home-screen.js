import { connect } from 'react-redux';
import React, { Component } from 'react';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { View, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';

import { Header } from '../../components/common/header';
import UserDashboard from '../../containers/user-containers/home-container'
import OwnerDashboard from '../../containers/restaurant-containers/home-container'

import * as actions from '../../actions/user-actions/home-actions';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: null,
			error: null,
			loading: true,
			latitude: null,
			longitude: null,
			region: {
				latitude: null,
				longitude: null,
				latitudeDelta: 1,
				longitudeDelta: 1
			}
		}
	}

	checkUserType = async () => {
		this.setState({ loading: true });
		const type = await AsyncStorage.getItem('user_type');
		if (type === 'admin') {
			this.setState({ type: 'admin' });
			this.setState({ loading: false });
		} else {
			this.setState({ type: 'user' });
			this.getCurrentResPosition();
			this.setState({ loading: false });
		}
	};


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
					<View style={styles.loadingStyle}>
						<ActivityIndicator size={'large'} color={'#1BA2FC'} />
					</View>
					: type === 'admin' ? <OwnerDashboard
						navigation={this.props.navigation}
					/> :
						type === 'user' ? <UserDashboard
							isLoading={this.state.loading}
							region={this.state.region}
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
		fetchCollectingList: (url) => {
			dispatch(actions.fetchCollectingListAction(url));
		},
	}
}

const styles = StyleSheet.create({
	loadingStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
