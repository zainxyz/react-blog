import axios from 'axios';

import { API_BASE_URL, APP_NAMESPACE, AXIOS_ERROR_SUFFIX, AXIOS_SUCCESS_SUFFIX } from './constants';

/**
 * Define the Axios Client, add some default information...
 */
export const axiosClient = axios.create({
  baseURL     : API_BASE_URL,
  responseType: 'json',
  headers     : {
    common: {
      Authorization: APP_NAMESPACE
    }
  }
});

/**
 * Define the Axios Middleware Options
 */
export const axiosMiddlewareOptions = {
  successSuffix: AXIOS_SUCCESS_SUFFIX,
  errorSuffix  : AXIOS_ERROR_SUFFIX
};
