import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';
import {registerUser} from '@/services/service';
import {getCaptcha} from '@/services/service';

export default {
  namespace: 'register',

  state: {
    status: '',
  },

  effects: {
    * submit({payload}, {call, put}) {
      const response = yield call(registerUser, payload);
      if (response.success) {
        alert("恭喜你，注册成功！")
        yield put({
          type: 'registerHandle',
          // payload: response.data,
        });
      }
    },
    * getCaptcha({payload}, {call, put}) {
      const response = yield call(getCaptcha, payload);
      if (response.success) {
        alert(response.message)
      }
    },
  },
  reducers: {
    registerHandle(state, {payload}) {
      setAuthority('NORMAL');
      reloadAuthorized();
      return {
        ...state,
        status: 'ok',
      };
    },
    clearStatus(state) {
      return {...state, status: '',};
    },
  },
};
