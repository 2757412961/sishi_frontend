import request from '../utils/request';
import requestHeard from '../utils/requestHeard';
import { stringify } from 'querystring';

// 验证票据
export function validateTicket({ ticket }) {
  return request({
    url: '/login/api/cas/serviceValidate',
    method: 'GET',
    data: { ticket: ticket, service: 'http://127.0.0.1:8000/' },
  });
}

// 获取tgt
export function getTGTData() {
  return request({
    url: '/login/api/cas/v1/tickets',
    method: 'POST',
    data: {
      username: 'linlin',
      password: '12',
      service: 'http://127.0.0.1:8000/',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

// 通过TGT获取ST
export function getSTData({ tgt }) {
  return request({
    url: '/login/api/cas/v1/tickets/' + tgt,
    method: 'POST',
    data: {
      service: 'http://127.0.0.1:8000/',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

// 注册用户名和密码
export function registerUser(data) {
  return request({
    url: '/v1.0/api/register',
    method: 'POST',
    data: { ...data },
    autoAdd: false, //不添加v1.0
  });
}

// 用户登录
export function loginUser({ username, password, service, ip, city }) {
  return request({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password,
      // service,
      // ip,
      // city,
    },
  });
}

// 获取用户信息
export function getUserData() {
  return requestHeard({
    url: '/v1.0/api/user',
    method: 'GET',
    autoAdd: false, //不添加v1.0
  });
}

// 更改用户信息
export function updateUserData({
                                 phone,
                                 email,
                                 avatar,
                                 firstName,
                                 lastName,
                                 name,
                                 idCard,
                                 address,
                                 organization,
                                 industry,
                               }) {
  return requestHeard({
    url: '/v1.0/api/user',
    method: 'put',
    data: { phone, email, avatar,firstName,lastName, name, idCard, address, organization, industry },
    autoAdd: false,
  });
}

// 获取用户AKSK
export function getAkSkData() {
  return requestHeard({
    url: '/v1.0/api/user/aksk',
    method: 'GET',
    autoAdd: false,
  });
}

// 更新用户AKSK
export function updateAkSkData() {
  return requestHeard({
    url: '/v1.0/api/user/aksk',
    method: 'PUT',
    autoAdd: false,
  });
}

// 修改密码
export function updatePassword({ oldPassword, newPassword, confirmPassword }) {
  return requestHeard({
    url: '/v1.0/api/user/password',
    method: 'PUT',
    data: {
      oldPassword,
      newPassword,
      confirmPassword,
    },
  });
}

// 获取临时ak和sk

export function getCredential() {
  return requestHeard({
    url: '/authority/credential',
    method: 'GET',
  });
}

