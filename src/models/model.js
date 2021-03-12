import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';
import {registerUser} from '@/services/service';

export default {
  namespace: 'mapPage',

  state: {
    status: '',
    modalVisble:false,
    questionContext:'',
    option:[],
    answer:'',
    knowledgeContent:'',
    knowledgeUrl:'',
  },
  reducers: {
    showModal(state){
      return {...state, modalVisble: true,};
    },
    hideModal(state,payload){
      return{...state,modalVisble: false};
    },
    setQuestion(state,payload){
      return{...state,questionContext:payload.questionContext,
        option:payload.option,
        answer:payload.answer,}
    },
    setKnowledge(state,payload){
      return{...state,knowledgeContent:payload.knowledgeContent,
        knowledgeUrl:payload.knowledgeUrl,}
    },
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
  //获取问题及答案
  * getQuestion({payload}, {call, put}) {

  },
  //获取知识卡片
  * getKnowLedge({payload}, {call, put}) {

  },

};
