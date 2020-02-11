import { AsyncStorage } from 'react-native';
import axios from 'axios';

const getAuthToken = async () => {
  let token = null;
  await AsyncStorage.getItem("user").then((value) => {
    if (value) {
      token = JSON.parse(value).token;
      axios.defaults.headers.Authorization = `Bearer ${token}`;
    }
  });
}

// Network constants

//https://tranquil-anchorage-35603.herokuapp.com/api/v1
// export const baseURL = 'https://tranquil-anchorage-35603.herokuapp.com/api/v1';
const devTesting = false;
export const baseURL =  devTesting === true ? 'https://tranquil-anchorage-35603.herokuapp.com/api/v1' : 'https://foodallinone.com/api/v1';
// export const baseURL = 'http://192.168.0.124:3000/api/v1';
export const token = getAuthToken();