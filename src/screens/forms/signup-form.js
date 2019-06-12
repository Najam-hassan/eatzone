import { connect } from "react-redux";
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Field, reduxForm } from 'redux-form/immutable'

import { View, StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen');

import InputField from '../../components/common/input';
import Button from '../../components/common/button';

class SignUpForm extends Component {
    render () {
        const { handleSubmit, onSubmit } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <Field
                        name='name'
                        placeholder='Name'
                        errorTextColor="red"
                        component={InputField}
                        keyboardType='default'
                        customContainerStyle={styles.input}
                        customInputStyle={{ color: "#000" }}
                    />
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
                    <Button
                        title="Sign Up"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                        textStyle={{ /* styles for button title */ }}
                    />
                    <View style={{ flex: 1, justifyContent: 'space-around', marginTop: -20 }}>
                        <View style={styles.textView}>
                            <Text style={styles.textStyle}>
                                Already have an account?
                            <Text
                                    style={styles.signUpTextStyle}
                                    onPress={() => this.props.navigateTo()}
                                > Sign In</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const validate = values => {
    const errors = {};
    if (!values.get('name')) {
        errors.name = '*Required';
    } else if (values.get('name').length < 4) {
        errors.name = "must be at least 4 characters long"
    }
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: values => {
            console.log(values, '......')
        }
    }
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1BA2FC',
        width: width - 50,
        color: 'gray',
        marginTop: 10,
        lineHeight: 37,
        borderRadius: 50,
        textAlign: 'center',
    },
    container: {
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    form: 'SignupForm',
    enableReinitialize: true,
    validate,
})(SignUpForm))
