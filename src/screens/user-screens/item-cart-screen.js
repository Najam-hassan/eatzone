import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View, Text, StatusBar, TouchableOpacity, StyleSheet, FlatList
} from 'react-native';

import { Header } from '../../components/common/header';

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
    console.log(total, 'total price');
    this.setState({ subTotal: total })
  }

  _renderItem = ({ item }) => {
    return (
      <View>
        {item && item.menu_items.length ? item.menu_items.map(row => {
          if (row.quantity > 0) {
            return (
              <View style={styles.itemContainer}>
                <View style={{ flex: 1, }}>
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
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <Text numberOfLines={1} style={{
                      flex: 8, color: '#000', fontSize: 16, fontWeight: '700',
                    }}>{row.name}</Text>
                    <View style={{
                      flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
                    }}>
                      <Text style={{ color: '#000', fontWeight: '700', }}>${row.price}</Text>
                    </View>
                  </View>

                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <Text style={{ color: 'grey', marginTop: 2 }}>Meal (L)</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <Text numberOfLines={1} style={{
                      flex: 7, color: 'grey',
                    }}>{row.description}</Text>
                    <View style={{
                      flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'
                    }}>
                      <TouchableOpacity
                        onPress={() => { this.addQuantity(item.id, row.id, row.price) }}
                      >
                        <Text style={styles.blueBtn}> + </Text>
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 10 }}>{row.quantity}</Text>
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
            )
          }
        }) : null}
      </View>
    )
  }

  renderTaxes = () => {
    return (
      <View style={styles.taxContainer}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Text numberOfLines={1} style={{
            flex: 8, color: 'grey', fontWeight: '400',
          }}>SubTotal</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{ color: 'grey', fontWeight: '700', }}>{this.state.subTotal}</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Text numberOfLines={1} style={{
            flex: 8, color: 'grey', fontWeight: '400',
          }}>SubTotal</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{
              color: 'grey', fontWeight: '700',
            }}>$10</Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <Text numberOfLines={1} style={{
            flex: 8, color: 'grey', fontWeight: '400',
          }}>SubTotal</Text>
          <View style={{
            flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end'
          }}>
            <Text style={{ color: 'grey', fontWeight: '700', }}>$10</Text>
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

  render () {
    const { cartItems } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <Header
          navigation={this.props.navigation}
          title={'My Orders'}
        />
        <View style={{ backgroundColor: 'grey', padding: 10 }}>
          <View style={{ borderRadius: 5, backgroundColor: '#fff' }}>
            <FlatList
              data={cartItems}
              extraData={this.state}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => (
                Date.now() + index.toString()
              )}
            />
            {/* {this.renderItem()} */}
            {/* {this.renderItem()} */}
            {this.renderTaxes()}
            <View style={{ paddingHorizontal: 10, paddingVertical: 20, }}>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Text numberOfLines={1} style={{
                  flex: 8, color: '#000', fontSize: 16, fontWeight: '700',
                }}>Total</Text>
                <View style={{ flex: 2, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#000', fontWeight: '700', }}>$50</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View >
    )
  }
}

const mapStateToProps = state => ({
  cartItems: selectors.makeSelectCartItem()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    addItemQuantity: data => {
      dispatch(actions.addQuantityToItem(data));
      dispatch(actions.addItemToCard(data));
    },
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingBottom: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    borderBottomColor: 'grey',
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
    lineHeight: 24
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
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
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
