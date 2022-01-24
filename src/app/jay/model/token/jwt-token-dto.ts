/**
 * 用户登录成功后返回的信息
 */
export interface JwtTokenDTO {
  /**
   * 用户ID
   */
  userId: string;

  /**
   * 用户姓名
   */
  userName: string;

  /**
   * 令牌生成时间, 格式：yyyy-MM-dd hh:mm:ss
   */
  issued: string;

  /**
   * 令牌失效时间, 格式：yyyy-MM-dd hh:mm:ss
   */
  expires: string;

  /**
   * 令牌
   *
   * token用于http请求头中的Authorization
   */
  token: string;
}
