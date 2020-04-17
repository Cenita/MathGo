import { config } from '../config.js'

class FileHttp {
  request({ url,name, imagePath}) {
    return new Promise((resolve, reject) => {
      this._request(url,name, resolve, reject, imagePath)
    })
  }
  _request(url,name, resolve, reject, imagePath) {
    wx.uploadFile({
      url: config.api_base_url + url,
      filePath: imagePath,
      name:name,
      success: function (res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        const code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          resolve(JSON.parse(res.data));
        } else {
          reject()
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  }

}
export { FileHttp };