import { connect } from "react-redux";
import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { Field, reduxForm, initialize } from 'redux-form/immutable'

import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'

const { width, height } = Dimensions.get('screen');

import InputField from '../../components/common/input';
import Button from '../../components/common/button';

import * as actions from '../../actions/auth-actions'
import * as selectors from '../../selectors/auth-selectors'

class SignInForm extends Component {

    componentDidMount () {
        this.props.initializeForm()
    }

    // componentWillReceiveProps (nextProps) {
    //     if (nextProps.user !== null) {
    //         try {
    //             AsyncStorage.setItem(
    //                 'user',
    //                 JSON.stringify(nextProps.user),
    //                 () => {
    //                     this.props.navigateTo('HomeScreen');
    //                     this.forceUpdate();
    //                 }
    //             );
    //         } catch (error) {
    //         }
    //     }
    // }

    render () {
        const { handleSubmit, onSubmit, submitting, loading } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <Field
                        name='email'
                        placeholder='Email'
                        errorTextColor="red"
                        component={InputField}
                        keyboardType='email-address'
                        customContainerStyle={styles.input}
                        customInputStyle={{ color: "#000" }}
                    />
                    <Field
                        name='password'
                        errorTextColor="red"
                        style={styles.input}
                        placeholder='Password'
                        keyboardType='default'
                        component={InputField}
                        secureTextEntry={true}
                        customContainerStyle={styles.input}
                        customInputStyle={{ color: "#000" }}
                    />
                    {submitting || loading ?
                        <ActivityIndicator size="large" color="#1BA2FC" /> :
                        <Button
                            title="Sign In"
                            onPress={handleSubmit(onSubmit)}
                            style={styles.button}
                            textStyle={{ /* styles for button title */ }}
                        />}
                    <View style={{ marginTop: 10 }}>
                        <Text style={[styles.textStyle, {}]}>Forgot Password?</Text>
                    </View>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Text style={styles.textStyle}>
                        Doesn't have an account yet?
                            <Text
                            style={styles.signUpTextStyle}
                            onPress={() => this.props.navigateTo('SignUpScreen')}
                        > Sign Up</Text>
                    </Text>
                </View>
            </View>
        )
    }
}

const validate = values => {
    const errors = {};
    if (!values.get('email')) {
        errors.email = '*Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
        errors.email = 'not valid email!'
    }
    if (!values.get('password')) {
        errors.password = '*Required';
    } else if (values.get('password').length < 6) {
        errors.password = "must be at least 6 characters long"
    }

    return errors;
};

const mapStateToProps = state => ({
    user: selectors.makeSelectData()(state),
    loading: selectors.makeSelectLoading()(state)
});

const mapDispatchToProps = dispatch => {
    return {
        initializeForm: () => dispatch(initialize('SigninForm', {
            email: 'test@gmail.com', password: '12345678'
        })),
        onSubmit: values => {
            const { email, password } = values && values.toJS();
            dispatch(actions.loginAction({ email: email, password: password }));
        }
    }
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#1BA2FC',
        width: width - 50,
        color: 'gray',
        marginTop: 10,
        lineHeight: 37,
        borderRadius: 50,
        textAlign: 'center',
    },
    input: {
        borderRadius: 50,
        width: width - 50,
        backgroundColor: '#F0F1F3'
    },
    textStyle: {
        textAlign: 'center',
        color: '#000',
        fontWeight: "400"
    },
    signUpTextStyle: {
        color: '#1BA2FC',
        fontWeight: "800"
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'SigninForm',
    enableReinitialize: true,
    validate,
})(SignInForm))
