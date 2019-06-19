import { connect } from 'react-redux';
import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import { View, StyleSheet, ImageBackground, Dimensions, Text, ScrollView } from 'react-native';

import SignUpForm from '../forms/signup-form';

import * as selectors from '../../selectors/auth-selectors';

const { height } = Dimensions.get('screen');

class SignInScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user !== null) {
            this.refs.toast.show('Successfully sign up, please login', 800);
            this.props.navigation.navigate('SignInScreen');
        }
        if (nextProps.isAuthenticated) {
            this.refs.toast.show('Failed to register, please try again!', 800);
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
        console.log(state.params, 'sign up screen');
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
                        }}>
                            <Text style={styles.textStyle}>Sign Up</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                <SignUpForm
                                    navigateTo={this.navigateTo}
                                    userType={state.params.type}
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
    user: selectors.makeSelectSignUpUser()(state),
    isAuthenticated: selectors.makeSelectAuthStatue()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)