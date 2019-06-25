import { connect } from "react-redux";
import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import OneSignal from 'react-native-onesignal';
import {
	View, StyleSheet, ImageBackground, Dimensions, Text, AsyncStorage, ScrollView
} from 'react-native';

import * as actions from '../../actions/auth-actions'
import * as selectors from '../../selectors/auth-selectors'

import SignInForm from '../forms/signin-form';

const { height } = Dimensions.get('screen');

class SignInScreen extends Component {
	constructor(props) {
		super(props);
		this.state = { playerId: '' }

		OneSignal.setLogLevel(7, 0);
		OneSignal.setRequiresUserPrivacyConsent(false);
		OneSignal.init("f63350e4-f498-494f-9a3d-6d691518b83c", { kOSSettingsKeyAutoPrompt: true });
		OneSignal.configure()
	}

	async componentDidMount () {
		await OneSignal.userProvidedPrivacyConsent();
		OneSignal.provideUserConsent(true);
		OneSignal.addEventListener("opened", this.onOpened.bind(this));
		OneSignal.addEventListener("ids", this.onIds.bind(this));
		OneSignal.inFocusDisplaying(2);
	}

	componentWillUnmount () {
		OneSignal.removeEventListener("opened", this.onOpened);
		OneSignal.removeEventListener("ids", this.onIds);
	}

	onOpened (openResult) {
		console.log('Message: ', openResult.notification.payload.body);
		console.log('Data: ', openResult.notification.payload.additionalData);
		console.log('isActive: ', openResult.notification.isAppInFocus);
		console.log('openResult: ', openResult);
	}

	onIds (device) {
		console.log('Device info: ', device);
		this.setState({ playerId: device.userId })
	}

	componentWillReceiveProps (nextProps) {
		const { params } = this.props.navigation.state;
		if (nextProps.authUser !== null) {
			this.refs.toast.show(
				'Confirmation email has been sent to you. Please confirm to login',
				2000
			);
		}
		if (nextProps.user !== null) {
			try {
				AsyncStorage.setItem(
					'user',
					JSON.stringify(nextProps.user),
					() => {
						if (params && params.type === 'user') {
							this.props.navigation.navigate('HomeScreen');
						} else {
							this.props.navigation.navigate('CreateRestaurantProfile');
						}
						this.forceUpdate();
					}
				);
			} catch (error) {
			}
		}
		if (nextProps.isAuthenticated) {
			if (nextProps.error && nextProps.error.message) {
				this.refs.toast.show(nextProps.error.message, 2000);
			} else {
				this.refs.toast.show('Failed to login, check email and password combination!');
			}
		}
	}

	navigateTo = screen => {
		const { state } = this.props.navigation;
		if (screen) {
			if (state.params && state.params.type)
				this.props.navigation.navigate(screen, {
					type: state.params.type
				})
			else
				this.props.navigation.navigate(screen);
		}
	}

	render () {
		const { state } = this.props.navigation;
		console.log(state.params, 'sign in screen');
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground
					source={require('../../assets/images/auth-bg.jpg')}
					style={styles.backgroundImage}
				>
					<View style={styles.overlay}>
						<View style={{
							alignItems: 'center',
							justifyContent: 'center',
							flex: 0.4,
						}}><Text style={styles.textStyle}>Sign In</Text></View>
						<View style={styles.formContainer}>
							<ScrollView
								showsVerticalScrollIndicator={false}
								keyboardShouldPersistTaps="handled"
							>
								<SignInForm
									navigateTo={this.navigateTo}
									userType={state.params.type}
									playerId={this.state.playerId}
								/>
							</ScrollView>
						</View>
					</View>
					<Toast ref="toast" />
				</ImageBackground>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	user: selectors.makeSelectData()(state),
	error: selectors.makeSelectSignInError()(state),
	authUser: selectors.makeSelectSignUpUser()(state),
	isAuthenticated: selectors.makeSelectAuthStatue()(state),
});

const mapDispatchToProps = dispatch => {
	return {
		resetState: () => dispatch(actions.resetState()),
	}
}

const styles = StyleSheet.create({
	backgroundImage: {
		width: '100%',
		height: height - 20,
	},
	formContainer: {
		flex: 1,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		backgroundColor: '#FEFFFF',
	},
	textStyle: {
		fontSize: 30,
		color: '#fff',
		width: '100%',
		fontWeight: '700',
		textAlign: 'center',
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0,0,0,0.4)',
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignInScreen)