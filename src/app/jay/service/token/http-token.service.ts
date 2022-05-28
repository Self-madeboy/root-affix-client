import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { ApiSimpleData } from '../../model/common/api-simple-data';
import { JwtTokenDTO } from '../../model/token/jwt-token-dto';
import { UserLoginInfoDTO } from '../../model/token/user-login-info-dto';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenService {
  /**
   * API的入口URL
   *
   */
  private static URL = '/api/token';

  constructor(private http: _HttpClient) {}

  /**
   * 登录
   * @param account 账号
   * @param password 密码
   */
  login(account: string, password: string, markId?: string, validCode?: string): Observable<JwtTokenDTO> {
    return this.http.post<JwtTokenDTO>(
      `${HttpTokenService.URL}?_allow_anonymous=true`,
      new UserLoginInfoDTO(account, password, markId, validCode),
    );
  }

  /**
   * 退出当前用户，通知后台纪录退出日志
   */
  logout(): Observable<ApiSimpleData<boolean>> {
    return this.http.delete<ApiSimpleData<boolean>>(HttpTokenService.URL);
  }

  /**
   * 在旧token未失效前，获取新的token
   */
  refreshToken(): Observable<JwtTokenDTO> {
    return this.http.get<JwtTokenDTO>(HttpTokenService.URL);
  }
}
