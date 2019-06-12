import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text } from 'react-native';

import SignUpForm from './forms/signup-form';

const { height } = Dimensions.get('screen');

class SignInScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={StyleSheet.container}>
                <ImageBackground
                    source={require('../assets/images/image-1.jpg')}
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
                            <SignUpForm navigateTo={() => this.props.navigation.navigate('SignInScreen')} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'red',
        justifyContent: 'center',
    },
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

export default SignInScreen 