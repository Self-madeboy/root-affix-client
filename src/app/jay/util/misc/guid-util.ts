/**
 * GUID工具类，用于生成GUID
 */
export class GuidUtil {
  /**
   * 生成随机数的GUID
   * @returns GUID字符串
   */
  static guid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
