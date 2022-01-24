import { AbstractBaseEntity } from '../common/abstract-base-entity';
import { RoleDTO } from './role-dto';

export interface AuthorityDTO extends AbstractBaseEntity {
  /**
   * 编码, 应当使用英文编码，且在系统中唯一
   */
  code: string;

  /**
   * 权限名称
   */
  name: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 类型，主要是对权限做分类
   */
  type: string;

  /**
   * 拥有该权限的角色, 用于查询
   */
  assignedRoles?: Set<RoleDTO>;

  /**
   * 设置该权限所分配的角色ID，用于新增或修改
   */
  roleIds?: Set<string>;
}
