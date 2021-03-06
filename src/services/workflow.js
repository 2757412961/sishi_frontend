import requestHeard from '../utils/requestHeard';

// 提交工作流模板
export function submitTemplate(data) {
  return requestHeard({ url: '/workflow', method: 'POST', data: data });
}

// 获取所有工作流模板
export function getTemplateList({ type,start=0,length=-1 }) {
  return requestHeard({ url: '/workflow/list', method: 'GET', data: { type,start,length } });
}

// 删除工作流模板
export function delTemplate(id) {
  return requestHeard({ url: '/workflow/'+id, method: 'delete' });
}

// 更新工作流模板
export function updateTemplate(data) {
  return requestHeard({ url: '/workflow', method: 'PUT', data:data });
}

// 获取所有工作流任务
/**
 * @method getDagList
 * @param {String} type 'all','admin,'personal'
 * @param {Number} start 起始页
 * @param {Number} length 每页条目数，指定为-1时返回所有数据
 */
export function getDagList({ type,start=0,length=10 }) {
  return requestHeard({ url: '/dag/list', method: 'GET', data: { type,start,length } });
}

// 获取工作流任务日志
export function getDagLog({ dagName, taskId }) {
  return requestHeard({ url: '/dag/log', method: 'GET', data: { dagName, taskId } });
}

// 获取工作流任务结果
export function getDagResult({ dagName, taskId }) {
  return requestHeard({ url: '/dag/result', method: 'GET', data: { dagName, taskId } });
}

// 获取工作流任务运行状态
export function getDagStatus({ dagName }) {
  return requestHeard({ url: '/dag/status/' + dagName, method: 'GET' });
}

// 获取工作流任务运行状态
export function getDagParams({ dagName }) {
  return requestHeard({ url: '/dag/param/' + dagName, method: 'GET' });
}

// 运行工作流
export function runDag(data) {
  return requestHeard({ url: '/dag/run', method: 'POST', data:data });
}
