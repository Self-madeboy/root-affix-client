export interface UserBaseDTO {
  /**
   * ID
   */
  id: string;

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
}
