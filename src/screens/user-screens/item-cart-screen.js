import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View, Text, StatusBar, TouchableOpacity, StyleSheet, FlatList, Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('screen');

import { Header } from '../../components/common/header';

import Button from '../../components/common/button';
import * as retaurant from '../../selectors/user-selectors/home-selectors';
import * as orderActions from '../../actions/user-actions/place-order-actions';
import * as actions from '../../actions/user-actions/resturant-detail-actions';
import * as selectors from '../../selectors/user-selectors/restaurent-detail-selectors';

class CartScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = { subTotal: 0 }

  componentDidMount () {
    const { cartItems } = this.props;
    let total = 0;
    cartItems && cartItems.length &&
      cartItems.map(category => (
        category.menu_items.forEach(item => {
          if (item.quantity > 0)
            total = total + item.price;
        })
      ));
    this.setState({ subTotal: total })
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.mainOrder}>
        {item && item.menu_items.length ? item.menu_items.map(row => {
          if (row.quantity > 0) {
            return (
              <View style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.radioBtnContainer}>
                    {
                      true ?
                        <View style={styles.radioBtn} />
                        : null
                    }
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 9, }}>
                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <Text numberOfLines={1} style={{
                      flex: 8, color: '#000', fontSize: 16, fontWeight: '400',
                    }}>{row.name}</Text>
                    <View style={{
                      flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
                    }}>
                      <Text style={{ color: '#000', fontSize: 16, fontWeight: '400', }}>${row.price}</Text>
                    </View>
                  </View>

                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <Text style={{ color: '#cccccc', fontSize: 14, marginTop: 4 }}>Meal (L)</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <Text numberOfLines={1} style={{
                      flex: 7, color: '#cccccc', fontSize: 14, marginTop: 3,
                    }}>{row.description}</Text>
                    <View style={{
                      flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
                    }}>
                      <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#f7f8fa',
                      }}>
                        <TouchableOpacity
                          onPress={() => { this.addQuantity(item.id, row.id, row.price) }}
                        >
                          <Text style={styles.blueBtn}> + </Text>
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: 10, fontSize: 14, }}>{row.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            this.subtractQuantity(item.id, row.id, row.quantity, row.price)
                          }}
                        >
                          <Text style={styles.blueBtn}> - </Text>
                        </TouchableOpacity>
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
              {parseFloat(this.state.subTotal).toFixed(2)}
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
              ${deliveryResturant.deliveryServiceCharges}
            </Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 3,
        }}>
          <Text numberOfLines={1} style={{
            flex: 8, color: '#cccccc', fontWeight: '400',
          }}>Dine in Fee</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{ color: '#cccccc', fontWeight: '400', }}>
              ${collectingResturant.collectionServiceCharges}
            </Text>
          </View>
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
    console.log('adddddd: ', this.props.cartItems);
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
      console.log('subtrat: ', this.props.cartItems);
      this.props.addItemQuantity(this.props.cartItems);
    }
  }

  onSubmit = () => {
    const { cartItems, deliveryResturant, collectingResturant } = this.props;
    const orderArr = _.flatMap(cartItems, category =>
      _(category.menu_items)
        .map(menuItem => ({ menuCategoryId: category.id, itemQuantity: menuItem.quantity, menuItemId: menuItem.id }))
        .value()
    );

    const resultObj = {
      orderArr,
      collectingRestaurantId: collectingResturant.id,
      deliveringRestaurantId: deliveryResturant.id,
    }
    this.props.placeOrder(resultObj);
  };

  render () {
    const { cartItems, collectingResturant, deliveryResturant } = this.props;
    const serviceCharges =
      collectingResturant.collectionServiceCharges + deliveryResturant.deliveryServiceCharges;
    return (
      <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
        <StatusBar hidden={false} />
        <Header
          navigation={this.props.navigation}
          title={'My Orders'}
        />
        <View style={{ padding: 10, }}>
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
                  flex: 8, color: '#000', fontSize: 16, fontWeight: '400',
                }}>Total</Text>
                <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#000', fontWeight: '400', fontSize: 16, }}>
                    {this.state.subTotal + serviceCharges}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 5 }}>
          <Button
            title={'Place Order'}
            onPress={() => {
              this.onSubmit();
            }}
            style={styles.button}
            textStyle={{ /* styles for button title */ }}
          />
        </View>
      </View >
    )
  }
}

const mapStateToProps = state => ({
  cartItems: selectors.makeSelectCartItem()(state),
  deliveryResturant: retaurant.makeSelectdeliveryResturant()(state),
  collectingResturant: retaurant.makeSelectCollectingResturant()(state),
});

const mapDispatchToProps = dispatch => {
  return {
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
    borderRadius: 8,
  },
  subTotalOrder: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e1e7',
    backgroundColor: '#fff',
  },
  TotalOrder: {
    borderRadius: 8,
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);