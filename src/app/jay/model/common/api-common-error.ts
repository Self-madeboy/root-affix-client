/**
 * 调用API出错时返回的通过结构
 */
export interface ApiCommonError {
  /**
   * 错误消息
   */
  message: string;

  /**
   * 后台抛出的异常
   */
  exception?: string;
}
