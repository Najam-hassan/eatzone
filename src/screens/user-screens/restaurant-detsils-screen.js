import { connect } from 'react-redux'
import React, { Component } from 'react';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View, Text, StatusBar, ImageBackground, StyleSheet, Dimensions, ActivityIndicator
} from 'react-native';

import Button from '../../components/common/button';
import { PageHeader } from '../../components/common/header';
import RestaurantDetail from '../../containers/user-containers/restaurent-details-container';

import * as actions from '../../actions/user-actions/resturant-detail-actions';
import * as selectors from '../../selectors/user-selectors/restaurent-detail-selectors';

import { conversion } from '../../utils/misc';

const { width, height } = Dimensions.get('screen');

class RestaurantDetailScreen extends Component {

  state = { total: 0, distance: 0, charges: 0, name: '' }

  componentDidMount () {

    // const { params } = this.props.navigation.state;
    // if (params.restaurantId) {
    // this.props.fetchDetails(params.restaurantId)
    // }
  }

  componentWillReceiveProps (nextProps) {

    if (nextProps.list && nextProps.list.distance) {
      // console.log('props: ', nextProps.list);
      // this.initilizeItems(nextProps.list)
      this.setState({
        name: nextProps.list.name,
        distance: nextProps.list.distance,
        charges: nextProps.list.deliveryServiceCharges,
      })
    }
  }

  render () {
    const { list, navigation, loading } = this.props;
    const listItems = list && Object.keys(list).length &&
      list.menu_categories.map(item => (
        item.menu_items.filter(row => (
          row.quantity > 0))
      ));

    let cardItems = listItems;
    if (cardItems.length > 1) {
      cardItems = listItems && listItems.length > 1 && listItems.reduce((a, b) => a.concat(b));
    }
    if (loading) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar hidden={false} />
          <PageHeader
            navigation={this.props.navigation}
            title={'Restaurant Detail'}
          />
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ActivityIndicator size="large" color="#1BA2FC" />
          </View>
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <PageHeader
          navigation={this.props.navigation}
          title={'Restaurant Detail'}
        />
        <NavigationEvents
          onWillFocus={payload => {
            const { list } = this.props;
            const listItems = list && Object.keys(list).length &&
              list.menu_categories.map(item => (
                item.menu_items.filter(row => (
                  row.quantity > 0))
              ));
            let cardItems = listItems;
            if (cardItems.length > 1) {
              cardItems = listItems &&
                listItems.length > 1 && listItems.reduce((a, b) => a.concat(b));
            }
            let total = 0;
            if (cardItems.length) {
              cardItems.forEach(item => {
                total = total + (item.price * item.quantity);
              });
            }
            this.setState({ total: total })
          }}
        />
        <View style={{ flex: 0.4 }}>
          <ImageBackground
            source={require('../../assets/images/mcdonal.jpg')}
            style={styles.backgroundImage}
          >
            <View style={[styles.overlay]}>
              <View style={{ flex: 1 }} />
              <View style={styles.detailStyle}>
                <View>
                  <Text style={styles.titleStyle}>{this.state.name}</Text>
                  <Text style={styles.titleStyle}>https://google.com</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Text style={styles.serviceChargeText}>
                    Service Charges: {this.state.charges}
                    {/* Service Charges: 10 % */}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 6 }}>
                      <Icon
                        name="map-marker"
                        size={16} color="#fff"
                      />
                    </View>
                    <Text style={{ color: '#fff' }}>
                      {conversion(this.state.distance)} miles away
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.itemContainer, { marginTop: -15 }]}>
          {list && Object.keys(list).length && list.menu_categories.length ?
            <RestaurantDetail
              addToTotal={amount => {
                const { total } = this.state;
                this.setState({ total: total + amount });
              }}
              subtractFromTotal={amount => {
                const { total } = this.state;
                this.setState({ total: total - amount });
              }}
              data={list.menu_categories}
              navigation={this.props.navigation}
              list={list.menu_categories.map(item => (
                item.menu_items && item.menu_items.length && item.name
              ))}
            /> :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {/* <ActivityIndicator size="large" color="#1BA2FC" /> */}
              <Text>No Items Exist</Text>
            </View>
          }
        </View>
        {cardItems && cardItems.length &&
          Object.keys(cardItems[0]).length ?
          <View style={styles.itemCardStyle}>
            <View style={styles.cardBodyStyle}>
              <Text style={{ fontSize: 14, color: '#fff' }}>
                {cardItems.length} | {this.state.total.toFixed(2)}$
            </Text>
              <Button
                title="View Card"
                onPress={() => {
                  navigation.navigate('ItemCartScreen');
                }}
                style={styles.button}
                textStyle={{ /* styles for button title */ }}
              />
            </View>
          </View> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',

  },
  detailStyle: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    marginBottom: 25
  },
  itemContainer: {
    flex: 0.6,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FEFFFF',
  },
  serviceChargeText: {
    color: '#fff',
    fontWeight: '300'
  },
  titleStyle: {
    color: '#fff',
    fontWeight: '300',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  itemCardStyle: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    position: 'absolute',
    backgroundColor: '#1BA2FC',
  },
  cardBodyStyle: {
    marginVertical: 20,
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  button: {
    height: 30,
    width: '50%',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: -5,
    textAlign: 'center',
    borderColor: '#fff',
    backgroundColor: '#1BA2FC',
  },
})

const mapStateToProps = state => ({
  list: selectors.makeSelectRestaurantDetail()(state),
  loading: selectors.makeSelectRestaurantLoading()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    // fetchDetails: id => dispatch(actions.fetchDetailAction(id)),
    updatedList: data => dispatch(actions.fetchDetailsSuccess(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetailScreen)
