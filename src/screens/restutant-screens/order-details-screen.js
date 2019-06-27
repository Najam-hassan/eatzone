import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';

import Button from '../../components/common/button';
import { PageHeader } from '../../components/common/header';

import { calculateCost } from '../../utils/misc';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

class RecentOrdersScreen extends Component {

  state = { confirmed: false, canceled: false, completed: false }

  componentWillReceiveProps (nextProps) {
    if (nextProps.confirmed) {
      this.setState({ confirmed: true })
    }
    if (nextProps.canceled) {
      this.setState({ canceled: true })
    }
    if (nextProps.completed) {
      this.setState({ completed: true })
    }
  }

  renderOrderItems = (item, index) => {
    return (

      <View key={`menu-item-${index}`} style={styles.orderItemContent}>
        <View
          key={item.id}
          style={styles.orderItemContainer}
        >
          <Text style={styles.orderDescrip}>{item && item.menu_item.name || ''}</Text>
          <Text style={styles.orderQuantity}>Qty: {item && item.itemQuantity || ''}</Text>
          <Text style={styles.orderPrice}>$ {item && item.menu_item.price || ''}</Text>
        </View>
      </View>
    )
  }

  renderOrderCard = () => {
    const { params } = this.props.navigation.state;
    const { completed, confirmed, canceled } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.orderCardContainer}>
          <View style={styles.detailsContainer}>
            {params && params.details.user.avatarUrl ?
              <Image
                source={{ uri: params.details.user.avatarUrl }}
                style={{ height: 60, width: 60, borderRadius: 60 }}
              /> :
              <Image
                source={require('../../assets/images/account.png')}
                style={{ height: 60, width: 60, borderRadius: 60 }}
              />}
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{params.details.user.name}</Text>
              <Text style={styles.userContact}>{moment(params.details.createdAt).format("ddd, hA")}</Text>
              {/* <Text>Location: Lahore</Text> */}
            </View>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.userInfo}>Order Id: {params.details.id}</Text>
            <Text style={styles.userInfo}>Total: {calculateCost(params.details.order_items)}</Text>
          </View>
        </View>
        {params.details.order_items.map((item, index) => (
          this.renderOrderItems(item, index)
        ))}
        <View style={styles.actionContainer}>
          <Button
            title={'Call Customer'}
            onPress={() => {
              console.log('button pressed')
            }}
            style={[styles.button, {
              backgroundColor: '#00a0ff',
            }]}
            textStyle={{ color: '#fff', fontSize: 13, fontWeight: '400', }}
          />
          {!confirmed && params.details.orderStatus === 'PENDING' ? <Button
            title={'Cancel Order'}
            onPress={() => {
              const { details } = params;
              this.props.updateOrder(
                `/restaurant/cancel-order/${details.id}`, 'canceled'
              );
            }}
            style={[styles.button, {
              borderWidth: 1,
              borderColor: '#ff0000',
              backgroundColor: '#fff',
            }]}
            textStyle={{ color: '#ff0000', fontSize: 13, fontWeight: '400', }}
          /> : null}
          {!confirmed && params.details.orderStatus === 'PENDING' ? <Button
            title={'Accept Order'}
            onPress={() => {
              const { details } = params;
              this.props.updateOrder(
                `/restaurant/confirm-order/${details.id}`, 'accepted'
              );
            }}
            style={[styles.button, {
              borderWidth: 1,
              borderColor: '#17820c',
              backgroundColor: '#fff',
            }]}
            textStyle={{ color: '#17820c', fontSize: 13, fontWeight: '400', }}
          /> : null}
          {!confirmed && params.details.orderStatus === 'CONFIRMED' ? <Button
            title={'Complete Order'}
            onPress={() => {
              const { details } = params;
              this.props.updateOrder(
                `/restaurant/complete-order/${details.id}`, 'completed'
              );
            }}
            style={[styles.button, {
              width: '40%',
              borderWidth: 1,
              borderColor: '#17820c',
              backgroundColor: '#fff',
            }]}
            textStyle={{ color: '#17820c', fontSize: 13, fontWeight: '400', }}
          /> : null}
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
        <StatusBar hidden={false} />
        <PageHeader
          navigation={this.props.navigation}
          title={'Order Details'}
        />
        {this.renderOrderCard()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  orderCardContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#d9f1ff',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flex: .65,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    paddingLeft: 12,
    paddingRight: 4,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  userContact: {
    fontSize: 14,
    fontWeight: '400',
    color: '#5e5a5a',
    marginTop: 2,
    lineHeight: 20,
  },
  orderDetails: {
    flex: .35,
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  userInfo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#5e5a5a',
    textAlign: 'right',
    lineHeight: 20,
  },
  actionContainer: {
    width: '100%',
    paddingTop: 18,
    paddingHorizontal: 15,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    height: 40,
    width: '32%',
    borderRadius: 50,
    textAlign: 'center',
  },
  orderItemContent: {
    paddingHorizontal: 15,
    marginTop: 12,
  },
  orderItemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDescrip: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
    flex: 0.55,
    flexWrap: 'wrap',
  },
  orderQuantity: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
    flex: 0.25,
    flexWrap: 'wrap',
    paddingRight: 5,
    paddingLeft: 5,
  },
  orderPrice: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
    flex: 0.2,
    textAlign: 'right',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = state => ({
  confirmed: selectors.makeSelectConfirmed()(state),
  completed: selectors.makeSelectCompleted()(state),
  canceled: selectors.makeSelectCanceled()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    updateOrder: (url, type) => {
      dispatch(actions.updateOrderStatusAction(url));
      dispatch(actions.updateLocally(type));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentOrdersScreen); 