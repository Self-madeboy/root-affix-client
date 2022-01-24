/**
 * 系统简要操作日志，不包括参数和返回结果
 *
 */
export interface SystemLogSummaryDTO {
  /**
   * ID
   */
  id: string;

  /**
   * 访问的类名称
   */
  className: string;

  /**
   * 访问的方法名
   */
  methodName: string;

  /**
   * 操作时间
   */
  operationTime: string;

  /**
   * 调用花费时间（毫秒）
   */
  timeElapsed: number;

  /**
   *  操作类型，主要是增加，查询，删除和修改以及执行
   */
  operationType: string;

  /**
   * 操作所影响的数据类型
   */
  dataType: string;

  /**
   * 是否操作成功
   */
  success: boolean;

  /**
   * 所操作的关联的数据的ID
   */
  relatedId: string;

  /**
   * 客户端访问的时的IP地址
   */
  ipAddress: string;
}
