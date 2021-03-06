import axios from 'axios';
import { getLocalData } from '@utils/common.js';

const defDownload = function (progressEvent) {
  console.log(progressEvent, progressEvent.target.responseURL);
}
export function downloadFileRequest(params) {
  let url = '/v1.0/api/file/resource';
  return axios({
    url: url,
    method: 'get',
    params: params,
    processData: false,
    responseType: 'blob',
    onDownloadProgress: defDownload,
    headers: {
      rzpj: getLocalData({ dataName: 'rzpj' }),
      yhbh: getLocalData({ dataName: 'yhbh' }),
      'Content-Disposition': 'attachment;filename=total.xls',
      'Content-Type': 'application/x-download;charset=utf-8',
    },
  })
    .then(response => {
      console.log(response);
      if (response.data && response.data instanceof Blob) {
        //获取后台文件名
        let realFileName = response.headers['content-disposition']
          .split('filename="')[1]
          .split('"')[0];
        let blob = response.data;
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, realFileName);
        } else {
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = realFileName;
          //兼容火狐浏览器
          document.body.appendChild(link);
          let evt = document.createEvent('MouseEvents');
          evt.initEvent('click', false, false);
          link.dispatchEvent(evt);
          document.body.removeChild(link);
        }
      } else {
        throw response;
      }
    })
    .catch(error => {
      const { response } = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
        // message.error(statusCode, msg);
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
        // message.error(msg);
      }
      /* eslint-disable */
      return Promise.reject({ success: false, statusCode, message: msg });
    });
}
