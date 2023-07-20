import axios from 'axios';
import { adminURL, tokenURL } from './constants';
import store from 'store';

const requestAdmin = axios.create({
    baseURL: adminURL,
});

const requestToken = axios.create({
    baseURL: tokenURL,
});

requestAdmin.interceptors.request.use(function (config) {
    config.headers.contentType = 'application/json';
    config.headers.Authorization = `Bearer ${store.getState().playerState?.token}`;

    return config;
});

requestToken.interceptors.request.use(function (config) {
    config.headers.contentType = 'application/json';

    return config;
});

export { requestAdmin, requestToken };
