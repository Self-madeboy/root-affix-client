import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService, SocialService } from '@delon/auth';
import { CacheService } from '@delon/cache';
import { SettingsService, _HttpClient } from '@delon/theme';
import { JwtTokenDTO } from 'src/app/jay/model/token/jwt-token-dto';
import { UserLoginInfoDTO } from 'src/app/jay/model/token/user-login-info-dto';
import { UserService } from 'src/app/jay/service/srcurity/user.service';
import { HttpTokenService } from 'src/app/jay/service/token/http-token.service';
import { FormUtil } from 'src/app/jay/util/form/form-util';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private cdr: ChangeDetectorRef,
    private cacheService: CacheService,
    private httpTokenService: HttpTokenService,
    private userService: UserService,
    private starupService: StartupService,
  ) {}

  @ViewChild('loginDetailForm')
  loginDetailForm: FormGroup;

  error = '';

  loading = false;

  /**
   * 当前用户id
   */
  userId = '';

  /**
   * 需要缓存的用户信息对象
   */
  userInfo = {
    id: '',
    name: '',
    userType: '',
    authorities: [],
  };

  userLoginInfoDTO: UserLoginInfoDTO = {
    account: null,
    password: null,
  };

  rememberMe = false;

  submit(): void {
    this.error = '';

    if (!FormUtil.validateForm(this.loginDetailForm)) {
      return;
    }

    this.cacheService.set('__user', this.userInfo, {
      type: this.rememberMe ? 's' : 'm',
    });

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.loading = true;
    this.cdr.detectChanges();

    // tslint:disable-next-line: deprecation
    this.httpTokenService.login(this.userLoginInfoDTO.account, this.userLoginInfoDTO.password).subscribe(
      (data) => {
        this.loading = false;
        if (data) {
          this.afterLogin(data);
        }
      },
      null,
      () => {
        this.loading = false;
      },
    );
  }

  afterLogin(data: JwtTokenDTO): void {
    // 清空路由复用信息
    this.reuseTabService.clear();
    // 设置Token信息
    this.tokenService.set(data);
    this.userService.findUserById(data.userId).subscribe((user) => {
      this.userId = data.userId;
      if (user) {
        this.userInfo.id = data.userId;
        this.userInfo.name = user.name;
        this.userInfo.authorities = user.authorities;
        // 缓存用户信息
        const expire = new Date(data.expires);
        this.cacheService.set('__user', this.userInfo, {
          type: this.rememberMe ? 's' : 'm',
          expire: (expire.getTime() - new Date().getTime()) / 1000,
        });
        this.starupService.load().then(() => this.router.navigate(['/']));
      }
    });
  }

  // #endregion

  ngOnDestroy(): void {}
}
