import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, StyleSheet, AsyncStorage } from 'react-native';

import Button from '../../components/common/button';

const { height } = Dimensions.get('screen');

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/images/welcome-bg.jpg')}
                    style={styles.backgroundImage}
                >
                    <View style={[styles.container, styles.overlay]}>
                        <View></View>
                        <View>
                            <View>
                                <Text style={styles.textStyle}>FOOD</Text>
                                <Text style={styles.textStyle}>TRAVELLED</Text>
                                <Text style={styles.textStyle}>FOR YOU.</Text>
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={styles.description}>
                                    Set exact location to find the right
                                </Text>
                                <Text style={styles.description}>restaurant near you</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ marginBottom: 50 }}>
                                <Button
                                    title="Restaurant Owner"
                                    onPress={() => {
                                        AsyncStorage.setItem('user_type', 'admin');
                                        this.props.navigation.navigate('SignInScreen', {
                                            type: 'admin'
                                        });
                                    }}
                                    style={{ /* some styles for button */ }}
                                    textStyle={{ /* styles for button title */ }}
                                />
                                <Button
                                    title="Restaurant Nearby"
                                    onPress={() => {
                                        AsyncStorage.setItem('user_type', 'user');
                                        this.props.navigation.navigate('SignInScreen', {
                                            type: 'user'
                                        });
                                    }}
                                    style={{ /* some styles for button */ }}
                                    textStyle={{ /* styles for button title */ }}
                                />
                            </View>
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
        justifyContent: 'space-between',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    textStyle: {
        fontSize: 36,
        fontWeight: '700',
        color: '#fff',
    },
    description: {
        color: '#fff',
        fontSize: 16,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 30,
    }
})

export default WelcomeScreen 