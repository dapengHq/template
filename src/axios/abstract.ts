import { HOST } from './config';
import instance from './intercept';
import { AxiosRequest, CustomResponse } from './interface';
import { Decrypt, resetToken } from '@/utils/utils';
import { sStorage } from '@/utils/storage';
import { Message } from 'element-ui';
// 外部传入的baseUrl
const token = sStorage.getItem('userInfor')
  ? JSON.parse(Decrypt(sStorage.getItem('userInfor'))).token
  : '';
const reqURL = HOST;
const header: object = {
  'Content-Type': 'application/json;charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest',
  token,
};

const comErrorMsg = '服务异常~';

class Abstract {
  private apiAxios({
    baseURL = reqURL,
    headers = header,
    method,
    url,
    data,
    params,
    responseType
  }: AxiosRequest): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType,
      })
        .then(res => {
          if (res?.headers?.token) {
            resetToken(res.headers);
          }
          // 200:服务端业务处理正常结束
          if (res.status === 200) {
            if (res.data?.success) {
              resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data });
            } else {
              Message.error({ message: res.data?.message || comErrorMsg });
              resolve({
                status: false,
                message: res.data?.message,
                data: res.data?.data,
                origin: res.data,
              });
            }
          } else {
            resolve({ status: false, message: res.data?.message || comErrorMsg, data: null });
          }
        })
        .catch(err => {
          const { status } = err;
          let errMsg = comErrorMsg;
          switch (status) {
            case 404:
              errMsg = 'API错误~';
              break;
          }
          const message = err?.data?.message || err?.message || errMsg;
          Message.error({ message });
          reject({ status: false, message, data: null });
        });
    });
  }

  /**
   * GET类型的网络请求
   */
  protected getRequest({ url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'GET', url, data, params, responseType });
  }

  /**
   * POST类型的网络请求
   */
  protected postRequest({ url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'POST', url, data, params, responseType });
  }

  /**
   * PUT类型的网络请求
   */
  protected putRequest({ url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'PUT', url, data, params, responseType });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteRequest({ url, data, params, responseType }: AxiosRequest) {
    return this.apiAxios({ method: 'DELETE', url, data, params, responseType });
  }
}

export default Abstract;
