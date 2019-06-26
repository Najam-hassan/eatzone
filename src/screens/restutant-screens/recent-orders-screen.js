import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  View, StatusBar, StyleSheet, ActivityIndicator, Dimensions
} from 'react-native';

import { Header } from '../../components/common/header';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

import OrdersContainer from '../../containers/restaurant-containers/my-orders-container';

class RecentOrdersScreen extends Component {

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'My Orders' },
      { key: 'second', title: 'Dine In Orders' },
    ],
  };

  componentDidMount () {
    this.props.fetchList();
  }

  render () {
    const { loading, collections, deliveries } = this.props;
    if (loading) {
      return (
        <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
          <StatusBar hidden={false} />
          <Header
            navigation={this.props.navigation}
            title={'Recent Orders'}
          />
          <ActivityIndicator size={'large'} color={'#1BA2FC'} />
        </View>
      )
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
        <StatusBar hidden={false} />
        <Header
          navigation={this.props.navigation}
          title={'Recent Orders'}
        />
        <NavigationEvents
          onWillFocus={payload => {
            console.log('will focus', payload)
            this.props.fetchList();
          }}
        />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => (
              <OrdersContainer
                list={collections}
                navigation={this.props.navigation}
              />
            ),
            second: () => (
              <OrdersContainer
                list={deliveries}
                navigation={this.props.navigation}
              />
            ),
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          style={{ backgroundColor: '#fff' }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  }
});

const mapStateToProps = state => ({
  collections: selectors.makeSelectCollectionOrderList()(state),
  deliveries: selectors.makeSelectDeliveryOrderList()(state),
  loading: selectors.makeSelectOrderListLoading()(state),
  error: selectors.makeSelectOrderListError()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    fetchList: () => dispatch(actions.fetchOrdersAction()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentOrdersScreen); 