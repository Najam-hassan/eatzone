import { connect } from 'react-redux'
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StatusBar, ImageBackground, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

import Button from '../../components/common/button';
import { PageHeader } from '../../components/common/header';
import RestaurantDetail from '../../containers/user-containers/restaurent-details-container';

import * as actions from '../../actions/user-actions/resturant-detail-actions';
import * as selectors from '../../selectors/user-selectors/restaurent-detail-selectors';

const { width, height } = Dimensions.get('screen');

class RestaurantDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {

    // const { params } = this.props.navigation.state;
    // if (params.restaurantId) {
    // this.props.fetchDetails(params.restaurantId)
    // }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.list) {
      // console.log('props: ', nextProps.list);
      // this.initilizeItems(nextProps.list)
    }
  }

  render () {
    const { list, navigation } = this.props;
    const cardItems = list && Object.keys(list).length &&
      list.menu_categories.map(item => (
        item.menu_items.filter(row => (
          row.quantity > 0))
      )).reduce((a, b) => a.concat(b));

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} />
        <PageHeader
          navigation={this.props.navigation}
          title={'Restaurant Detail'}
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
                  <Text style={styles.titleStyle}>
                    {/* {params.restaurant.name} */}
                    {'Some Name Here'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Text style={styles.serviceChargeText}>
                    {/* Service Charges: {params.restaurant.charges} */}
                    Service Charges: 10 %
                                    </Text>
                  <Text style={{ color: "#fff", marginTop: 5 }}>
                    <Icon
                      name="map-marker"
                      size={16} color="#fff"
                    />
                    {/* {params.restaurant.distance} miles away */}
                    10 miles away
                                    </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={[styles.itemContainer, { marginTop: -15 }]}>
          {list && Object.keys(list).length && list.menu_categories.length ?
            <RestaurantDetail
              data={list.menu_categories}
              navigation={this.props.navigation}
              list={list.menu_categories.map(item => (
                item.menu_items && item.menu_items.length && item.name
              ))}
            /> :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#1BA2FC" />
            </View>
          }
        </View>
        {cardItems && cardItems.length &&
          Object.keys(cardItems[0]).length ?
          <View style={styles.itemCardStyle}>
            <View style={styles.cardBodyStyle}>
              <Text style={{ fontSize: 14, color: '#fff' }}>
                1 Items | 30$
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

const mapStateToProps = state => ({
  list: selectors.makeSelectRestaurantDetail()(state)
});

const mapDispatchToProps = dispatch => {
  return {
    fetchDetails: id => dispatch(actions.fetchDetailAction(id)),
    updatedList: data => dispatch(actions.fetchDetailsSuccess(data))
  }
};

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
    fontSize: 20,
    fontWeight: '500'
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetailScreen)
