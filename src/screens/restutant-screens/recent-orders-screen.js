import { connect } from 'react-redux';
import React, { Component,PureComponent } from 'react';
import { NavigationEvents } from 'react-navigation';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  View, StatusBar, ActivityIndicator, Dimensions, BackHandler, AsyncStorage,Platform
} from 'react-native';

import { Header } from '../../components/common/header';

import * as actions from '../../actions/restaurant-actions/order-listing-actions';
import * as selectors from '../../selectors/restaurant-selectors/order-list-selectors';

import OrdersContainer from '../../containers/restaurant-containers/my-orders-container';

class RecentOrdersScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      index: 0,
      offset:1,
      offsetCollections:1,
      routes: [
        { key: 'first', title: 'My Orders' },
        { key: 'second', title: 'Dine In Orders' },
      ],
    };

    //Binding handleBackButtonClick function with this
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentDidMount() {
    setInterval(async ()=>{
      await this.myOrderRefresher()
      await this.dineInRefresher()

    },120000)
    await this._retrieveData()
    const {offset,offsetCollections} = this.state
    this.props.fetchList(0);
    this.props.fetchListCollections(0)
    this.setState({offset:offset+1})
    this.setState({offsetCollections:offsetCollections+1})

    console.log('OrdersDelivered===========>>>>',this.props.deliveries,'Dine-in=====>>>>',this.props.collections);
  }
  handleLoadMoreDeliveries =() =>{
    // alert('called Delivert ')
          // if(this.props.deliveries.length > 0){
          //   const {offset} = this.state
          //   let pagination = (offset - 1)*10
          //   this.props.fetchList(pagination);
          //   this.setState({offset:offset+1})
          // }
      };
      handleLoadMoreCollections = () => {
        // alert('called')
            if(this.props.collections.length > 0){
              const {offsetCollections} = this.state
              let pagination = (offsetCollections - 1)*10
              this.props.fetchListCollections(pagination);
              this.setState({offsetCollections:offsetCollections+1})
            }
          };
 
  async componentWillMount() {
    let { params } = this.props.navigation.state;
    // console.warn('nextProps',params);
    try {
      if (params.nextProps.canceled) {
        await this.setState({ index: 1 })
      } 
    } catch (error) {
      // console.log(error);
    }
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('HomeScreen');
    return true;
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userRes');
      if (value !== null) {
        // We have data!!
        await this.setState({ user: JSON.parse(value) })
        // console.log('userRes====>>>>',JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  myOrderRefresher = ()=>{
    this.props.resetMyorders()
    this.props.fetchList(0);
  }
  dineInRefresher = ()=>{
    this.props.resetDineinorders()
    this.props.fetchListCollections(0)

  }

  render() {
    const { loading, collections, deliveries } = this.props;
    console.log("[recent-orders.js] showing collections array ",collections, 'delivery==:',deliveries)
    // if (loading) {
    //   return (
    //     <View style={{ flex: 1, backgroundColor: '#e4e4e4' }}>
    //       <StatusBar hidden={false} />
    //       <Header
    //         navigation={this.props.navigation}
    //         title={'Recent Orders'}
    //       />
    //       <NavigationEvents
    //         onWillFocus={payload => {
    //           this.props.fetchList();
    //         }}
    //       />
    //       <ActivityIndicator size={'large'} color={'#1BA2FC'} />
    //     </View>
    //   )
    // }

    return (
      <View style={{ flex: 1, backgroundColor: '#e4e4e4', }}>
        <StatusBar hidden={false} />
        <Header
          navigation={this.props.navigation}
          title={'Recent Orders'}
        />
        <NavigationEvents
          onWillFocus={payload => {
            // this.props.fetchList();
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
                navScreen="RecentOrdersScreen"
                isDelivery={true}
                userRes= {this.state.user}
                navigation={this.props.navigation}
                // fetchList={() => this.props.fetchList(this.state.offset)}
                // list={deliveries && deliveries.filter(row => (
                //   (row.orderStatus === 'CONFIRMED' || row.orderStatus === 'PENDING') && row.currentOrderStep !== '0')
                // )}
                list={deliveries}
                // onEndReached={this.handleLoadMoreDeliveries}
                // onEndReachedThreshold = {Platform.OS === 'ios' ? 0 :1}
                refresher = {this.myOrderRefresher}

              />
            ),
            second: () => (
              <OrdersContainer
                navScreen="RecentOrdersScreen"
                list={collections}
                isDelivery={false}
                isCollecting={true}
                userRes= {this.state.user}
                navigation={this.props.navigation}
                // fetchList={() => this.props.fetchListCollections(this.state.offsetCollections)}
                onEndReached={this.handleLoadMoreCollections}
                onEndReachedThreshold = {Platform.OS === 'ios' ? 0 :1}
                refresher = {this.dineInRefresher}
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
    fetchList: (param) => dispatch(actions.fetchOrdersAction(param)),
    fetchListCollections: (param) => dispatch(actions.fetchOrdersActionCollections(param)),
    resetMyorders : () =>dispatch(actions.resetMyOrders()),
    resetDineinorders : () =>dispatch(actions.resetDineInOrders())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentOrdersScreen); 