/* global window */
import axios from 'axios';
import { getLocalData, delLoalData, openNotificationWithIcon } from '@/utils/common.js';
import router from 'umi/router';

let needNotificate = true;
// 设置网络超时
// axios.defaults.timeout = 1000 * 20;
const fetch = options => {
  let { url, method = 'get', data, headers, notification = false, autoAdd = true } = options;
  if (!notification) {
    needNotificate = false;
  }
  const header = {
    // token: getLocalData({
    //   dataName: 'token',
    // }),
    // userId: getLocalData({
    //   dataName: 'userId',
    // }),
    userId:getLocalData({
      dataName:'userId'
    }),
    token:getLocalData({
      dataName:'token'
    }),
    Accept: 'application/json;charset=UTF-8',
  };
  headers=header;
  console.log('headers'.headers);
  // console.log("headers", headers)
  // if(headers){
  //   if(headers['ak']&&headers['sk']){
  //     header['accessKey'] = headers['ak'];
  //     header['secretKey'] = headers['sk'];
  //   }
  // }
  if (autoAdd) {
    url = '/v1.0/api' + url;
  }
  switch (method.toLowerCase()) {
    case 'get':
      headers = { ...headers, ...header };
      return axios.get(url, { params: data, headers: headers });
    case 'delete':
      headers = { ...headers, ...header };
      return axios.delete(url, { params: data, headers: headers });
    case 'post':
      headers = { ...headers, ...header };
      return axios.post(url, data, { headers });
    case 'put':
      headers = { ...headers, ...header };
      return axios.put(url, data, { headers });
    default:
      return axios(options);
  }
};

export default function request(options) {
  return fetch(options)
    .then(response => {
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
        ...data,
      });
    })
    .catch(error => {
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
      if (needNotificate) {
        openNotificationWithIcon(statusCode, msg);
      }
      if (msg.indexOf('Invalid TGT') > -1) {
        if(!window.location.href.includes('login')){
          router.push(`/login?redirect=${window.location.href}`);
        }
      }
      /* eslint-disable */
      return Promise.resolve({ success: false, statusCode, message: msg });
    });
}
