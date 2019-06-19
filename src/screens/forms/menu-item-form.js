import { connect } from 'react-redux';
import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import PhotoUpload from 'react-native-photo-upload';
import { Field, reduxForm } from 'redux-form/immutable';
import {
    View, ActivityIndicator, StyleSheet, Dimensions, Image
} from 'react-native';

const { width, height } = Dimensions.get('screen');

import { fetchCategoryListAction } from '../../actions/restaurant-actions/home-actions';
import * as actions from '../../actions/restaurant-actions/category-item-actions';
import * as selectors from '../../selectors/restaurant-selectors/category-item-selectors';

import Button from '../../components/common/button';
import InputField from '../../components/common/input';
import TextAreaFiled from '../../components/common/text-area';

class MenuItemForm extends Component {

    componentWillReceiveProps (nextProps) {
        const { categoryId } = this.props;
        if (nextProps.categoryItem && nextProps.categoryItem.name) {
            this.refs.toast.show('Category created successfully', 1500);
            this.props.navigation.navigate('MenuItemsScreen', {
                catId: categoryId
            })
            this.props.fetchList();
            this.props.resetState();
        }
    }

    onSubmit = values => {
        const { categoryId } = this.props;
        if (values && values.toJS()) {
            this.props.onSubmit(categoryId, {
                ...values.toJS(),
                imageUrl: 'https://pune365.com/wp-content/uploads/2017/02/30287438_l.jpg'
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
                            resizeMode='cover'
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
                        <Field
                            name='price'
                            errorTextColor="red"
                            keyboardType='number-pad'
                            component={InputField}
                            placeholder='Price'
                            customContainerStyle={styles.input}
                            customInputStyle={{ color: "#000" }}
                        />
                        <Field
                            name='description'
                            errorTextColor="red"
                            keyboardType='default'
                            component={TextAreaFiled}
                            placeholder='Enter Category Name'
                            customContainerStyle={[styles.input, {
                                height: 100,
                                borderRadius: 10
                            }]}
                            description={true}
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
    if (!values.get('description')) {
        errors.description = '*Required';
    } else if (values.get('description').length < 10) {
        errors.description = "must be at least 10 characters long"
    }
    if (!values.get('price')) {
        errors.price = '*Required';
    } else if (!/^[+]?([.]\d+|\d+[.]?\d*)$/i.test(values.get('price'))) {
        errors.price = "Price must be greater than 0"
    }

    return errors;
};

const mapStateToProps = state => ({
    loading: selectors.makeSelectLoading()(state),
    listLoading: selectors.makeSelectListLoading()(state),
    categoryItem: selectors.makeSelectCategoryItem()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (catId, values) => {
            dispatch(actions.addCategoryItemAction(catId, values))
        },
        fetchList: () => dispatch(fetchCategoryListAction()),
        resetState: () => dispatch(actions.resetState()),
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
    form: 'MenuItemForm',
    enableReinitialize: true,
    validate,
})(MenuItemForm));