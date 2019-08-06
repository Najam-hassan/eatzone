import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Toast from 'react-native-easy-toast';
import { NavigationEvents } from 'react-navigation';
import {
  Image, View, Text, StatusBar, ScrollView, BackHandler,
  StyleSheet, FlatList, Dimensions, ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('screen');

import { PageHeader } from '../../components/common/header';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonCom from '../../components/common/button';
import * as retaurant from '../../selectors/user-selectors/home-selectors';
import * as orderActions from '../../actions/user-actions/place-order-actions';
import * as actions from '../../actions/user-actions/resturant-detail-actions';
import * as orderSelectors from '../../selectors/user-selectors/place-order-selectors';
import * as selectors from '../../selectors/user-selectors/restaurent-detail-selectors';
import FoodModal from '../../components/food-modal';

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { subTotal: 0, showModal: false }

    //Binding handleBackButtonClick function with this
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount () {
    const { cartItems } = this.props;
    let total = 0;
    cartItems && cartItems.length &&
      cartItems.map(category => (
        category.menu_items.forEach(item => {
          if (item.quantity > 0)
            total = total + (item.price * item.quantity);
        })
      ));
    this.setState({ subTotal: total });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.response.message === "Order Placed") {
      this.setState({ showModal: true });
      this.props.resetState();
    } else if (nextProps.response.code === 400) {
      this.refs.toast.show(`Unable to place order ${nextProps.response.message}`, 2000);
      this.props.resetState();
    }
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick () {
    this.props.navigation.navigate('HomeScreen');
    return true;
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.mainOrder}>
        {item && item.menu_items.length ? item.menu_items.map(row => {
          if (row.quantity > 0) {
            return (
              <View style={styles.itemContainer}>
                <View style={{ flex: 9, }}>
                  <View style={{
                    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <Text numberOfLines={2} style={{
                      flex: 8, color: '#000', flexWrap: 'wrap', fontSize: 16, fontWeight: '400',
                    }}>{row.name}</Text>
                    <View style={{
                      flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end',
                    }}>
                      <Text style={{ color: '#000', fontSize: 16, fontWeight: '400', }}>${row.price.toFixed(2)}</Text>
                    </View>
                  </View>

                  <View style={{
                    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <Text numberOfLines={3} style={{
                      flex: 7, color: '#cccccc', fontSize: 14, marginTop: 3,
                    }}>{row.description}</Text>
                    <View style={{
                      flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
                    }}>
                      <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#f7f8fa',
                      }}>
                        <Button
                          buttonStyle={{
                            margin: 0, padding: 0, color: '#fff', height: 24, width: 24, borderRadius: 24
                          }}
                          icon={
                            <Icon
                              name="minus"
                              size={15}
                              color="#fff"
                            />
                          }
                          onPress={() => {
                            this.subtractQuantity(item.id, row.id, row.quantity, row.price);
                          }}
                        />
                        {/* <TouchableOpacity
                          onPress={() => { this.subtractQuantity(item.id, row.id, row.quantity, row.price) }}
                        >
                          <Text style={styles.blueBtn}> - </Text>
                        </TouchableOpacity> */}
                        <Text style={{ marginHorizontal: 10, fontSize: 14, }}>{row.quantity}</Text>
                        <Button
                          buttonStyle={{
                            margin: 0, padding: 0, color: '#fff', height: 24, width: 24, borderRadius: 24
                          }}
                          icon={
                            <Icon
                              name="plus"
                              size={15}
                              color="#fff"
                            />
                          }
                          onPress={() => {
                            this.addQuantity(item.id, row.id, row.price)
                          }}
                        />
                        {/* <TouchableOpacity
                          onPress={() => {
                            this.addQuantity(item.id, row.id, row.price)
                          }}
                        >
                          <Text style={styles.blueBtn}> + </Text>
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          }
        }) : null}
      </View>
    )
  }

  renderTaxes = () => {
    const { collectingResturant, deliveryResturant } = this.props;
    return (
      <View style={styles.subTotalOrder}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3,
        }}>
          <Text numberOfLines={1} style={{
            flex: 8, color: '#cccccc', fontWeight: '400',
          }}>SubTotal</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{ color: '#cccccc', fontWeight: '400', }}>
              ${parseFloat(this.state.subTotal).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3,
        }}>
          <Text numberOfLines={1} style={{
            flex: 8, color: '#cccccc', fontWeight: '400',
          }}>Delivery Fee</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{ color: '#cccccc', fontWeight: '400' }}>
              {deliveryResturant.deliveryServiceCharges}%
            </Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3,
        }}>
          <Text numberOfLines={1} style={{
            flex: 8, color: '#cccccc', fontWeight: '400',
          }}>GST</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{ color: '#cccccc', fontWeight: '400' }}>
              16%
            </Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3,
        }}>
          {/* <Text numberOfLines={1} style={{
            flex: 8, color: '#cccccc', fontWeight: '400',
          }}>Dine in Fee</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{ color: '#cccccc', fontWeight: '400', }}>
              ${collectingResturant.collectionServiceCharges}
            </Text>
          </View> */}
        </View>
      </View>
    )
  }

  addQuantity (categoryId, itemId, price) {
    let categoryIndex = this.props.cartItems.findIndex(e => e.id === categoryId);
    if (categoryIndex >= 0) {
      this.setState({
        subTotal: this.state.subTotal + price
      })
      let itemIndex = this.props.cartItems[categoryIndex].menu_items.findIndex(e => e.id === itemId);
      if (itemIndex >= 0) {
        this.props.cartItems[categoryIndex].menu_items[itemIndex].quantity++;
      }
    }
    this.props.addItemQuantity(this.props.cartItems);
  }

  subtractQuantity (categoryId, itemId, quantity, price) {
    if (quantity > 0) {
      let categoryIndex = this.props.cartItems.findIndex(e => e.id === categoryId);
      if (categoryIndex >= 0) {
        this.setState({
          subTotal: this.state.subTotal - price
        })
        let itemIndex = this.props.cartItems[categoryIndex].menu_items.findIndex(e => e.id === itemId);
        if (
          itemIndex >= 0 &&
          this.props.cartItems[categoryIndex].menu_items[itemIndex].quantity > 0
        ) {

          this.props.cartItems[categoryIndex].menu_items[itemIndex].quantity--;
        }
      }
      this.props.addItemQuantity(this.props.cartItems);
    }
  }

  navigateToOrderHistoryScreenAndCloseModal = () => {
    this.setState({ showModal: false });
    this.props.navigation.navigate('OrderScreen');
  }

  onSubmit = () => {
    const { cartItems, deliveryResturant, collectingResturant } = this.props;
    const orderArr = _.flatMap(cartItems, category =>
      _(category.menu_items)
        .map(menuItem => ({
          menuCategoryId: category.id,
          itemQuantity: menuItem.quantity,
          menuItemId: menuItem.id
        })).value()
    );

    const resultObj = {
      orderArr: orderArr.filter(row => row.itemQuantity > 0),
      collectingRestaurantId: collectingResturant.id,
      deliveringRestaurantId: deliveryResturant.id,
    }
    this.props.placeOrder(resultObj);
  };

  render () {
    const { cartItems, collectingResturant, deliveryResturant, loadding } = this.props;
    const navTitle = deliveryResturant && deliveryResturant.name ? deliveryResturant.name : 'Your Cart'
    const serviceCharges =
      collectingResturant.collectionServiceCharges + deliveryResturant.deliveryServiceCharges;
    return (
      <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
        <Toast
          ref="toast"
          position='bottom'
          fadeOutDuration={3000}
          textStyle={{ color: '#fff' }}
        />
        <StatusBar hidden={false} />
        <PageHeader
          isCartScreen={true}
          id={collectingResturant.id}
          navigation={this.props.navigation}
          title={navTitle}
        />
        <NavigationEvents
          onWillFocus={payload => {
            const { cartItems } = this.props;
            let total = 0;
            cartItems && cartItems.length &&
              cartItems.map(category => (
                category.menu_items.forEach(item => {
                  if (item.quantity > 0)
                    total = total + (item.price * item.quantity);
                })
              ));
            this.setState({ subTotal: total });
          }}
        />

        {
          this.state.subTotal > 0 ?
            <View style={{ flex: 1 }}>
              <ScrollView style={{ marginBottom: 10 }}>
                {/* <Text>{console.log(cartItems)}</Text> */}
                <View style={{ padding: 10, paddingTop: 30 }}>
                  <View style={styles.TotalOrder}>
                    <FlatList
                      data={cartItems}
                      extraData={this.state}
                      renderItem={this._renderItem}
                      keyExtractor={(item, index) => (
                        Date.now() + index.toString()
                      )}
                    />
                    {this.renderTaxes()}
                    <View style={{ paddingTop: 12, paddingBottom: 22, paddingHorizontal: 15, }}>
                      <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                      }}>
                        <Text numberOfLines={1} style={{
                          color: '#000', fontSize: 16, fontWeight: '400',
                        }}>Total</Text>
                        <Text style={{ color: '#000', fontWeight: '400', fontSize: 16, }}>
                          ${(this.state.subTotal +
                            (this.state.subTotal *
                              `.${deliveryResturant.deliveryServiceCharges}` +
                              (this.state.subTotal * 0.16))).toFixed(2)
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.dineInStyle}>
                    <Text style={{ color: '#cccccc', fontWeight: '400', }}>
                      {collectingResturant.collectionServiceCharges}% Dine in fee will be charged from you
              </Text>
                  </View>
                </View>
                <View style={{ position: 'relative', left: 0, right: 0, bottom: 5 }}>
                  {loadding ?
                    <ActivityIndicator
                      size={'large'}
                      color={'#1BA2FC'}
                    /> :
                    <ButtonCom
                      title={'Place Order'}
                      onPress={() => {
                        this.onSubmit();
                      }}
                      style={styles.button}
                      textStyle={{ /* styles for button title */ }}
                    />
                  }
                </View>
              </ScrollView>
              {this.state.showModal ?
                <FoodModal
                  showModal={true}
                  heading={"Congratulations"}
                  body={"Your order has been placed."}
                  closeModal={() => this.navigateToOrderHistoryScreenAndCloseModal()}
                /> : null
              }
            </View> :
            <View style={{ padding: 10, paddingTop: 30 }}>
              <Image
                source={require('../../assets/images/foodallinlogo.png')}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15, height: width - 70,
                  width: width - 30,
                }}
              />
              <Text style={{ textAlign: "center", fontWeight: "500", fontSize: 20, padding: 8 }}>Hungry?</Text>
              <Text style={{ textAlign: "center", fontWeight: "400", fontSize: 16, padding: 8, color: 'grey' }}>You haven't added anything to your cart yet!</Text>
              <ButtonCom
                title={'Back To Restaurants'}
                onPress={() => {
                  this.props.navigation.navigate("HomeScreen")
                }}
                style={styles.button}
                textStyle={{ /* styles for button title */ }}
              />
            </View>
        }
      </View >
    )
  }
}

const mapStateToProps = state => ({
  cartItems: selectors.makeSelectCartItem()(state),
  response: orderSelectors.makeSelectPlaceOrderData()(state),
  loadding: orderSelectors.makeSelectPlaceOrderLoading()(state),
  deliveryResturant: retaurant.makeSelectdeliveryResturant()(state),
  collectingResturant: retaurant.makeSelectCollectingResturant()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    resetState: () => dispatch(orderActions.resetOrderState()),
    placeOrder: data => dispatch(orderActions.placeOrderAction(data)),
    addItemQuantity: data => {
      dispatch(actions.addQuantityToItem(data));
      dispatch(actions.addItemToCard(data));
    },
  }
}

const styles = StyleSheet.create({
  mainOrder: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  subTotalOrder: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e1e7',
    backgroundColor: '#fff',
  },
  TotalOrder: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#fff',
  },
  itemContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e1e7',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  blueBtn: {
    backgroundColor: '#00a0ff',
    height: 24,
    width: 24,
    borderRadius: 24,
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 24,
  },
  radioBtn: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#00a0ff',
  },
  radioBtnContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#c7c4d1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  taxContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderBottomColor: 'grey',
  },
  button: {
    height: 50,
    width: width - 50,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  dineInStyle: {
    top: 0,
    left: 0,
    flex: 1,
    right: 0,
    bottom: 0,
    height: 30,
    marginVertical: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);