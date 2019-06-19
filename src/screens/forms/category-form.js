import { connect } from 'react-redux';
import React, { Component } from 'react';
import PhotoUpload from 'react-native-photo-upload';
import { Field, reduxForm } from 'redux-form/immutable';
import Toast from 'react-native-easy-toast';
import {
    View, ActivityIndicator, StyleSheet, Dimensions, Image
} from 'react-native';

const { width, height } = Dimensions.get('screen');

import * as actions from '../../actions/restaurant-actions/category-actions';
import * as selectors from '../../selectors/restaurant-selectors/category-selectors';

import InputField from '../../components/common/input';
import Button from '../../components/common/button';

class CategoryForm extends Component {

    componentWillReceiveProps (nextProps) {
        if (nextProps.category && nextProps.category.name) {
            this.refs.toast.show('Category created successfully', 1500);
            this.props.navigation.navigate('HomeScreen');
            this.props.resetState();
        }
    }

    onSubmit = values => {
        if (values && values.toJS()) {
            this.props.addCategory({
                ...values.toJS(),
                imageUrl: 'https://smppharmacy.com/wp-content/uploads/2019/02/food-post.jpg'
            });
        }
    }

    render () {
        const { handleSubmit, submitting, loading } = this.props;
        return (
            <View style={styles.container}>
                <Toast
                    ref="toast"
                    position='bottom'
                    fadeOutDuration={3000}
                    textStyle={{ color: '#fff' }}
                />
                <View>
                    <PhotoUpload
                        onPhotoSelect={avatar => {
                            if (avatar) {
                                console.log('Image base64 string: ', avatar)
                            }
                        }}
                        containerStyle={{
                            marginBottom: 15,
                        }}
                    >
                        <Image
                            style={{
                                width: width,
                                height: 200,
                            }}
                            source={{
                                uri: 'https://smppharmacy.com/wp-content/uploads/2019/02/food-post.jpg'
                            }}
                            // source={require('../../assets/images/itemi.jpg')}
                            resizeMode='stretch'
                        />
                    </PhotoUpload>
                    <View style={[styles.container, {
                        paddingTop: 20,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }]}>
                        <Field
                            name='name'
                            errorTextColor="red"
                            keyboardType='default'
                            component={InputField}
                            placeholder='Enter Category Name'
                            customContainerStyle={styles.input}
                            customInputStyle={{ color: "#000" }}
                        />
                        {submitting || loading ?
                            <ActivityIndicator size="large" color="#1BA2FC" /> :
                            <Button
                                title="Save"
                                onPress={handleSubmit(this.onSubmit)}
                                style={styles.button}
                                textStyle={{ /* styles for button title */ }}
                            />
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.get('name')) {
        errors.name = '*Required';
    } else if (values.get('name').length < 5) {
        errors.name = "must be at least 5 characters long"
    }

    return errors;
};

const mapStateToProps = state => ({
    loading: selectors.makeSelectLoading()(state),
    category: selectors.makeSelectCategory()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState()),
        addCategory: category => dispatch(actions.addCategoryAction(category)),
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column',
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
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'CategoryForm',
    enableReinitialize: true,
    validate,
})(CategoryForm));