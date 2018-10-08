import wepy from 'wepy'
import Tips from './Tips';
const app = getApp();

// HTTP工具类
export default class http {
  static async request (method, url, data) {
    const param = {
      url: url,
      method: method,
      data: data
    };
    Tips.loading();
    const res = await wepy.request(param);
    if (this.isSuccess(res)) {
      let result = res.data;
      if (result.code === 0) {
        result = result.data
      }
      return result;
    } else {
      console.error(method, url, data, res);
      throw this.requestException(res);
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }
    const wxData = res.data;
    return (wxData && !wxData.err);
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {};
    error.statusCode = res.statusCode;
    const wxData = res.data;
    const message = wxData.err;
    if (message) {
      error.message = message;
    }
    return error;
  }

  static get (url, data) {
    return this.request('GET', url, data)
  }

  static put (url, data) {
    return this.request('PUT', url, data)
  }

  static post (url, data) {
    return this.request('POST', url, data)
  }

  static patch (url, data) {
    return this.request('PATCH', url, data)
  }

  static delete (url, data) {
    return this.request('DELETE', url, data)
  }
}
