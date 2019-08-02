import moment from 'moment';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, Image, ActivityIndicator } from 'react-native';

import Button from '../../components/common/button';
import { PageHeader } from '../../components/common/header';

import { calculateCost } from '../../utils/misc';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

class OrderDetailsScreen extends Component {

  state = { confirmed: false, completed: false }

  componentDidMount () {
    const { params } = this.props.navigation.state;
    if (params.details) {
      if (params.details.orderStatus === 'PENDING') {
        this.setState({ confirmed: true });
      } else if (params.details && params.details.orderStatus === 'CONFIRMED') {
        this.setState({ completed: true })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.confirmed) {
      this.setState({
        completed: true,
        confirmed: false,
      })
    }
    if (nextProps.completed || nextProps.canceled) {
      this.props.navigation.navigate('CompletedOrdersScreen')
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
    const { completed, confirmed } = this.state
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.orderCardContainer}>
          <View style={styles.detailsContainer}>
            {params && params.details.user.avatarUrl ?
              <Image
                source={{ uri: params.details.user.avatarUrl }}
                style={{ height: 60, width: 60, borderRadius: 30 }}
              /> :
              <Image
                source={require('../../assets/images/account.png')}
                style={{ height: 60, width: 60, borderRadius: 30 }}
              />}
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{params.details.user.name}</Text>
              <Text style={styles.userContact}>{moment(params.details.createdAt).format("ddd, LT")}</Text>
              {/* <Text>Location: Lahore</Text> */}
            </View>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.userInfo}>Order Id: {params.details.id}</Text>
            <Text style={styles.userInfo}>Total: {
              calculateCost(params.details.order_items, params.details.deliveringRestaurant)
            }</Text>
          </View>
        </View>
        {params.details.order_items.map((item, index) => (
          this.renderOrderItems(item, index)
        ))}
        <View style={styles.actionContainer}>
          {params.orderConfirmed ? <Button
            title={'Call Customer'}
            onPress={() => {
              if (Platform.OS === 'android') {
                Linking.openURL(`tel:${params.details.user.phone}`);
              }
              else {
                const url = `telprompt:${params.details.user.phone}`;
                Linking.canOpenURL(url)
                  .then((supported) => {
                    if (supported) {
                      return Linking.openURL(url)
                        .catch(() => null);
                    }
                  });
              }
            }}
            style={[styles.button, {
              backgroundColor: '#00a0ff',
            }]}
            textStyle={{ color: '#fff', fontSize: 12, fontWeight: '400', }}
          /> : null}
          {!params.orderConfirmed && confirmed ? <Button
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
            textStyle={{ color: '#ff0000', fontSize: 14, fontWeight: '400', }}
          /> : null}
          {loading ?
            <ActivityIndicator size={'large'} color={'#1BA2FC'} /> :
            !params.orderConfirmed && confirmed ? <Button
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
              textStyle={{ color: '#17820c', fontSize: 14, fontWeight: '400', }}
            /> : null}
          {!params.orderConfirmed && !loading && completed ? <Button
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
            textStyle={{ color: '#17820c', fontSize: 14, fontWeight: '400', }}
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
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    height: 40,
    width: '42%',
    borderRadius: 50,
    marginHorizontal: 6,
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
    flex: 0.50,
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
    flex: 0.25,
    textAlign: 'right',
    flexWrap: 'nowrap',
  },
});

const mapStateToProps = state => ({
  loading: selectors.makeSelectOrderLoading()(state),
  confirmed: selectors.makeSelectConfirmed()(state),
  completed: selectors.makeSelectCompleted()(state),
  canceled: selectors.makeSelectCanceled()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    updateOrder: (url, orderStatus) => {
      dispatch(actions.updateOrderStatusAction(url, orderStatus));
      // dispatch(actions.updateLocally(type));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsScreen); 