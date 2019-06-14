import { connect } from "react-redux";
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text, AsyncStorage } from 'react-native';

import * as selectors from '../../selectors/auth-selectors'

import SignInForm from '../forms/signin-form';

const { height } = Dimensions.get('screen');

class SignInScreen extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.user !== null) {
			try {
				AsyncStorage.setItem(
					'user',
					JSON.stringify(nextProps.user),
					() => {
						this.props.navigation.navigate('HomeScreen');
						this.forceUpdate();
					}
				);
			} catch (error) {
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
					source={require('../../assets/images/image-1.jpg')}
					style={styles.backgroundImage}
				>
					<View style={styles.overlay}>
						<View style={{
							alignItems: 'center',
							justifyContent: 'center',
							flex: 0.4,
						}}><Text style={styles.textStyle}>Sign In</Text></View>
						<View style={styles.formContainer}>
							<SignInForm
								navigateTo={this.navigateTo}
								userType={state.params.type}
							/>
						</View>
					</View>
				</ImageBackground>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	user: selectors.makeSelectData()(state),
});

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

export default connect(mapStateToProps, null)(SignInScreen)