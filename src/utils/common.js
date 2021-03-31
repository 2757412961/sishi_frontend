import {notification} from 'antd';
import querystring from 'querystring';
import {parse, stringify} from 'qs';
import moment from 'moment';

// 获取数组中对应key中的数据
export function selectArrayByKey({arr, key}) {
  return arr.find((item, index) => item.key === key);
}

// 将数组对应的key,value变成对象
export function dealKeyValueData(arr) {
  let obj = {};
  arr.forEach((item, index) => {
    obj[item.key] = item.value;
  });
  return obj;
}

// 生成表格数据
export function generateTabularData(item) {
  let data = JSON.parse(item.value);
  let columns = data.schema.map((item, index) => {
    let key = Object.keys(item)[0];
    if (Object.keys(item)[0] === 'Description' || '描述') {
      return {title: key, dataIndex: key, key: key};
    } else {
      return {title: key, dataIndex: key, key: key, width: '100px'};
    }
  });
  let dataSource = data.rows.map((item, index) => ({...item, key: index}));
  return {...item, columns: columns, dataSource: dataSource};
}

// 获取本地存储
export function getLocalData({dataName}) {
  return localStorage.getItem(dataName);
}

export function getPageQuery() {
  return parse(window.location.href.split('?').pop());
}

// 设置本地存储
export function setLoalData({dataName, dataList}) {
  localStorage.setItem(dataName, dataList);
}

// 本地存储是否存在
export function isSetLoacl({dataName}) {
  return localStorage.hasOwnProperty(dataName);
}

// 本地存储删除
export function delLoalData(arr) {
  arr.forEach((item, index) => {
    localStorage.removeItem(item);
  });
}

// 判断主页链接

export function judgeUrl(indexUrl, deteUrl) {
  if (deteUrl === '/') {
    return indexUrl === deteUrl;
  } else {
    return indexUrl.includes(deteUrl);
  }
}

// 修改工具集中的主要参数

export function dealToolData({properties, required}) {
  return Object.keys(properties).map((item, index) => ({
    key: index,
    ...properties[item],
    name: item,
    isRequired: required ? (required.includes(item) ? '1' : '0') : '0',
  }));
}

// 修改表单中获得的数据

export function changeFormData(conValue, getValue) {
  let arr = conValue.map((item, index) => item.name);
  let args = [],
    conf = [];
  Object.keys(getValue).map((item, index) => {
    if (item === 'workname') {
    } else if (arr.includes(item)) {
      args.push({
        paramName: item,
        value: getValue[item],
      });
    } else {
      conf.push({paramName: item, value: getValue[item]});
    }
  });
  return {args, conf};
}

// 设置错误

export function openNotificationWithIcon(code, message) {
  let successTest = /^2\d*/,
    warningText = /^4\d*/,
    errorText = /^[56]\d*/;
  let tipTest = '';
  console.log("code message", code, message);
  if (successTest.test(code)) {
    tipTest = 'success';
    notification.open({message: tipTest, description: message});
  } else if (message == '该数据集暂无关联图层') {
    tipTest = 'info';
    notification.open({message: tipTest, description: message});
  } else if (warningText.test(code)) {
    // tipTest = 'warning';
  } else if (errorText.test(code)) {
    // tipTest = 'error';
  } else {
    // tipTest = 'error';
    // message = '系统繁忙，请稍后再试';
  }
  if (code === 600) {
    // message = '网络连接超时';
  }
  if (message && message.includes('TGT')) {
    return;
  }
  // notification[tipTest]({ message: tipTest, description: message });
}

// 设置渲染图层

export function setRenderLayer({
                                 url,
                                 vizType = 'landuse',
                                 layerName = 'multi-band',
                                 r,
                                 g,
                                 b,
                                 equalization = false,
                                 bandindex,
                                 id,
                                 dataType,
                               }) {
  if (dataType === 'dataset') {
    return (
      url +
      '?' +
      querystring.stringify({
        vizType: vizType,
        layerName: layerName,
        r: r,
        g: g,
        b: b,
        equalization: equalization,
        bandindex: bandindex,
        datasetId: id,
      }) +
      '&zoom={z}&x={x}&y={y}'
    );
  } else {
    return (
      url +
      '?' +
      querystring.stringify({
        vizType: vizType,
        layerName: layerName,
        r: r,
        g: g,
        b: b,
        equalization: equalization,
        bandindex: bandindex,
      }) +
      '&zoom={z}&x={x}&y={y}'
    );
  }
}

// 设置本地存储
export function setLocal({locType = 'dataset', ...payload}) {
  let data = [];
  if (isSetLoacl({dataName: locType})) {
    data = JSON.parse(getLocalData({dataName: locType}));
    if (data.some((item, index) => item.id === payload.id)) {
      return;
    } else {
      data.push(payload);
    }
  } else {
    data.push(payload);
  }
  setLoalData({dataName: locType, dataList: JSON.stringify(data)});
}

// 删除本地存储
export function delLocal({type = 'dataset', id}) {
  let arr = [];
  type === 'dataset'
    ? (arr = JSON.parse(
    getLocalData({
      dataName: type,
    }),
    ).filter((item, index) => item.id !== id))
    : (arr = JSON.parse(
    getLocalData({
      dataName: type,
    }),
    ).filter((item, index) => item.id !== id));
  setLoalData({
    dataName: type,
    dataList: JSON.stringify(arr),
  });
  return arr;
}

// 测试返回状态

export function judgeCode(code) {
  return /^2\d{2}/.test(code);
}

// 返回文件大小

export function calcFileSize(num) {
  if (num) {
    if (num < 1024) {
      return num + 'B';
    } else if (num / 1024 < 1024) {
      return Math.round(num / 1024) + 'KB';
    } else if (num / (1024 * 1024) < 1024) {
      return (num / (1024 * 1024)).toFixed(1) + 'MB';
    } else {
      return (num / (1024 * 1024 * 1024)).toFixed(1) + 'GB';
    }
  } else {
    return '';
  }
}

// 判断空对象

export function isEmptyObject(obj) {
  if (obj) {
    let arr = Object.keys(obj);
    if (arr.length === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

// 处理地址

export function parseAddress(str) {
  if (str) {
    let [region, address] = str.split(/\s+/);
    region = region ? region.split('-') : '';
    return [region, address];
  } else {
    return ['', ''];
  }
}

export function stringifyAddress(arr) {
  let [region, address] = arr;
  region = region ? region.join('-') : '';
  return region + ' ' + address;
}

// 处理Slider的marks
export function dealSliderMarks(arr) {
  let arrData = [...arr];
  let maxData = arrData.shift();
  let minData = arrData.pop();
  let returnData = {0: maxData.layerName, 100: minData.layerName};
  let maxTime = moment(maxData.layerTime).valueOf();
  let minTime = moment(minData.layerTime).valueOf();
  let interval = maxTime - minTime;
  if (arrData.length > 0) {
    arrData.forEach((item, index) => {
      let time = moment(item.layerTime).valueOf();
      let proportion = Math.round(((maxTime - time) / interval) * 100);
      returnData[proportion] = item.layerName;
    });
  }
  return returnData;
}

// 将获得的图层列表排序函数
export function sortLayersList(arr, type) {
  // 根据时间内排序
  function layerSortByTime(a, b) {
    let aTime = moment(a.dimensionValue).valueOf();
    let bTime = moment(b.dimensionValue).valueOf();
    if (aTime > bTime) {
      return 1;
    } else if (aTime < bTime) {
      return -1;
    } else {
      return 0;
    }
  }

  // 根据大小排序
  function layerSortByNum(a, b) {
    let aNum = Number(a.dimensionValue);
    let bNum = Number(b.dimensionValue);
    if (aNum > bNum) {
      return 1;
    } else if (aNum < bNum) {
      return -1;
    } else {
      return 0;
    }
  }

  type === 'timestamp' ? arr.sort(layerSortByTime) : arr.sort(layerSortByNum);
  return arr;
}

export function queryUserLoginInfoFromCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + '=');
    let c_end;
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(';', c_start);
      if (c_end === -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return null;
}

export function setUserLoginInfoToCookie(cookieName, payload, time) {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + time);
  document.cookie =
    cookieName + '=' + escape(payload) + (time === null ? '' : ';expires=' + exdate.toUTCString());
}

export function judgeGender(idCord) {
  // 1是男 0是女
  return idCord.substr(16, 1) % 2 > 0 ? '1' : '0';
}

// 判断数据源类型
export function isGeotrellis(type) {
  return type.toLowerCase().includes('geotrellis');
}

export function isGeoTIFF(type) {
  return type.toLowerCase().includes('geotiff');
}

export function isShape(type) {
  return type.toLowerCase().includes('shape');
}

// 半角符号转全角
export function toDBC(txtstring) {
  let res = "";
  console.log('【'.charCodeAt(0))
  console.log('】'.charCodeAt(0))
  console.log('（'.charCodeAt(0))
  console.log('）'.charCodeAt(0))
  for (let i = 0; i < txtstring.length; i++) {
    let code = txtstring.charCodeAt(i);
    if (false) {
    } else if (code == 91) { // [ -> 【
      code = 12304;
    } else if (code == 93) { // ] -> 】
      code = 12305;
    } else if (code == 40) { // ( -> （
      code = 65288;
    } else if (code == 41) { // ) -> ）
      code = 65289;
    }

    res += String.fromCharCode(code);
  }
  return res;
}
