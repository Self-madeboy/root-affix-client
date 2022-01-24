/**
 * 基本分页查询选项
 */
export interface QueryOptions {
  /**
   * 页号
   */
  page: number;

  /**
   * 分页大小
   */
  size: number;

  /**
   * 排序方式，格式：字段1,[asc|desc],字段2......
   */
  sort?: string;
}
