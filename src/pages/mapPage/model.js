import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';
import {registerUser} from '@/services/service';

export default {
  namespace: 'mapPage',

  state: {
    status: '',
    modalVisble:false,
    context:'',
  },

  effects: {
    * submit({payload}, {call, put}) {
      const response = yield call(registerUser, payload);
      if (response.success) {
        yield put({
          type: 'registerHandle',
          payload: response.data,
        });
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