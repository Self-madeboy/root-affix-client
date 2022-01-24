/**
 * 调用后台接口返回的分页数据
 */
export interface ApiPagedData<T> {
  /**
   * 当前页号，从0开始计数
   */
  pageNo: number;

  /**
   * 分页大小
   */
  pageSize: number;

  /**
   * 总纪录数
   */
  totalRecords: number;

  /**
   * 总页数
   */
  totalPages: number;

  /**
   * 当前页数据
   */
  data: T[];
}
