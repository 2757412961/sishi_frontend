/* global window */
import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import router from 'umi/router';
import {getLocalData} from '@/utils/common.js';

// 设置网络超时
// axios.defaults.timeout=1000 * 20;
const fetch = (options) => {
  let {
    url,
    method = 'get',
    data,
    headers,
    autoAdd = true,
  } = options;

  // ------------------ zjh auth ------------------
  let headersAdd = {
    userId: getLocalData({dataName: 'userId'}),
      token: getLocalData({dataName: 'token'})
  }
  headers = headersAdd;
  // ------------------ zjh auth ------------------

  if (autoAdd) {
    url = '/v1.0/api' + url;
  }
  switch (method.toLowerCase()) {
    case 'get':
      if (headers) {
        return axios.get(url, { params: data, headers: headers, timeout: 1000 * 20 });
      } else {
        return axios.get(url, { params: data, timeout: 1000 * 20 });
      }
    case 'delete':
      if (headers) {
        return axios.delete(url, { params: data, headers: headers, timeout: 1000 * 20 });
      } else {
        return axios.delete(url, { params: data, timeout: 1000 * 20 });
      }
    case 'post':
      if (headers) {
        return axios.post(url, data, { headers: headers, timeout: 1000 * 20 });
      } else {
        return axios.post(url, data, { timeout: 1000 * 20 });
      }
    case 'put':
      if (headers) {
        return axios.put(url, data, { headers: headers, timeout: 1000 * 20 });
      } else {
        return axios.put(url, data, { timeout: 1000 * 20 });
      }
    default:
      return axios(options);
  }
};

export default function request(options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response;
    let data = response.data;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    if (typeof data === 'string') {
      data = { str: data };
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      // data: {...data},
      ...data,
    });
  }).catch((error) => {
    const { response } = error;
    let msg;
    let statusCode;
    if (response && response instanceof Object) {

      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || 'Network Error';
    }

    /* eslint-disable */
    return Promise.resolve({ success: false, statusCode, message: msg });
  });
}
