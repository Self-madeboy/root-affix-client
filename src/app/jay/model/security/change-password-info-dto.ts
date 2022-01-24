/**
 * 修改密码数据
 */
export class ChangePasswordInfoDTO {
  /**
   * 构造函数
   *
   * @param oldPassword 原密码
   * @param newPassword 新密码
   */
  constructor(public oldPassword: string, public newPassword: string) {}
}
