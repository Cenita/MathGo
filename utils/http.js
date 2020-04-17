import { config } from '../config.js'

class HTTP {
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      header: {
        'content-type': 'application/json',
      },
      data: data,
      method: method,
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        const code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          resolve(res.data);
        } else {
          reject()
          params.error && params.error(res);
        }
      },
      fail: function (err) {
        reject()
      }
    })
  }

}
export { HTTP };