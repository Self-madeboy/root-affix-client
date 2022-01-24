import { UserBaseDTO } from './user-base-dto';

/**
 * 基本数据结构
 *
 * 后台每个实体类都拥有的属性
 *
 */
export interface AbstractBaseEntity {
  /**
   * 主键ID
   */
  id: string;

  /**
   * 创建者
   */
  createUser?: UserBaseDTO;

  /**
   * 创建时间, 格式：yyyy-MM-dd HH:mm:ss
   */
  createdTime?: string;

  /**
   * 最后的修改者
   */
  lastModifyUser?: UserBaseDTO;

  /**
   * 最后修改时间, 格式：yyyy-MM-dd HH:mm:ss
   */
  lastModifiedTime?: string;
}
