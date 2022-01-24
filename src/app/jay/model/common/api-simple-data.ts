/**
 * 简单数据类型
 *
 * 用于包裹string, int等，可以是数组。
 *
 */
export interface ApiSimpleData<T> {
  /**
   * 数据
   */
  data: T;
}
