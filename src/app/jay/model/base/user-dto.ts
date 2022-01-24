import { AbstractBaseEntity } from '../common/abstract-base-entity';

/**
 * 用户信息
 */
export interface UserDTO extends AbstractBaseEntity {
  /**
   * 登录账号, 要求在创建时验证唯一性
   */
  account: string;

  /**
   * 姓名
   */
  name: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 密码失效时间, null表示永久有效
   */
  passwordExpireDate?: string;

  /**
   * 账号是否激活
   */
  enabled: boolean;

  /**
   * 账号失效时间，null表示永久有效
   */
  accountExpireDate?: string;

  /**
   * 是否本地登录账号，非本地账号需要连接OA或其他系统验证登录
   */
  localAccount?: boolean;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 最后修改密码的时间，系统自动生成
   */
  changePasswordTime?: string;

  /**
   * 账号是否被锁住（通常是同一天内连续多次输错密码）
   */
  accountLocked?: boolean;

  /**
   * 已分配的权限清单
   */
  authorities?: Array<string>;

  /**
   * 拥有该用户的所有角色ID
   */
  // assignedRoles?: Set<RoleDTO>;

  /**
   * 该用户的所有权限
   */
  // assignedAuthority?: Set<AuthorityDTO>;

  /**
   * 所属单位
   */
  // unitDTO?: UnitDTO;

  /**
   * 为该用户分配角色，用于新增和修改
   */
  roleIds?: Set<string>;
}
