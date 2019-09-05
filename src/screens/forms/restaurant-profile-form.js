import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import TimePicker from "react-native-24h-timepicker";
import DateTimePicker from "react-native-modal-datetime-picker";

import { Field, reduxForm } from 'redux-form/immutable';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  View, Text, StyleSheet, Dimensions, ScrollView, Platform,
  TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView
} from 'react-native';

const { width, height } = Dimensions.get('screen');

import Button from '../../components/common/button';
import InputField from '../../components/common/materialInput';

import * as actions from '../../actions/restaurant-actions/profile-actions';
import * as selectors from '../../selectors/restaurant-selectors/profile-selectors';

import { isAlphabetsWithSpecialChar, isValidNumber } from '../../utils/regex';

class ProfileForm extends Component {
  state = {
    collect: { collectTimeStart: '', collectTimeEnd: '' },
    deliver: { deliverTimeStart: '', deliverTimeEnd: '' },
    message: '',
    googlePlaceId: null,
    sliderOneValue: [1],
    location: 'Restaurant Address',
    region: {
      latitude: 31.47427313,
      longitude: 74.24994869,
      latitudeDelta: 0.38,
      longitudeDelta: 0.38
    },
    canCollect: false,
    canDeliver: false,
    editing: true,
    collectTimeStartPicker: false,
    collectTimeEndPicker: false,
    deliverTimeStartPicker: false,
    deliverTimeEndPicker: false
  }

  isUpdating = () => {
    const { isEdit, isExisted } = this.props;
    if (isEdit && isExisted && isExisted.code === 200) {
      return true
    } else if (isEdit && Object.keys(isExisted).length <= 0) {
      return true
    } else if (!isEdit && isExisted && isExisted.code == 200) {
      return true
    } else {
      return false
    }
  }

  onSubmit = values => {
    const {
      canCollect, canDeliver, collect, deliver, sliderOneValue, region, location, googlePlaceId
    } = this.state;
    const formValues = {
      ...values.toJS(),
      addressDetails: values.get('addressDetails') !== '' ?
        values.get('addressDetails') : " ",
      address: location,
      canDeliver: canDeliver,
      canCollect: canCollect,
      location: `${region.latitude}, ${region.longitude}`,
      googlePlaceId: googlePlaceId && googlePlaceId || null,
    }

    if (!this.isUpdating()) {
      return Alert.alert(
        "Required",
        'Please add restaurant address to continue.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }

    if (values && values.toJS() !== {} && this.isUpdating()) {
      if (!canCollect && !canDeliver) {
        return Alert.alert(
          "Required",
          'Must have to select one option (Allow or serve foods)',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (canCollect && canDeliver) {
        if ((collect.collectTimeStart !== '' &&
          collect.collectTimeEnd !== '') &&
          (deliver.deliverTimeStart !== '' &&
            deliver.deliverTimeEnd !== '')) {
          this.props.onSubmitForm({
            ...formValues,
            deliverRadius: sliderOneValue[0] * 1000,
            collectTimeEnd: collect.collectTimeEnd,
            deliverTimeEnd: deliver.deliverTimeEnd,
            collectTimeStart: collect.collectTimeStart,
            deliverTimeStart: deliver.deliverTimeStart,
          });
        } else {
          return Alert.alert(
            "Required",
            'Please select start and end time!',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
          );
        }
      } else if (canCollect) {
        if ((collect.collectTimeStart !== '' &&
          collect.collectTimeEnd !== '')) {
          this.props.onSubmitForm({
            ...formValues,
            deliverRadius: sliderOneValue[0] * 1000,
            collectTimeEnd: collect.collectTimeEnd,
            collectTimeStart: collect.collectTimeStart,
          });
        } else return Alert.alert(
          "Required",
          'Please select dine in start and end time',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else if (canDeliver) {
        if ((deliver.deliverTimeStart !== '' &&
          deliver.deliverTimeEnd !== '')) {
          this.props.onSubmitForm({
            ...formValues,
            deliverRadius: sliderOneValue[0] * 1000,
            deliverTimeEnd: deliver.deliverTimeEnd,
            deliverTimeStart: deliver.deliverTimeStart,
          });
        } else return Alert.alert(
          "Required",
          'Please select delivery start and end time',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else {
        this.props.onSubmitForm({
          ...formValues,
        })
      }
    }
    this.setState({ googlePlaceId: null });
  };

  sliderOneValuesChange = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { profile, isEdit } = this.props;
    if (isEdit && profile && profile.name && this.state.editing) {
      this.setState({ editing: false });
      let newValues = [0];
      if (profile.deliverRadius) {
        newValues[0] = profile.deliverRadius / 1000;
        if (newValues[0] > 20) {
          newValues[0] = 20;
          this.setState({
            sliderOneValue: newValues
          });
        } else {
          this.setState({
            sliderOneValue: newValues
          });
        }
      }
      this.props.change("name", profile.name ? profile.name : '');
      this.props.change("phone", profile.phone ? profile.phone : '');
      this.props.change("websiteUrl", profile.websiteUrl ? profile.websiteUrl : '');
      this.props.change("addressDetails", profile.addressDetails ?
        profile.addressDetails : ''
      );
      this.props.change(
        "collectionServiceCharges", profile.collectionServiceCharges ? profile.collectionServiceCharges.toString() : '0'
      );
      this.props.change(
        "deliveryServiceCharges", profile.deliveryServiceCharges ? profile.deliveryServiceCharges.toString() : '0'
      );
      if (profile.canCollect === true) {
        this.setState({
          canCollect: true,
          collect: {
            ...this.state.collect,
            collectTimeEnd: profile.collectTimeEnd,
            collectTimeStart: profile.collectTimeStart,
          }
        });
      }
      if (profile.canDeliver === true) {
        this.setState({
          canDeliver: true,
          deliver: {
            ...this.state.deliver,
            deliverTimeStart: profile.deliverTimeStart,
            deliverTimeEnd: profile.deliverTimeEnd,
          }
        });
      }
      this.setState({
        location: profile.address ? profile.address : 'Restaurant Address',
      });
      if (profile.location) {
        this.setState({
          region: {
            ...this.state.region,
            latitude: profile.location.coordinates[1],
            longitude: profile.location.coordinates[0],
          }
        });
      }
    }
  }

  renderFormBody = () => {
    const { handleSubmit, submitting, loading, isEdit, isExisted } = this.props;
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Field
            name='name'
            errorTextColor="red"
            keyboardType='default'
            component={InputField}
            placeholder={'Restaurant Name'}
            customContainerStyle={styles.input}
            customInputStyle={[styles.inputField]}
          />
          <Field
            name='phone'
            errorTextColor="red"
            style={styles.input}
            keyboardType='numeric'
            component={InputField}
            placeholder='Restaurant Phone No'
            customContainerStyle={styles.input}
            customInputStyle={[styles.inputField]}
          />
          <GooglePlacesAutocomplete
            minLength={2}
            autoFocus={false}
            fetchDetails={true}
            returnKeyType={'default'}
            listViewDisplayed={false}
            placeholderTextColor={"#000"}
            enablePoweredByContainer={false}
            placeholder={this.state.location}
            onPress={(data, details = null) => {
              this.props.checkResturantExist(details.id);
              this.mapView && this.mapView.animateToRegion(details.geometry.location, 500)
              this.setState({
                googlePlaceId: details.id,
                location:
                  details.name,
                region: {
                  ...this.state.region,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                }
              });
            }}
            query={{
              key: 'AIzaSyBJX4U1PDcgBCoR6gL4mCVedWFApQ8MWTs',
              language: 'en',
              components: 'country:us'
            }}
            styles={{
              textInputContainer: {
                borderTopWidth: 0,
                borderBottomWidth: 0,
                height: 50,
              },
              container: {
                // width: width - 50,
                paddingTop: 20,
                borderColor: '#000',
                borderBottomWidth: 1,
                borderBottomColor: '#d9d9d9',
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height: 50,
                color: "#2b2b2b",
                fontSize: 16,
                marginTop: 0,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
              },
              predefinedPlacesDescription: {
                color: '#2b2b2b',
              },
            }}
            currentLocation={false}
            GooglePlacesDetailsQuery={{
              fields: 'formatted_address',
            }}
            debounce={0}
          />
          {isExisted && isExisted.code === 400 ?
            <Text style={styles.errorTextStyle}>
              {isExisted.message}
            </Text> : null}
          <Field
            name='addressDetails'
            errorTextColor="red"
            style={styles.input}
            keyboardType='default'
            component={InputField}
            notRequired={true}
            placeholder='Add More Details'
            customContainerStyle={styles.input}
            customInputStyle={[styles.inputField]}
          />
          <Field
            name='websiteUrl'
            errorTextColor="red"
            style={styles.input}
            keyboardType='default'
            component={InputField}
            notRequired={true}
            placeholder='Website URL'
            customContainerStyle={styles.input}
            customInputStyle={[styles.inputField]}
          />
          <View style={styles.checkBoxRow}>
            <CheckBox
              checked={this.state.canCollect}
              textStyle={styles.checkBoxText}
              title='Allow other restaurant foods'
              containerStyle={styles.checkBoxContainer}
              onPress={() => {
                const { canCollect } = this.state;
                this.setState({ canCollect: !canCollect })
              }}
            />
            <Text style={styles.checkBoxDescrip}>
              Please take the bill from customer ordering restaurant and generate a new bill with your service charges.
              </Text>
          </View>
          {this.state.canCollect ?
            <View style={styles.permission}>
              <Text style={[styles.timeText, {
                marginTop: 16, fontSize: 16, fontWeight: '600'
              }]}>
                Select prefer time
                                </Text>
              <View style={styles.timeRange}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ collectTimeStartPicker: true })
                    }}
                    style={styles.timeInput}
                  >
                    <Text style={styles.timeText}>Start Time *</Text>
                  </TouchableOpacity>
                  {this.state.collect.collectTimeStart !== '' ?
                    <Text
                      onPress={() => {
                        this.setState({ collectTimeStartPicker: true })
                      }}
                      style={styles.text}
                    >
                      {moment(this.state.collect.collectTimeStart, "h:mm:ss").format("h:mm A")}
                    </Text> : <Text
                      onPress={() => {
                        this.setState({ collectTimeStartPicker: true })
                      }}
                      style={styles.text}
                    >
                      Select Time
                      </Text>}
                  <DateTimePicker
                    isVisible={this.state.collectTimeStartPicker}
                    onConfirm={(date) => {
                      parsedDate = moment(date, 'ddd MMM DD YYYY, HH:mm').format('HH:mm')
                      this.setState({
                        collectTimeStartPicker: false,
                        collect: {
                          ...this.state.collect,
                          collectTimeStart: `${parsedDate}`
                        }
                      });
                    }}
                    onCancel={() => {
                      this.setState({ collectTimeStartPicker: false })
                    }}
                    mode={'time'}
                  />


                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ collectTimeEndPicker: true })
                    }}
                    style={styles.timeInput}
                  >
                    <Text style={styles.timeText}>End Time *</Text>
                  </TouchableOpacity>
                  {this.state.collect.collectTimeEnd !== '' ?
                    <Text
                      onPress={() => {
                        this.setState({ collectTimeEndPicker: true })
                      }}
                      style={styles.text}
                    >
                      {moment(this.state.collect.collectTimeEnd, "h:mm:ss").format("h:mm A")}
                    </Text> : <Text
                      onPress={() => {
                        this.setState({ collectTimeEndPicker: true })
                      }}
                      style={styles.text}
                    >
                      Select Time
                      </Text>}
                  <DateTimePicker
                    isVisible={this.state.collectTimeEndPicker}
                    onConfirm={(date) => {
                      parsedDate = moment(date, 'ddd MMM DD YYYY, HH:mm').format('HH:mm')
                      this.setState({
                        collectTimeEndPicker: false,
                        collect: {
                          ...this.state.collect,
                          collectTimeEnd: `${parsedDate}`
                        }
                      });
                    }}
                    onCancel={() => {
                      this.setState({ collectTimeEndPicker: false })
                    }}
                    mode={'time'}
                  />
                </View>
              </View>
              <Field
                name='collectionServiceCharges'
                errorTextColor="red"
                style={styles.input}
                keyboardType='numeric'
                component={InputField}
                placeholder='Service Charges %'
                customContainerStyle={styles.input}
                customInputStyle={[styles.inputField, { paddingVertical: 22, }]}
              />

            </View> : null
          }
          <View style={styles.checkBoxRow}>
            <CheckBox
              checked={this.state.canDeliver}
              textStyle={styles.checkBoxText}
              containerStyle={styles.checkBoxContainer}
              title='Offer your food to be served to other restaurants'
              onPress={() => {
                const { canDeliver } = this.state;
                this.setState({ canDeliver: !canDeliver })
              }}
            />
            <Text style={styles.checkBoxDescrip}>
              You will receive orders through app notifications or directly (through phone #), customer who order from neighbouring restaurants, please deliver their order and give bill (including your service charges).
              </Text>
          </View>
          {this.state.canDeliver ?
            <View style={styles.multiSlider}>
              <View style={styles.multiSliderRow}>
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-between'
                }}>
                  <Text style={styles.radiusText}>1Km</Text>
                  <Text style={styles.radiusText}>
                    {this.state.sliderOneValue[0]}Km
                                        </Text>
                  <Text style={styles.radiusText}>20Km</Text>
                </View>
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-between'
                }}>
                  <Text style={styles.radiusText}>1Mi</Text>
                  <Text style={styles.radiusText}>
                    {(this.state.sliderOneValue[0] * 0.621371).toFixed(1)}Mi
                                        </Text>
                  <Text style={styles.radiusText}>20Mi</Text>
                </View>
                <MultiSlider
                  values={this.state.sliderOneValue}
                  sliderLength={width - 55}
                  onValuesChange={(values) => {
                    this.sliderOneValuesChange(values)
                  }}
                  min={1}
                  max={20}
                  step={1}
                  trackStyle={{
                    backgroundColor: '#d9d9d9',
                    height: 5,
                    borderRadius: 10,
                  }}
                  selectedStyle={{
                    backgroundColor: '#00a0ff'
                  }}
                  markerStyle={styles.markerStyle}
                  containerStyle={{ padding: 12 }}
                />
              </View>
              <View style={
                {
                  height: 340,
                  marginTop: 10,
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
                  // maxZoomLevel={8}
                  zoomEnabled={false}
                  pitchEnabled={true}
                  rotateEnabled={true}
                  scrollEnabled={false}
                  loadingEnabled={true}
                  loadingIndicatorColor={"#E6464D"}
                  loadingBackgroundColor={'rgba(0,0,0,0.3)'}
                >
                  <MapView.Circle
                    ref={'mapview'}
                    strokeWidth={1}
                    strokeColor="#95989A"
                    key={this.state.region}
                    center={this.state.region}
                    fillColor={'rgba(255,255,255,0.6)'}
                    radius={this.state.sliderOneValue[0] * 1000}
                  />
                  <Marker
                    coordinate={this.state.region}
                  >
                    <Icon name="map-marker" size={40} color="#E6464D" />
                  </Marker>
                </MapView>
              </View>
              <Text style={[styles.timeText, {
                marginTop: 16, fontSize: 16, fontWeight: '600'
              }]}>
                Select prefer time
                                </Text>
              <View style={styles.timeRange}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ deliverTimeStartPicker: true })
                    }}
                    style={styles.timeInput}
                  >
                    <Text style={styles.timeText}>Start Time *</Text>
                  </TouchableOpacity>

                  {this.state.deliver.deliverTimeStart !== '' ?
                    <Text
                      onPress={() => {
                        this.setState({ deliverTimeStartPicker: true })
                      }}
                      style={styles.text}
                    >
                      {moment(this.state.deliver.deliverTimeStart, "h:mm:ss").format("h:mm A")}
                    </Text> : <Text
                      onPress={() => {
                        this.setState({ deliverTimeStartPicker: true })
                      }}
                      style={styles.text}
                    >
                      Select Time
                      </Text>}

                  <DateTimePicker
                    isVisible={this.state.deliverTimeStartPicker}
                    onConfirm={(date) => {
                      parsedDate = moment(date, 'ddd MMM DD YYYY, HH:mm').format('HH:mm')
                      this.setState({
                        deliverTimeStartPicker: false,
                        deliver: {
                          ...this.state.deliver,
                          deliverTimeStart: `${parsedDate}`
                        }
                      });
                    }}
                    onCancel={() => {
                      this.setState({ deliverTimeStartPicker: false })
                    }}
                    mode={'time'}
                  />

                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ deliverTimeEndPicker: true })
                    }}
                    style={styles.timeInput}
                  >
                    <Text style={styles.timeText}>End Time *</Text>
                  </TouchableOpacity>

                  {this.state.deliver.deliverTimeEnd !== '' ?
                    <Text
                      onPress={() => {
                        this.setState({ deliverTimeEndPicker: true })
                      }}
                      style={styles.text}
                    >
                      {moment(this.state.deliver.deliverTimeEnd, "h:mm:ss").format("h:mm A")}
                    </Text> : <Text
                      onPress={() => {
                        this.setState({ deliverTimeEndPicker: true })
                      }}
                      style={styles.text}
                    >
                      Select Time
                      </Text>}
                  <DateTimePicker
                    isVisible={this.state.deliverTimeEndPicker}
                    onConfirm={(date) => {
                      parsedDate = moment(date, 'ddd MMM DD YYYY, HH:mm').format('HH:mm')
                      this.setState({
                        deliverTimeEndPicker: false,
                        deliver: {
                          ...this.state.deliver,
                          deliverTimeEnd: `${parsedDate}`
                        }
                      });
                    }}
                    onCancel={() => {
                      this.setState({ deliverTimeEndPicker: false })
                    }}
                    mode={'time'}
                  />
                </View>
              </View>
              <Field
                errorTextColor="red"
                style={styles.input}
                keyboardType='numeric'
                component={InputField}
                name='deliveryServiceCharges'
                placeholder='Service Charges %'
                customContainerStyle={styles.input}
                customInputStyle={[styles.inputField, { paddingVertical: 22, }]}
              />
            </View> : null
          }
          {submitting || (!this.state.editing && loading) ?
            <ActivityIndicator size="large" color="#1BA2FC" /> :
            <Button
              title={isEdit ? "Update" : "Continue"}
              onPress={handleSubmit(this.onSubmit)}
              style={styles.button}
              textStyle={{ /* styles for button title */ }}
            />
          }
        </View>
      </ScrollView>
    )
  }


  render() {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.container}>
          {this.renderFormBody()}
        </View>
      )
    }
    return (
      <KeyboardAvoidingView
        style={[styles.container]}
        behavior="padding"
        keyboardVerticalOffset={20}>
        {this.renderFormBody()}
      </KeyboardAvoidingView>
    )
  }
}

const validate = values => {
  const errors = {};
  if (!values.get('name')) {
    errors.name = '*Required';
  } else if (isAlphabetsWithSpecialChar(values.get('name'))) {
    errors.name = 'numeric values not allowed'
  } else if (values.get('name').length < 4) {
    errors.name = 'name must be 4 characters long!'
  } else if (values.get('name').length > 40) {
    errors.name = 'name must be less than 40 characters!'
  }
  if (!values.get('phone')) {
    errors.phone = '*Required';
  } else if (!isValidNumber(values.get('phone'))) {
    errors.phone = "Only number allowed "
  } else if (values.get('phone').length !== 10) {
    errors.phone = "must be 10 characters long"
  }
  if (!values.get('collectionServiceCharges')) {
    errors.collectionServiceCharges = "Please enter service charges."
  } else if (values.get('collectionServiceCharges') >= 0) { }
  if (!values.get('deliveryServiceCharges')) {
    errors.deliveryServiceCharges = "Please enter service charges."
  } else if (values.get('deliveryServiceCharges') >= 0) { }

  return errors;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  formGroup: {
    padding: 0,
    margin: 0,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
    height: 60,
  },
  inputField: {
    fontSize: 16,
    color: '#2b2b2b',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  timeInput: {
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 0,
    borderWidth: 0,
    paddingLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  checkBoxRow: {
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  checkBoxText: {
    fontSize: 16,
    color: '#2b2b2b',
    fontWeight: '400',
  },
  checkBoxDescrip: {
    color: '#aaa1a1',
    fontSize: 15,
    marginTop: 6,
    marginLeft: 34,
  },
  permission: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  timeRange: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    paddingVertical: 22,
  },
  button: {
    marginVertical: 24,
  },
  timeText: {
    fontSize: 16,
    color: '#2b2b2b',
    fontWeight: '400',
  },
  text: {
    fontSize: 14,
  },
  multiSlider: {
    marginLeft: 0,
  },
  multiSliderRow: {
    marginTop: 8,
  },
  markerStyle: {
    top: 2,
    width: 25,
    height: 25,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#00a0ff',
  },
  radiusText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400'
  },
  errorTextStyle: {
    fontSize: 12,
    color: 'red',
    fontWeight: '400',
    textAlign: 'right',
  },
});

mapStateToProps = state => ({
  isExisted: selectors.makeSelectIsExisted()(state)
});

mapDispatchToProps = dispatch => {
  return {
    checkResturantExist: id => dispatch(actions.checkResturantExistAction(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'RestaurantProfileForm',
  enableReinitialize: true,
  validate,
})(ProfileForm));