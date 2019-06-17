import { connect } from "react-redux";
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text, AsyncStorage, ScrollView } from 'react-native';

import ForgetPasswordForm from '../forms/forgot-password-form';

const { height } = Dimensions.get('screen');

class ForgetPasswordScreen extends Component {
    constructor(props) {
        super(props);
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
                        <View style={styles.imageHeader}>
                            <Text style={styles.textStyle}>Forgot Password</Text>
                        </View>
                        <View style={styles.formContainer}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                <ForgetPasswordForm
                                    navigateTo={this.navigateTo}
                                    userType={state.params.type}
                                />
                            </ScrollView>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = state => ({});

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: height - 20,
    },
    imageHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.4,
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

export default connect(mapStateToProps, null)(ForgetPasswordScreen)