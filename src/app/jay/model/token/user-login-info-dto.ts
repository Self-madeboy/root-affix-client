/**
 * 用户登录信息
 */
export class UserLoginInfoDTO {
  /**
   * 登录账号
   */
  account: string;

  /**
   * 登录密码
   */
  password: string;

  /**
   * 标识id
   */
  markId?: string;

  /**
   * 用户输入的验证码
   */
  validCode?: string;

  /**
   * 构造函数
   * @param account 账号
   * @param password 密码
   * @param markId 标识id
   * @param validCode 用户输入的验证码
   */
  constructor(account: string, password: string, markId?: string, validCode?: string) {
    this.account = account;
    this.password = password;
    this.validCode = validCode;
    this.markId = markId;
  }
}
