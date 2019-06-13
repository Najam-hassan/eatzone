/* eslint-disable no-unused-vars */
import axios from 'axios';
import { baseURL, token } from './constants';

axios.defaults.baseURL = baseURL;
axios.defaults.headers.token = token;
export const axiosClient = axios.create({
    baseURL,
    headers: {
        token,
    },
});

export default axiosClient;
