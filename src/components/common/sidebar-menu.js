import { connect } from 'react-redux';
import React, { Component } from 'react';
import PhotoUpload from 'react-native-photo-upload';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, AsyncStorage, Image } from 'react-native';

import { resetState } from '../../actions/auth-actions'
import { updateProfileAction } from '../../actions/restaurant-actions/profile-actions';

class SidebarMenu extends Component {
  state = { type: null, user: null, avatarUrl: '' }

  componentWillMount () {
    this.fetchUser()
  }
  componentDidMount () {
    AsyncStorage.getItem('user_type', (err, value) => {
      if (err) {
        console.log(err)
      } else {
        this.setState({ type: value });
      }
    })
  }

  fetchUser () {
    AsyncStorage.getItem('user', (err, user) => {
      if (user !== null) {
        this.setState({
          user: JSON.parse(user)
        });
      }
    });
  }

  uploadPhoto (avatar) {
    this.props.updateProfile({ bannerData: avatar });
  }

  render () {
    const { type, user } = this.state;
    console.log(user, '90909090');
    return (
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
        <View style={styles.topViewStyle}>
          <View style={styles.UserImg}>
            {
              !(type === 'admin') ?
                <Image
                  source={
                    (user && user.bannerUrl !== null)
                      ? { uri: user.avatarUrl } : require('../../assets/images/account.png')
                  }
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
                :
                <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      console.log('Image base64 string: ', avatar);
                      this.uploadPhoto(avatar)
                    }
                  }}
                >{user && user.bannerUrl !== '' ?
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 75,
                      paddingVertical: 30,
                    }}
                    resizeMode='cover'
                    source={{ uri: user.bannerUrl }}
                  /> :
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 75,
                      paddingVertical: 30,
                    }}
                    resizeMode='cover'
                    source={require('../../assets/images/account.png')}
                  />
                  }
                </PhotoUpload>
            }
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#333333' }}>{user ? user.name : null}</Text>
          </View>
        </View>
        {type === 'admin' ?
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.menu}>
              <View
                style={[styles.menuText, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("HomeScreen")}>
                  <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                    Menu
                                 </Text>
                  <Text style={styles.borderBottom}></Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.menuText}
                onPress={() => this.props.navigation.navigate('RecentOrdersScreen')}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  Recent Orders
                             </Text>
                <Text style={styles.borderBottom}></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuText}
                onPress={() => this.props.navigation.navigate('CompletedOrdersScreen')}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  Completed Orders
                            </Text>
                <Text style={styles.borderBottom}></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuText}
                onPress={() => {
                  this.props.navigation.navigate('EditRestaurantProfile');
                }}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  Profile
                            </Text>
                <Text style={styles.borderBottom}></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuText}
                onPress={() => {
                  AsyncStorage.clear();
                  this.props.clearStore();
                  this.props.navigation.navigate('WelcomeScreen')
                }}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  Logout
                            </Text>
              </TouchableOpacity>
            </View>
          </ScrollView> :
          // null :
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuText}
                onPress={() => this.props.navigation.navigate('HomeScreen')}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  Home
                            </Text>
                <Text style={styles.borderBottom}></Text>
              </TouchableOpacity>

              <View
                style={[styles.menuText, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("RestaurantsScreen")}>
                  <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                    Restaurants Near me
                                 </Text>
                  <Text style={styles.borderBottom}></Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.menuText}
                onPress={() => this.props.navigation.navigate('OrderScreen')}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  My Orders
                             </Text>
                <Text style={styles.borderBottom}></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuText}
                onPress={() => this.props.navigation.navigate('ProfileScreen')}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  Profile
                            </Text>
                <Text style={styles.borderBottom}></Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuText}
                onPress={() => {
                  AsyncStorage.clear();
                  this.props.clearStore();
                  this.props.navigation.navigate('WelcomeScreen')
                }}
              >
                <Text style={{ color: '#333333', textTransform: 'uppercase' }}>
                  Logout
                            </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => {
  return {
    clearStore: () => dispatch(resetState()),
    updateProfile: data => dispatch(updateProfileAction(data))
  }
}

const styles = StyleSheet.create({
  topViewStyle: {
    marginVertical: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  UserImg: {
    backgroundColor: '#e1e1e1',
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    overflow: "hidden"
  },
  menuText: {
    paddingVertical: 10
  },
  borderBottom: {
    height: 2,
    width: 40,
    marginTop: 20,
    backgroundColor: '#e8e8e8'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarMenu);