import wepy from 'wepy';
import http from '../utils/Http'

export default class base {
  static baseUrl = wepy.$instance.globalData.baseUrl;
  static openUrl = wepy.$instance.globalData.openUrl;
  static apiUrl = wepy.$instance.globalData.apiUrl;
  static get = http.get.bind(http);
  static put = http.put.bind(http);
  static post = http.post.bind(http);
  static delete = http.delete.bind(http);
    /**
   * 上传图片
   */
  static async image (filePath) {
    // const url = `${this.baseUrl}/images`;
    const url = `${this.apiUrl}/api/imgmng/imgupload`;
    const param = {
      url,
      filePath,
      name: 'image'
    };
    return await wepy.uploadFile(param);
  }
}
