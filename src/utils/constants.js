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
// export const baseURL = 'https://tranquil-anchorage-35603.herokuapp.com/api/v1';
export const baseURL = 'http://104.248.74.175:3000/api/v1';
export const token = getAuthToken();