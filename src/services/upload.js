// import request from '@utils/request'
import axios from 'axios';
import { getLocalData } from '@/utils/common.js';

let CancelToken = axios.CancelToken;
let source = CancelToken.source();
export function uploadFile({file, defProgress, url}) {
  return axios({
    url: '/v1.0/api' + url,
    method: 'post',
    data: file,
    processData: false,
    cancelToken: source.token,
    onUploadProgress: defProgress,
    headers: {
      rzpj: getLocalData({ dataName: 'rzpj' }),
      // yhbh: getLocalData({ dataName: 'yhbh' }),
    },
  })
    .then(response => {
      const { statusText, status } = response;
      let data = response.data;
      if (data instanceof Array) {
        data = { list: data };
      }
      return Promise.resolve({ success: true, message: statusText, statusCode: status, ...data });
    })
    .catch(error => {
      CancelToken = axios.CancelToken;
      source = CancelToken.source();
      const { response } = error;
      const { Cancel } = error;
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
      if (msg === '取消上传'){
        statusCode = 400
      }
      /* eslint-disable */
      return Promise.resolve({ success: false, statusCode, message: msg });
    });
}

export function cancelUpload() {
  return source.cancel('取消上传');
}
