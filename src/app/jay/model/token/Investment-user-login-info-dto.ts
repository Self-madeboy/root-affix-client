/**
 * InvestmentUserLonginInfoDTO
 */
export interface InvestmentUserLonginInfoDTO {
  /**
   * 登录账号
   */
  account: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 组织机构的类型(用来设置后端保存数据表的时候的filterPath过滤路径)
   */
  organizationType?: 'UNIT' | 'DEPARTMENT' | 'POSITION';

  /**
   * 用户类型
   */
  userType?: 'CONSTRUCTION_USER' | 'INTERMEDIARY_USER' | 'BASE_USER';
}
