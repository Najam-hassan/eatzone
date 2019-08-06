import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  View, StatusBar, ActivityIndicator, Dimensions, BackHandler
} from 'react-native';

import { Header } from '../../components/common/header';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

import OrdersContainer from '../../containers/restaurant-containers/my-orders-container';

class RecentOrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'My Orders' },
        { key: 'second', title: 'Dine In Orders' },
      ],
    };

    //Binding handleBackButtonClick function with this
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick () {
    this.props.navigation.navigate('HomeScreen');
    return true;
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
      <View style={{ flex: 1, backgroundColor: '#e4e4e4', paddingBottom: 15, }}>
        <StatusBar hidden={false} />
        <Header
          navigation={this.props.navigation}
          title={'Recent Orders'}
        />
        <NavigationEvents
          onWillFocus={payload => {
            this.props.fetchList();
          }}
        />
        <TabView
          renderTabBar={props =>
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: '#1BA2FC' }}
              style={{ backgroundColor: '#fff' }}
              labelStyle={{ color: '#000' }}
              pressColor={{ color: '#000' }}
            />
          }
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => (
              <OrdersContainer
                isDelivery={true}
                navigation={this.props.navigation}
                fetchList={() => this.props.fetchList()}
                list={deliveries && deliveries.filter(row => (
                  row.orderStatus === 'CONFIRMED' || row.orderStatus === 'PENDING')
                )}
              />
            ),
            second: () => (
              <OrdersContainer
                list={collections}
                isDelivery={false}
                isCollecting={true}
                navigation={this.props.navigation}
                fetchList={() => this.props.fetchList()}
              />
            ),
          })}
          onIndexChange={index => {
            this.setState({ index });
          }}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    )
  }
}

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