import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';
import {getQuestionsByTag,getAudioByTag,getVideoByTag,getArticlesByTag,getTagTree} from '@/services/question';

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
    video:'',
    audio:'',
    tagTree:'',
  },
  reducers: {
    showModal(state){
      return {...state, modalVisble: true,};
    },
    hideModal(state,payload){
      return{...state,modalVisble: false};
    },
    //设置标签树
    setTagTree(state,payload){
      return{...state,tagTree: payload}
    },
    //设置问题
    setQuestion(state,payload){
      return{...state,questionContext:payload.questionContext,
        option:payload.option,
        answer:payload.answer,}
    },
    //设置知识卡片
    setKnowledge(state,payload){
      return{...state,knowledgeContent:payload.knowledgeContent,
        knowledgeUrl:payload.knowledgeUrl,}
    },
    //设置音频
    setAudio(state,payload){
      return{...state,audio:payload.knowledgeContent}
    },
    //设置视频
    setVideo(state,payload){
      return{...state,video:payload.knowledgeContent}
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
    //获取标签树
    * getTagTree({payload}, {call, put}) {
      const response = yield call(getTagTree);

    },

    //获取问题及答案
    * getQuestion({payload}, {call, put}) {
      const response = yield call(getQuestionsByTag, "党史新学@中共一大");

    },
    //获取知识卡片
    * getKnowLedge({payload}, {call, put}) {
      const response = yield call(getArticlesByTag, "党史新学@中共一大");

    },

    //获取视频通过tagName
    * getVideoByTag({payload}, {call, put}) {
      const response = yield call(getVideoByTag, "党史新学@中共一大");
    },

    //获取音频通过tagName
    * getAudioByTag({payload}, {call, put}) {
      const response = yield call(getAudioByTag, "党史新学@中共一大");
    },
  },


};
