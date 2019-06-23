import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import RadioButton from '../../components/radio-button-component'
import * as actions from '../../actions/user-actions/resturant-detail-actions';

var radio_props = [
  { label: 'Pepsi', value: 0, price: 1 },
  { label: 'Mountain Dew', value: 1, price: 2 }
];

class ItemDetailsContainer extends Component {
  state = { value: null, quantity: 0 }

  componentDidMount () {
    const { detail } = this.props;
    if (detail) {
      this.setState({ quantity: detail.quantity && detail.quantity || 0 })
    }
  }

  addQuantity (itemId) {
    const { catId } = this.props;
    let categoryIndex = this.props.data.findIndex(e => e.id === catId);
    if (categoryIndex >= 0) {
      let itemIndex = this.props.data[categoryIndex].menu_items.findIndex(e => e.id === itemId);
      if (itemIndex >= 0) {
        this.props.data[categoryIndex].menu_items[itemIndex].quantity++;
        this.setState({ quantity: this.state.quantity + 1 });
      }
    }
    console.log('adddddd: ', this.props.data);
    this.props.addItemQuantity(this.props.data);
  }

  subtractQuantity (itemId, quantity) {
    const { catId } = this.props;
    if (quantity > 0 && catId) {
      let categoryIndex = this.props.data.findIndex(e => e.id === catId);
      if (categoryIndex >= 0) {
        let itemIndex = this.props.data[categoryIndex].menu_items.findIndex(e => e.id === itemId);
        if (
          itemIndex >= 0 &&
          this.props.data[categoryIndex].menu_items[itemIndex].quantity > 0
        ) {
          this.props.data[categoryIndex].menu_items[itemIndex].quantity--;
          this.setState({ quantity: this.state.quantity - 1 });
        }
      }
      console.log('subtrat: ', this.props.data);
      this.props.addItemQuantity(this.props.data);
    }
  }

  render () {
    const { detail } = this.props;
    const { quantity } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.headerText}>{detail.name ? detail.name : 'Some Name'}</Text>
            <Text>${detail.price ? detail.price : 0}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>
              {detail.description ? detail.description : 'Some Description here'}
            </Text>
            <View style={styles.stockStyle}>
              <TouchableOpacity
                onPress={() => {
                  this.addQuantity(detail.id)
                }}
              >
                <Text style={styles.blueBtn}>+</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.subtractQuantity(detail.id, detail.quantity)
                }}
              >
                <Text style={styles.blueBtn}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        {/* <View style={styles.softContainer}>
          <View style={[styles.itemHeader, {
            marginBottom: 15
          }]} >
            <Text style={styles.selectionText}>Select Your Soft Drink</Text>
            <Text style={[styles.selectionText, {
              backgroundColor: '#808080',
              borderRadius: 50
            }]}>OPTIONAL</Text>
          </View>
          <Text>Select one</Text>
          <View style={{ marginVertical: 15 }}>
            {radio_props.map(item => (
              <RadioButton
                item={item}
                value={this.state.value}
                onChange={(value) => {
                  this.setState({ value: value })
                }}
              />
            ))}
          </View>
        </View> */}
      </View>
    )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    addItemQuantity: data => {
      dispatch(actions.addQuantityToItem(data));
      dispatch(actions.addItemToCard(data));
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000'
  },
  divider: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  softContainer: {
  },
  selectionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  stockStyle: {
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f7f8fa',
    justifyContent: 'space-between',
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsContainer)