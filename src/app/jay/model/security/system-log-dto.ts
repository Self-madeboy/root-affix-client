import { SystemLogSummaryDTO } from './system-log-summary-dto';

/**
 * 系统详细操作日志, 含有大数据字段
 */
export interface SystemLogDTO extends SystemLogSummaryDTO {
  /**
   * 调用后台API时传递的参数
   */
  parameter: string;

  /**
   * 纪录的内容，成功操作时为返回的内容，失败时为异常信息
   *
   */
  content: string;
}
