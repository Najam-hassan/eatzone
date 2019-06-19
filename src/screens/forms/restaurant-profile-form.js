import { connect } from 'react-redux';
import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import TimePicker from "react-native-24h-timepicker";
import { Field, reduxForm } from 'redux-form/immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('screen');

import Button from '../../components/common/button';
import InputField from '../../components/common/input'

import * as actions from '../../actions/restaurant-actions/profile-actions';
import * as selectors from '../../selectors/restaurant-selectors/profile-selectors';

class ProfileForm extends Component {
    state = {
        collect: { collectTimeStart: '00:00', collectTimeEnd: '00:00' },
        deliever: { deliverTimeStart: '00:00', deliverTimeEnd: '00:00' },
        multiSliderValue: [5, 30],
        sliderOneValue: [5],
        location: null,
        region: {
            latitude: 31.47427313,
            longitude: 74.24994869,
            latitudeDelta: 0.38,
            longitudeDelta: 0.38
        },
        canCollect: false,
        canDeliver: false,
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.profile && nextProps.profile.name) {
            this.props.showToaster('Successfully Updated Profile');
            this.props.navigation.navigate('HomeScreen');
        }
    }

    onSubmit = values => {
        const {
            canCollect, canDeliver, collect, deliever, sliderOneValue, region, location
        } = this.state;
        if (values && values.toJS() !== {}) {
            if (canCollect && canDeliver) {
                this.props.onSubmit({
                    ...values.toJS(),
                    canDeliver: canDeliver,
                    canCollect: canCollect,
                    deliverRadius: sliderOneValue[0],
                    collectTimeEnd: collect.collectTimeEnd,
                    deliverTimeEnd: deliever.deliverTimeEnd,
                    collectTimeStart: collect.collectTimeStart,
                    deliverTimeStart: deliever.deliverTimeStart,
                    location: `${region.latitude}, ${region.longitude}`,
                    address: location
                });
            }
        } else if (canCollect) {
            this.props.onSubmit({
                ...values.toJS(),
                canCollect: canCollect,
                collectTimeEnd: collect.collectTimeEnd,
                collectTimeStart: collect.collectTimeStart,
            });
        } else if (canDeliver) {
            this.props.onSubmit({
                ...values.toJS(),
                canDeliver: canDeliver,
                deliverTimeEnd: deliever.deliverTimeEnd,
                deliverTimeStart: deliever.deliverTimeStart,
            });
        }
    }

    sliderOneValuesChange = values => {
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
            sliderOneValue: newValues,
        });
    };

    render () {
        const { handleSubmit, submitting, loading } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <Field
                            name='name'
                            errorTextColor="red"
                            keyboardType='default'
                            component={InputField}
                            placeholder='Resturant Name'
                            customContainerStyle={styles.input}
                            customInputStyle={{ color: "#000" }}
                        />
                        <Field
                            name='phone'
                            errorTextColor="red"
                            style={styles.input}
                            keyboardType='default'
                            component={InputField}
                            placeholder='Restaurant Phone No'
                            customContainerStyle={styles.input}
                            customInputStyle={{ color: "#000" }}
                        />
                        <GooglePlacesAutocomplete
                            placeholder='Restaurant Address'
                            minLength={2}
                            autoFocus={false}
                            returnKeyType={'default'}
                            listViewDisplayed={false}
                            enablePoweredByContainer={false}
                            placeholderTextColor={"#000"}
                            fetchDetails={true}
                            onPress={(data, details = null) => {
                                this.mapView && this.mapView.animateToRegion(details.geometry.location, 500)
                                this.setState({
                                    location:
                                        details.name,
                                    region: {
                                        latitude: parseFloat(
                                            JSON.stringify(details.geometry.location.lat)
                                        ),
                                        longitude: parseFloat(
                                            JSON.stringify(details.geometry.location.lng)
                                        ),
                                        latitudeDelta: 1,
                                        longitudeDelta: 1
                                    }
                                });
                            }}
                            query={{
                                key: 'AIzaSyBcnMFdYtSXJVhPyxqaxKfE3nbvAoRZD_A',
                                language: 'en',
                                components: 'country:us'
                            }}
                            styles={{
                                textInputContainer: {
                                    backgroundColor: "rgba(0,0,0,0)",
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0
                                },
                                container: {
                                    width: width - 50,
                                    borderColor: '#000',
                                    borderBottomWidth: 1,
                                },
                                textInput: {
                                    marginLeft: 0,
                                    marginRight: 0,
                                    height: 44,
                                    color: "#E6464D",
                                    marginTop: 0,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                },
                                predefinedPlacesDescription: {
                                    color: '#E6464D',
                                },
                            }}
                            currentLocation={false}
                            GooglePlacesDetailsQuery={{
                                fields: 'formatted_address',
                            }}
                            debounce={0}
                        />
                        <Field
                            name='addressDetails'
                            errorTextColor="red"
                            style={styles.input}
                            keyboardType='default'
                            component={InputField}
                            placeholder='Add More Details'
                            customContainerStyle={styles.input}
                            customInputStyle={{ color: "#000" }}
                        />
                        <Field
                            name='websiteUrl'
                            errorTextColor="red"
                            style={styles.input}
                            keyboardType='default'
                            component={InputField}
                            placeholder='Website URL'
                            customContainerStyle={styles.input}
                            customInputStyle={{ color: "#000" }}
                        />
                        <View>
                            <CheckBox
                                checked={this.state.canCollect}
                                title='Allow other resturant foods'
                                onPress={() => {
                                    const { canCollect } = this.state;
                                    this.setState({ canCollect: !canCollect })
                                }}
                                textStyle={styles.checbokText}
                            />
                            <Text>
                                Please take the bill from customer ordering restatrant and generate a new a new bill with your service charges
                            </Text>
                        </View>
                        {this.state.canCollect ?
                            <View style={styles.permission}>
                                <View style={styles.timerange}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => this.collectStartTime.open()}
                                            style={styles.timeInput}
                                        >
                                            <Text style={styles.buttonText}>Start Time</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.text}>
                                            {this.state.collect.collectTimeStart}
                                        </Text>
                                        <TimePicker
                                            ref={ref => {
                                                this.collectStartTime = ref;
                                            }}
                                            onCancel={() => {
                                                this.collectStartTime.close();
                                            }}
                                            onConfirm={(hour, minute) => {
                                                this.setState({
                                                    collect: {
                                                        ...this.state.collect,
                                                        collectTimeStart: `${hour}:${minute}`
                                                    }
                                                });
                                                this.collectStartTime.close();
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => this.collectEndTime.open()}
                                            style={styles.timeInput}
                                        >
                                            <Text style={styles.buttonText}>End Time</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.text}>
                                            {this.state.collect.collectTimeEnd}
                                        </Text>
                                        <TimePicker
                                            ref={ref => {
                                                this.collectEndTime = ref;
                                            }}
                                            onCancel={() => this.onCancel()}
                                            onConfirm={(hour, minute) => {
                                                this.setState({
                                                    collect: {
                                                        ...this.state.collect,
                                                        collectTimeEnd: `${hour}:${minute}`
                                                    }
                                                });
                                                this.collectEndTime.close();
                                            }}
                                        />
                                    </View>
                                </View>
                                <Field
                                    name='collectionServiceCharges'
                                    errorTextColor="red"
                                    style={styles.input}
                                    keyboardType='numeric'
                                    component={InputField}
                                    placeholder='Service Charges'
                                    customContainerStyle={styles.input}
                                    customInputStyle={{ color: "#000" }}
                                />

                            </View> : null
                        }
                        <View>
                            <CheckBox
                                checked={this.state.canDeliver}
                                title='Want serve food outside of your restaurant'
                                onPress={() => {
                                    const { canDeliver } = this.state;
                                    this.setState({ canDeliver: !canDeliver })
                                }}
                                textStyle={styles.checbokText}
                            />
                            <Text>
                                You will receive orders through app notifications or directly (through phone #).Customer who order from neighboring resturants, please deleiver their order and give bill (including your service charges)
                            </Text>
                        </View>
                        {this.state.canDeliver ?
                            <View style={styles.permission}>
                                <View >
                                    <MultiSlider
                                        values={this.state.sliderOneValue}
                                        sliderLength={width - 50}
                                        onValuesChange={(values) => {
                                            this.sliderOneValuesChange(values)
                                        }}
                                        min={5}
                                        max={25}
                                        step={1}
                                        trackStyle={{
                                            backgroundColor: '#E6464D',
                                            height: 3
                                        }}
                                        selectedStyle={{
                                            backgroundColor: '#F39423'
                                        }}
                                        containerStyle={{ padding: 15 }}
                                    />
                                </View>
                                <View style={
                                    {
                                        height: 340,
                                        marginHorizontal: 10,
                                        marginBottom: 30,
                                        marginTop: 10
                                    }}>
                                    <MapView
                                        ref={'mapview'}
                                        region={this.state.region}
                                        style={{
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            position: 'absolute',
                                        }}
                                        scrollEnabled={false}
                                        zoomEnabled={false}
                                        pitchEnabled={true}
                                        rotateEnabled={true}
                                        loadingEnabled={true}
                                        loadingIndicatorColor={"#E6464D"}
                                        loadingBackgroundColor={'rgba(0,0,0,0.3)'}
                                    >
                                        <MapView.Circle
                                            ref={'mapview'}
                                            key={this.state.region}
                                            center={this.state.region}
                                            radius={this.state.sliderOneValue[0] * 1000}
                                            strokeColor="#95989A"
                                            strokeWidth={1}
                                            fillColor={'rgba(255,255,255,0.6)'}
                                        />
                                        <Marker
                                            coordinate={this.state.region}
                                        >
                                            <Icon name="map-marker" size={40} color="#E6464D" />
                                        </Marker>
                                    </MapView>
                                </View>
                                <View style={styles.timerange}>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => this.deliverStartTime.open()}
                                            style={styles.timeInput}
                                        >
                                            <Text style={styles.buttonText}>Start Time</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.text}>
                                            {this.state.deliever.deliverTimeStart}
                                        </Text>
                                        <TimePicker
                                            ref={ref => {
                                                this.deliverStartTime = ref;
                                            }}
                                            onCancel={() => {
                                                this.deliverStartTime.close()
                                            }}
                                            onConfirm={(hour, minute) => {
                                                this.setState({
                                                    deliever: {
                                                        ...this.state.deliever,
                                                        deliverTimeStart: `${hour}:${minute}`
                                                    }
                                                });
                                                this.deliverStartTime.close();
                                            }}
                                        />
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => this.deliverEndTime.open()}
                                            style={styles.timeInput}
                                        >
                                            <Text style={styles.buttonText}>End Time</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.text}>
                                            {this.state.deliever.deliverTimeEnd}
                                        </Text>
                                        <TimePicker
                                            ref={ref => {
                                                this.deliverEndTime = ref;
                                            }}
                                            onCancel={() => this.onCancel()}
                                            onConfirm={(hour, minute) => {
                                                this.setState({
                                                    deliever: {
                                                        ...this.state.deliever,
                                                        deliverTimeEnd: `${hour}:${minute}`
                                                    }
                                                });
                                                this.deliverEndTime.close();
                                            }}
                                        />
                                    </View>
                                </View>
                                <Field
                                    errorTextColor="red"
                                    style={styles.input}
                                    keyboardType='numeric'
                                    component={InputField}
                                    name='deliveryServiceCharges'
                                    placeholder='Service Charges'
                                    customContainerStyle={styles.input}
                                    customInputStyle={{ color: "#000" }}
                                />
                            </View> : null
                        }
                        {submitting || loading ?
                            <ActivityIndicator size="large" color="#1BA2FC" /> :
                            <Button
                                title="Continue"
                                onPress={handleSubmit(this.onSubmit)}
                                style={styles.button}
                                textStyle={{ /* styles for button title */ }}
                            />
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const validate = values => {
    const errors = {};
    if (!values.get('name')) {
        errors.name = '*Required';
    } else if (values.get('name').length < 4) {
        errors.name = 'name must have at least 4 charecters long!'
    }
    if (!values.get('phone')) {
        errors.phone = '*Required';
    } else if (values.get('phone').length < 9) {
        errors.phone = "must be at least 9 characters long"
    }
    if (!values.get('address')) {
        errors.address = '*Required';
    }
    if (!values.get('collectionServiceCharges')) {
        errors.collectionServiceCharges = '*Required';
    } else if (values.get('collectionServiceCharges') < 0) {
        errors.collectionServiceCharges = "Must be greater the zero"
    }
    if (!values.get('deliveryServiceCharges')) {
        errors.deliveryServiceCharges = '*Required';
    } else if (values.get('deliveryServiceCharges') < 0) {
        errors.deliveryServiceCharges = "Must be greater the zero"
    }

    return errors;
};


const mapStateToProps = state => ({
    loading: selectors.makeSelectProfileLoading()(state),
    profile: selectors.makeSelectProflieData()(state),
});

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: values => dispatch(actions.updateProfileAction(values)),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: 15,
    },
    button: {
        color: 'gray',
        marginTop: 10,
        lineHeight: 37,
        borderRadius: 50,
        width: width - 50,
        textAlign: 'center',
        backgroundColor: '#1BA2FC',
    },
    input: {
        width: width - 50,
        borderBottomWidth: 1,
    },
    timeInput: {
    },
    checbokText: {
        color: '#000',
        fontSize: 12,
    },
    permission: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    timerange: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        // color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600"
    },
    text: {
        fontSize: 20,
        marginTop: 10
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'ResturantProfileForm',
    enableReinitialize: true,
    validate,
})(ProfileForm))