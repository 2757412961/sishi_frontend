import requestHeard from '../utils/requestHeard';

//标签接口
//标签树排序
//获取排序标签树
export function getTagTreeSortByTime(tagName) {
  return requestHeard({ url: '/tag/compareTime/'+tagName, method: 'GET'});
}
//获取标签树
export function getTagTree(tagName,userName) {
  return requestHeard({ url: '/tag/tree', method: 'GET'});
}
// 用户是否已经完成该题
export function getUserAnswer(tagName,userName) {
  return requestHeard({ url: '/getuseranswer', method: 'GET', data: {tagName,userName}});
}

// 根据tag信息，获取相关答题列表
export function getQuestionsByTag(tag_name) {
  debugger
  return requestHeard({ url: '/questionsTag', method: 'GET', data: { tag_name} });
}

// 添加用户积分，改写用户答题状态
export function updateQuestionStatus(tag_name,user_name) {
  return requestHeard({ url: '/useranswer?tag_name='+tag_name+'&user_name='+user_name, method: 'PUT' });
}

// 获取所有问题列表
export function getAllQuestion() {
  return requestHeard({ url: '/questions/selectques', method: 'GET'});
}

// 获取所有工作流任务
/**
 * @method getDagList
 * @param {String} type 'all','admin,'personal'
 * @param {Number} start 起始页
 * @param {Number} length 每页条目数，指定为-1时返回所有数据
 */
//视频管理接口
//根据tagName获取视频列表
export function getVideoByTag(tagName) {
  let start=0,length=100;
  return requestHeard({ url: '/videos/tagName/'+tagName, method: 'GET', data: { start,length } });
}

// 获取视频列表
export function getVideoList({ start=0,length=10 }) {
  return requestHeard({ url: '/videos', method: 'GET', data: { start,length } });
}

//获取音频列表
//根据tagName获取视频列表
export function getAudioByTag({ tagName,start=0,length=10 }) {
  return requestHeard({ url: '/audios/tagName'+tagName, method: 'GET', data: { start,length } });
}

// 获取音频列表
export function getAudioList({ start=0,length=10 }) {
  return requestHeard({ url: '/audios', method: 'GET', data: { start,length } });
}
//根据tagName获取文章列表
export function getArticlesByTag(tagName) {
  let start=0,length=100;
  return requestHeard({ url: '/articles/tagName/'+tagName, method: 'GET', data: { start,length } });
}
//获取图片列表
//根据tagName获取图片列表
export function getPicturesByTag(tagName) {
  return requestHeard({ url: '/pictures/tagName/'+tagName, method: 'GET'});
}


