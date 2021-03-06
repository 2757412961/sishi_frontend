import {
  validateTicket,
  getTGTData,
  getSTData,
  registerUser,
  loginUser,
  getUserData,
  updateUserData,
  getAkSkData,
  updateAkSkData,
  getIpLoction,
  updatePassword
} from '@/services/service.js';
import { uploadFile } from '@/services/upload.js';
import { routerRedux } from 'dva';
import {
  openNotificationWithIcon,
  judgeCode,
  setLoalData,
  delLoalData,
  getLocalData,
  judgeGender,
  getPageQuery,
} from '@/utils/common.js';
import {reloadAuthorized} from '@/utils/Authorized';
import {setAuthority} from '@/utils/authority';
import router from 'umi/router';
import {stringify} from 'qs';


export default {
  namespace: 'userInfo',
  state: {
    userInfo: {},
    inputStatus: '',
    indexIdCard: '',
    indexName: '',  //todo:删除
    newLastName:'',
    newFirstName:'',
    indexEmail: '',
    indexPhone: '',
    loginStatus:undefined,
    currentUser: undefined,
    ak: '',
    sk: '',
  },
  reducers: {
    // 重置indexData
    resetIndexData(state, { payload = {} }) {
      return { ...state, indexIdCard: '', indexName: '',lastName:'',firstName:'', indexEmail: '', indexPhone: '' };
    },
    // 改变USERinfo
    changeUserInfo(state, { payload = {} }) {
      return { ...state, userInfo: { ...state.userInfo, ...payload } };
    },
    // 设置当前的idCard
    changeIndexIdCard(state, { payload = {} }) {
      return { ...state, indexIdCard: payload.value };
    },
    // 设置当前的name
    changeIndexName(state, { payload = {} }) {
      return { ...state, indexName: payload.value };
    },
    // 设置当前的姓
    changeLastName(state, { payload = {} }) {
      return { ...state, newLastName: payload.value };
    },
    // 设置当前的名
    changeFirstName(state, { payload = {} }) {
      return { ...state, newFirstName: payload.value };
    },
    // 设置当前的email
    changeIndexEmail(state, { payload = {} }) {
      return { ...state, indexEmail: payload.value };
    },
    // 设置当前的phone
    changeIndexPhone(state, { payload = {} }) {
      return { ...state, indexPhone: payload.value };
    },
    // 设置要修改的数据
    setInputStatus(state, { payload = {} }) {
      return {
        ...state,
        inputStatus: payload.value,
        indexIdCard: '',
        indexName: '',
        indexEmail: '',
        indexPhone: '',
      };
    },
    // 设置tgt和userinfo
    setTgtUserInfo(state, { payload = {} }) {
      return { ...state, ...payload };
    },
    // 用户登出
    resetUserData(state, { payload = {} }) {
      return { ...state, userInfo: {} };
    },
    // 设置AKSK
    setAkSkData(state, { payload = {} }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // 更改个人头像
    * updateUserAvatar({ payload }, { put, call }) {
      const data = yield call(updateUserData, payload);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'changeUserInfo',
          payload: { avatar: payload.avatar },
        });
        payload.callBack();
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 更改用户个人头像
    * updateAvatarImage({ payload }, { put, call }) {
      const data = yield call(uploadFile, {
        url: '/file/share/resource',
        file: payload.file,
        defProgress: payload.defProgress,
      });
      if (judgeCode(data.statusCode)) {
        yield payload.callback();
        yield put({
          type: 'updateUserAvatar',
          payload: {
            avatar: data.path,
            callBack: payload.callback,
          },
        });
      } else {
        yield payload.errorback();
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 修改密码
    * updatePassword({ payload }, { put, call }) {
      const data = yield call(updatePassword, payload);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'userLogout',
        });
        yield router.push('/login');
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 修改其他数据
    * updateOther({ payload }, { put, call }) {
      const data = yield call(updateUserData, payload.data);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'changeUserInfo',
          payload: { ...payload },
        });
        yield payload.callBack();
        openNotificationWithIcon(data.statusCode, '保存成功');
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 修改身份证
    * updateIdCard({ payload }, { put, call }) {
      const data = yield call(updateUserData, payload);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'setInputStatus',
          payload: {
            value: '',
          },
        });
        yield put({
          type: 'changeUserInfo',
          payload: { ...payload },
        });
        yield put({
          type: 'changeIndexIdCard',
          payload: {
            value: '',
          },
        });
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 修改姓名
    * updateName({ payload }, { put, call }) {
      const data = yield call(updateUserData, payload);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'setInputStatus',
          payload: {
            value: '',
          },
        });
        yield put({
          type: 'changeUserInfo',
          payload: { ...payload },
        });
        yield put({
          type: 'changeIndexName',
          payload: {
            value: '',
          },
        });
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 修改邮箱
    * updateEmail({ payload }, { put, call }) {
      const data = yield call(updateUserData, payload);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'setInputStatus',
          payload: {
            value: '',
          },
        });
        yield put({
          type: 'changeUserInfo',
          payload: { ...payload },
        });
        yield put({
          type: 'changeIndexEmail',
          payload: {
            value: '',
          },
        });
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 修改手机号
    * updatePhone({ payload }, { put, call }) {
      const data = yield call(updateUserData, payload);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'setInputStatus',
          payload: {
            value: '',
          },
        });
        yield put({
          type: 'changeUserInfo',
          payload: { ...payload },
        });
        yield put({
          type: 'changeIndexPhone',
          payload: {
            value: '',
          },
        });
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 验证st
    * validateTicket({ payload }, { put, call }) {
      const data = yield call(validateTicket, payload);
    },
    // 根据用户名和密码获取TGT
    * getTGTData({ payload }, { put, call }) {
      const data = yield call(getTGTData, payload);
      yield put({
        type: 'getSTData',
        payload: {
          tgt: data.str,
        },
      });
    },
    // 根据tga获取st
    * getSTData({ payload }, { put, call }) {
      const data = yield call(getSTData, payload);
      yield put({
        type: 'validateTicket',
        payload: {
          ticket: data.str,
        },
      });
    },
    // 注册用户
    * registerUser({ payload }, { put, call }) {
      const data = yield call(registerUser, payload);
      console.log("register data", data);
      if (judgeCode(data.statusCode)) {
        router.replace('/login');
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 用户登录
    * userLogin({ payload }, { put, call }) {
      if (payload.autoLogin) {
        setLoalData({ dataName: 'fuxi-username', dataList: payload.username });
      }
      if (payload.haveAutoLogin && !payload.autoLogin) {
        delLoalData(['fuxi-username']);
      }
      // returnCitySN为获取到的ip与地址
      const response = yield call(loginUser, {
        ...payload,
        // ip: returnCitySN ? returnCitySN.cip : null,   // eslint-disable-line
        // city: returnCitySN ? returnCitySN.cname : null,  // eslint-disable-line
      });
      //如果登录成功
      if (judgeCode(response.statusCode)) {
        yield put({
          type: 'getUserData',
        });
        setLoalData({dataName: 'rzpj', dataList: response.tgt});
        setLoalData({dataName: 'userId', dataList: response.userInfo.id});
        //现在用户权限为NORMAL
        setAuthority(response.userInfo.status);
        //重新鉴权
        reloadAuthorized();
        //重定向到原来页面
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if (redirect && !redirect.includes('login')) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        } else if(redirect && redirect.includes('login')){
          redirect = '/'
        }
        yield put(routerRedux.replace(redirect || '/'));
        return {success:true}
      } else {
        openNotificationWithIcon(response.statusCode, response.message);
        return {success:false}
      }
    },
    //用户登出
    * userLogout(_, {call, put}) {
      //todo:登出的后台实现
      // yield call(logoutUser);
      reloadAuthorized();
      const {redirect} = getPageQuery();
      delLoalData(['rzpj', 'yhbh']);
      //现在用户权限为游客
      setAuthority('guest');
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
      //用户数据清空
      yield put({
        type: 'resetUserData',
      });
    },
    // 获取用户信息
    * getUserData({ payload }, { put, call }) {
      const data = yield call(getUserData, payload);
      if (judgeCode(data.statusCode)) {
        delete data.message;
        delete data.statusCode;
        delete data.success;
        yield put({
          type: 'setTgtUserInfo',
          payload: {
            userInfo: {
              avatar:
                'https://obs-fuxi-tansat.obs.cn-north-4.myhuaweicloud.com/fuxi_frontend/avatar/avatar_mian.jpg',
              gender: data.idCard && data.idCard !== '' ? judgeGender(data.idCard) : '1',
              ...data,
            },
          },
        });
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 获取用户的AK和SK
    * getAkSkData({ payload }, { put, call }) {
      const data = yield call(getAkSkData);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'setAkSkData',
          payload: {
            ak: data.ak,
            sk: data.sk,
          },
        });
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
    // 更新用户的AK和SK
    * updateAkSkData({ payload }, { put, call }) {
      const data = yield call(updateAkSkData);
      if (judgeCode(data.statusCode)) {
        yield put({
          type: 'setAkSkData',
          payload: {
            ak: data.ak,
            sk: data.sk,
          },
        });
      } else {
        openNotificationWithIcon(data.statusCode, data.message);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/userManagement/myVoucher') {
          dispatch({ type: 'getAkSkData' });
        } else if (pathname === '/userManagement/myProfile') {
          dispatch({ type: 'resetindexData' });
          dispatch({ type: 'getUserData' });
        }
      });
    },
  },
};
