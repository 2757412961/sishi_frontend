import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';
import {
  getQuestionsByTag, getAudioByTag, getVideoByTag,
  getArticlesByTag, getTagTree, getAllQuestion, updateQuestionStatus,
  getAudioList, getVideoList,getTagTreeSortByTime,getPicturesByTag,
  getUserScoreList,getUserStatus,
} from '@/services/question';
import { getUserData } from '@/services/service';
export default {
  namespace: 'userScoreList',
  state: {
    status: '',
    modalVisble:false,
    question:[],
    knowledgeContent:'',
    knowledgeUrl:'',
    video:'',
    audio:'',
    tagTree:[],
    module:'',
    users:'',
  },
  reducers: {
    setModule(state, payload){
      return {...state, module:payload.payload};
    },
    showModal(state){
      return {...state, modalVisble: true,};
    },
    hideModal(state,payload){
      return{...state,modalVisble:false};
    },
    //设置标签树
    setTagTree(state,{payload}){
      console.log('payload',payload);
      return{...state,tagTree:payload}
    },
    //设置问题
    setQuestion(state,{payload}){
      return{...state,question:payload}
    },
    //设置知识卡片
    setKnowledge(state,{payload}){
      return{...state,knowledgeContent:payload.articleContent,
      }
    },
    //设置音频
    setAudio(state,{payload}){
      return{...state,audio:payload.knowledgeContent}
    },
    //设置视频
    setVideo(state,{payload}){
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
    setUsers(state,{payload}){
      return{...state,users:payload}
    },
    clearStatus(state) {
      return {...state, status: '',};
    },
  },
  effects: {
    //获取标签树
    * getTagTreeSortByTime({payload},{call, put}) {
      const response = yield call(getTagTreeSortByTime,payload.tagName);
      console.log('tagTree',response.list);
      if (response.success) {
        yield put({
          type: 'setTagTree',
          payload: response.list,
        });
      }
      return response;
    },
    //获取标签树
    * getTagTree({payload},{call, put}) {
      const response = yield call(getTagTree);
      console.log('tagTree',response.list);
      if (response.success) {
        yield put({
          type: 'setTagTree',
          payload: response.list,
        });
      }
      return response;
    },

    //获取问题及答案
    * getQuestion({payload}, {call, put}) {
      const response = yield call(getQuestionsByTag, payload);
      // const response = yield call(getAllQuestion);
      console.log('response',response);
      if (response.success) {
        yield put({
          type: 'setQuestion',
          payload: response.list,
        });
      }
    },
    //获取知识卡片
    * getKnowLedge({payload}, {call, put}) {
      const response = yield call(getArticlesByTag, payload);
      console.log('response',response);
      if (response.success) {
        yield put({
          type: 'setKnowledge',
          payload: response.articles[0],
        });
      }

    },

    //获取视频通过tagName
    * getVideoByTag({payload}, {call, put}) {
      console.log('payload',payload);
      const response = yield call(getVideoByTag, payload);
      // const response = yield call(getVideoList);
      console.log('response',response);
      return response;
    },

    //获取音频通过tagName
    * getAudioByTag({payload}, {call, put}) {
      const response = yield call(getAudioByTag, "党史新学@中共一大");
      // const response = yield call(getAudioList);
      console.log('response',response);
    },
    //获取图片通过tagName
    * getPictureByTag({payload}, {call, put}) {
      const response = yield call(getPicturesByTag, payload);
      // const response = yield call(getAudioList);
      console.log('response',response);
      return response;
    },

    //更新用户积分
    *updateUserGrades({payload}, {call, put}){
      // const response1=yield call(getUserData,payload);
      // console.log(response1);
      const {tag_name,user_name}=payload;
      const response = yield call(updateQuestionStatus, tag_name,user_name);
    },
    //获取排名前十的用户
    *getUserScoreList({payload}, {call, put}){
      const response=yield call(getUserScoreList);
      if(response&&response.success){
        yield put({
          type: 'setUsers',
          payload: response,
        });
        return response;
      }
    },
    //获取用户答题状态
    *getUsrStatus({payload}, {call, put}){
      const {tag_name,user_name}=payload;
      const response = yield call(getUserStatus, tag_name,user_name);
      return response;
    }
  },




};
