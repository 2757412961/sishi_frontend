import requestHeard from '../utils/requestHeard';
//标签接口
//获取标签树
export function getTagTree(tagName,userName) {
  return requestHeard({ url: '/v1.0/api/tag/tree', method: 'GET'});
}
// 用户是否已经完成该题
export function getUserAnswer(tagName,userName) {
  return requestHeard({ url: '/v1.0/api/getuseranswer', method: 'GET', data: {tagName,userName}});
}

// 根据tag信息，获取相关答题列表
export function getQuestionsByTag(tagName) {
  return requestHeard({ url: '/v1.0/api/questionsTag', method: 'GET', data: { tagName} });
}

// 添加用户积分，改写用户答题状态
export function updateQuestionStatus(tagName,userName) {
  return requestHeard({ url: 'v1.0/api/useranswer', method: 'PUT',data:{tagName,userName} });
}

// 获取所有问题列表
export function getAllQuestion() {
  return requestHeard({ url: '/v1.0/api/questions/selectques', method: 'GET'});
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
export function getVideoByTag({ tagName,start=0,length=10 }) {
  return requestHeard({ url: '/v1.0/api/videos/tagName'+tagName, method: 'GET', data: { start,length } });
}

// 获取视频列表
export function getVideoList({ start=0,length=10 }) {
  return requestHeard({ url: '/v1.0/api/videos', method: 'GET', data: { start,length } });
}

//获取音频列表
//根据tagName获取视频列表
export function getAudioByTag({ tagName,start=0,length=10 }) {
  return requestHeard({ url: '/v1.0/api/audios/tagName'+tagName, method: 'GET', data: { start,length } });
}

// 获取音频列表
export function getAudioList({ start=0,length=10 }) {
  return requestHeard({ url: '/v1.0/api/audios', method: 'GET', data: { start,length } });
}
//根据tagName获取文章列表
export function getArticlesByTag({ tagName,start=0,length=10 }) {
  return requestHeard({ url: '/v1.0/api/articles/tagName'+tagName, method: 'GET', data: { start,length } });
}

