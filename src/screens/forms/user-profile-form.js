import { connect } from 'react-redux';
import React, { Component } from 'react';
import PhotoUpload from 'react-native-photo-upload';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('screen');

import Button from '../../components/common/button';
import InputField from '../../components/common/input';
import * as actions from '../../actions/user-actions/profile-actions';
import * as selectors from '../../selectors/user-selectors/profile-selectors';

class UserProfileForm extends Component {

    state = {
        submitting: false,
        avatarUrl: '',
    }

    componentDidMount () {
        this.props.profileDetails();
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps);
        if (nextProps.profile && Object.keys(nextProps.profile).length) {
            this.props.change('name', nextProps.profile.name);
            this.props.change('email', nextProps.profile.email);
            this.props.change('phone', nextProps.profile.phone);
            this.setState({ avatarUrl: nextProps.profile.avatarUrl })
            this.props.resetState();
            this.setState({ submitting: false });
        }
    }

    onSubmit = values => {
        const { avatarUrl } = this.state;
        this.setState({ submitting: true });
        if (avatarUrl) {
            this.props.profileDetails({
                ...values.toJS(),
                avatarData: `data:image/jpeg;base64,${avatarUrl}`
            });
        } else {
            this.props.profileDetails(values.toJS())
        }
    }

    render () {
        const { loading, submitting, handleSubmit } = this.props;
        if (loading && !this.state.submitting) {
            return <View>
                <ActivityIndicator color={'#1BA2FC'} size={'large'} />
            </View>
        }
        return (
            <View style={styles.container}>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                            console.log('Image base64 string: ', avatar);
                            this.setState({ avatarUrl: avatar })
                        }
                    }}
                >{this.state.avatarUrl !== '' ?
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            paddingVertical: 30,
                        }}
                        resizeMode='cover'
                        source={{ uri: this.state.avatarUrl }}
                    /> :
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                            paddingVertical: 30,
                        }}
                        resizeMode='cover'
                        source={require('../../assets/images/account.png')}
                    />
                    }
                </PhotoUpload>
                <View style={{ marginTop: 20 }}>
                    <Field
                        name='name'
                        placeholder='Name'
                        errorTextColor="red"
                        component={InputField}
                        keyboardType='email-address'
                        customContainerStyle={styles.input}
                        customInputStyle={{ color: "#000" }}
                    />
                    <Field
                        name='email'
                        editable={false}
                        placeholder='Email'
                        errorTextColor="red"
                        keyboardType='default'
                        component={InputField}
                        customContainerStyle={styles.input}
                        customInputStyle={{ color: "#000" }}
                    />
                    <Field
                        name='phone'
                        errorTextColor="red"
                        placeholder='Phone No'
                        component={InputField}
                        keyboardType='phone-pad'
                        customContainerStyle={styles.input}
                        customInputStyle={{ color: "#000" }}
                    />
                    {submitting || loading ?
                        <ActivityIndicator size="large" color="#1BA2FC" /> :
                        <Button
                            title="Update"
                            onPress={handleSubmit(this.onSubmit)}
                            style={styles.button}
                            textStyle={{ /* styles for button title */ }}
                        />
                    }
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
    if (!values.get('name')) {
        errors.name = '*Required';
    } else if (values.get('name').length < 4) {
        errors.name = 'name must have at least 5 charecters long!'
    }
    if (!values.get('phone')) {
        errors.phone = '*Required';
    } else if (values.get('phone').length < 9) {
        errors.phone = "must be at least 9 characters long"
    }

    return errors;
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    input: {
        borderRadius: 50,
        width: width - 50,
        backgroundColor: '#F0F1F3'
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
});

const mapStateToProps = state => ({
    error: selectors.makeSelectProfileError()(state),
    profile: selectors.makeSelectProfileData()(state),
    success: selectors.makeSelectUpdateStatue()(state),
    loading: selectors.makeSelectProfileLoading()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState()),
        profileDetails: (data) => dispatch(actions.profileDetailsAction(data)),
        change: (fieldName, value) => {
            dispatch(change('UserProfileForm', fieldName, value));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'UserProfileForm',
    enableReinitialize: true,
    validate,
})(UserProfileForm));