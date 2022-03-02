import axios, { AxiosRequestConfig, Method } from 'axios';
import { Message, Loading } from 'element-ui';

// 定义接口
export interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Function;
}

/* 当页面有两个接口时，第一个接口loading的close事件会直接将第二个接口的loading实例也close */
let loadingInstance: any = null;
let needLoadingRequestCount = 0;
function startLoading () {
  loadingInstance = Loading.service({
    fullscreen: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.8)'
  });
}

function endLoading () {
  loadingInstance.close();
}

function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}



// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
// axios 实例
const instance = axios.create({
  timeout: 10000,
  responseType: 'json',
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试');
      // 从数组中移除记录
      if (pending.length > 1) {
        pending.splice(item, 1);
      }
    }
  }
};

// 添加请求拦截器
instance.interceptors.request.use(
  request => {
    showFullScreenLoading();
    removePending(request);
    request.cancelToken = new CancelToken(c => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c,
      });
    });
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    removePending(response.config);
    const errorCode = response?.data?.errorCode;
    switch (errorCode) {
      case '401':
        // 根据errorCode，对业务做异常处理(和后端约定)
        break;
      default:
        break;
    }
    return response;
  },
  error => {
    tryHideFullScreenLoading();
    const response = error.response;
    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case 400:
        //  页面找不到
        break;
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        Message.error({message: '服务端错误~'});
        break;
      default:
        // 接口异常
        break;
    }
    // 超时重新请求
    const config = error.config;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [0, 1000];
    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.__retryCount++;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }
    return Promise.reject(response || { message: error.message });
  }
);
export default instance;
