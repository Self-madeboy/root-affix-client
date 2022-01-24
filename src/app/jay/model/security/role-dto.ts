import { AbstractBaseEntity } from '../common/abstract-base-entity';
import { AuthorityDTO } from './authority-dto';

export interface RoleDTO extends AbstractBaseEntity {
  /**
   * 名称, 要求唯一性
   */
  name: string;

  /**
   * 备注，说明该Role应当分配给什么样的人使用
   */
  remark: string;

  /**
   * 该角色所分配的权限，用于查询
   */
  assignedAuthoritiy?: Set<AuthorityDTO>;

  /**
   * 为该角色的分配权限，用于新建和修改
   */
  authorityIds?: Array<string>;

  /**
   * true就是所有,false是当前用户
   */
  isAll?: boolean;
}
