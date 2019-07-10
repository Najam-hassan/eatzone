import { connect } from 'react-redux';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text, View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity
} from 'react-native';

import { conversion } from '../../utils/misc';
const { width, height } = Dimensions.get('screen');

import * as selectors from '../../selectors/user-selectors/restaurents-selectors';
import { fetchDetailAction } from '../../actions/user-actions/resturant-detail-actions';
import { makeSelectCollectingResturant } from '../../selectors/user-selectors/home-selectors';

class Restaurents extends Component {

  _renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (item.isValid) {
          const { resturant } = this.props;
          this.props.fetchDetails(item.id, resturant.id);
          this.props.navigateTo(item);
        }
      }}
    >
      <View style={{ flex: 1, marginBottom: 10, borderRadius: 30, position: 'relative' }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
          <Image
            source={
              item && item.bannerUrl !== '' ?
                { uri: item.bannerUrl } : require('../../assets/images/mcdonal.jpg')
            }
            style={styles.bannerStyle}
          />
          <View style={styles.overlay}>
            <View style={[styles.locationStyle]}>
              <Text style={{ color: "#fff" }}>
                <Icon
                  name="map-marker"
                  size={16} color="#fff"
                /> {conversion(item.distance)} miles away</Text>
            </View>
          </View>
          {!(item.isValid) ? <View style={styles.message}>
            <Text style={{ color: '#fff' }}>
              This restaurant deliver food in between {item.deliverTimeStart} to {item.deliverTimeEnd}.
            </Text>
          </View> : null}
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.titleStyle}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: '#000' }}>{item.name}</Text>
            <Text style={{ color: '#00a0ff' }}>
              {`Service Charges: ${item.deliveryServiceCharges}`}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: '300', color: '#5e5a5a' }}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.list}
          extraData={this.state}
          // keyExtractor={this._keyExtractor}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 0
  },
  locationStyle: {
    right: 0,
    bottom: 10,
    left: width - 135,
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
  },
  bannerStyle: {
    height: 200,
    borderRadius: 10,
    width: width - 20,
  },
  message: {
    top: 0,
    left: 0,
    flex: 1,
    right: 0,
    bottom: 0,
    height: 40,
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    borderTopRightRadius: 10,
  }
});

const mapStateToProps = state => ({
  list: selectors.makeSelectData()(state),
  resturant: makeSelectCollectingResturant()(state),
});

const mapDispatchToProps = dispatch => {
  return {
    fetchDetails: (id, collectingId) => dispatch(fetchDetailAction(id, collectingId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurents)