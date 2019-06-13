import { AsyncStorage } from 'react-native';

const getAuthToken = () => AsyncStorage.getItem('user');

// Network constants
export const baseURL = 'https://tranquil-anchorage-35603.herokuapp.com/api/v1';
export const token = getAuthToken().token;